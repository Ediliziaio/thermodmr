import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { ApiError, HttpStatus } from './errors.ts';

export { z };

/**
 * Parse and validate request body against a Zod schema
 */
export const validateBody = async <T extends z.ZodSchema>(
  req: Request,
  schema: T
): Promise<z.infer<T>> => {
  let body: unknown;
  
  try {
    body = await req.json();
  } catch {
    throw new ApiError('Invalid JSON body', HttpStatus.BAD_REQUEST);
  }

  const result = schema.safeParse(body);
  
  if (!result.success) {
    throw new ApiError(
      `Validation failed: ${result.error.errors.map(e => e.message).join(', ')}`,
      HttpStatus.BAD_REQUEST,
      result.error.errors
    );
  }

  return result.data;
};

/**
 * Common validation schemas
 */
export const CommonSchemas = {
  uuid: z.string().uuid('Invalid UUID format'),
  email: z.string().email('Invalid email format').max(255, 'Email too long'),
  displayName: z.string().trim().min(1, 'Name cannot be empty').max(100, 'Name too long'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(72, 'Password too long'),
  appRole: z.enum(['super_admin', 'commerciale', 'rivenditore']),
};
