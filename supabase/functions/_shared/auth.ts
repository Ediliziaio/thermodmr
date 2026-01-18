import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';
import { ApiError, HttpStatus } from './errors.ts';

export type AppRole = 'super_admin' | 'commerciale' | 'rivenditore';

export interface AuthenticatedUser {
  id: string;
  email: string | undefined;
  roles: AppRole[];
}

/**
 * Create a Supabase client with anon key (for user context)
 */
export const createSupabaseClient = (req: Request): SupabaseClient => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new ApiError('Missing Supabase configuration', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: req.headers.get('Authorization') || '' },
    },
  });
};

/**
 * Create a Supabase admin client with service role key
 */
export const createAdminClient = (): SupabaseClient => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new ApiError('Missing Supabase admin configuration', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

/**
 * Get authenticated user from request
 */
export const getAuthenticatedUser = async (
  supabase: SupabaseClient
): Promise<AuthenticatedUser> => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    console.error('Authentication error:', error);
    throw new ApiError('Unauthorized - Invalid or missing token', HttpStatus.UNAUTHORIZED);
  }

  // Fetch user roles
  const { data: roles, error: rolesError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id);

  if (rolesError) {
    console.error('Error fetching roles:', rolesError);
    throw new ApiError('Error checking permissions', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  return {
    id: user.id,
    email: user.email,
    roles: (roles || []).map(r => r.role as AppRole),
  };
};

/**
 * Verify user has required role
 */
export const verifyRole = async (
  supabase: SupabaseClient,
  requiredRole: AppRole
): Promise<AuthenticatedUser> => {
  const user = await getAuthenticatedUser(supabase);

  if (!user.roles.includes(requiredRole)) {
    console.error(`User ${user.id} does not have required role: ${requiredRole}`);
    throw new ApiError(
      `Forbidden - Only ${requiredRole} can perform this action`,
      HttpStatus.FORBIDDEN
    );
  }

  return user;
};

/**
 * Verify user is super_admin
 */
export const verifySuperAdmin = async (
  supabase: SupabaseClient
): Promise<AuthenticatedUser> => {
  return verifyRole(supabase, 'super_admin');
};

/**
 * Extract bearer token from Authorization header
 */
export const extractBearerToken = (req: Request): string => {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader) {
    throw new ApiError('Missing Authorization header', HttpStatus.UNAUTHORIZED);
  }

  return authHeader.replace('Bearer ', '');
};
