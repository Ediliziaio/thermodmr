-- Atomic role update function
CREATE OR REPLACE FUNCTION public.update_user_role(
  p_user_id uuid,
  p_new_role app_role
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only super_admin can call this
  IF NOT has_role(auth.uid(), 'super_admin') THEN
    RAISE EXCEPTION 'Forbidden: only super_admin can change roles';
  END IF;

  -- Atomic: delete old + insert new in single transaction
  DELETE FROM user_roles WHERE user_id = p_user_id;
  INSERT INTO user_roles (user_id, role) VALUES (p_user_id, p_new_role);
END;
$$;