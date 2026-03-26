import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type UserRole = "super_admin" | "commerciale" | "rivenditore";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  // loading stays true until BOTH session and role are resolved
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Prevent duplicate role fetches
  const roleFetchedForUserId = useRef<string | null>(null);
  // Track in-flight role fetch so we don't set loading=false prematurely
  const roleFetchPending = useRef(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          if (roleFetchedForUserId.current !== session.user.id) {
            roleFetchedForUserId.current = session.user.id;
            roleFetchPending.current = true;
            setTimeout(() => {
              fetchUserRole(session.user.id).finally(() => {
                roleFetchPending.current = false;
                setLoading(false);
              });
            }, 0);
          } else {
            // Role already loaded for this user
            setLoading(false);
          }
        } else {
          setUserRole(null);
          roleFetchedForUserId.current = null;
          roleFetchPending.current = false;
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        if (roleFetchedForUserId.current !== session.user.id) {
          roleFetchedForUserId.current = session.user.id;
          roleFetchPending.current = true;
          fetchUserRole(session.user.id).finally(() => {
            roleFetchPending.current = false;
            setLoading(false);
          });
        } else if (!roleFetchPending.current) {
          // Role already fetched AND no fetch in flight — safe to stop loading
          setLoading(false);
        }
        // else: onAuthStateChange is still fetching the role → it will call setLoading(false)
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      setUserRole((data?.role as UserRole) || null);
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUserRole(null);
      // Reset so it can be retried on next auth event
      roleFetchedForUserId.current = null;
    }
  };

  const signIn = async (email: string, password: string) => {
    // Reset role cache on new sign in
    roleFetchedForUserId.current = null;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error) {
      navigate("/");
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName,
        },
      },
    });

    // Do NOT navigate here — caller (Auth.tsx) handles confirmation flow
    return { error };
  };

  const signOut = async () => {
    roleFetchedForUserId.current = null;
    await supabase.auth.signOut();
    setUserRole(null);
    navigate("/auth");
  };

  const hasRole = (role: UserRole): boolean => {
    return userRole === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        userRole,
        loading,
        signIn,
        signUp,
        signOut,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
