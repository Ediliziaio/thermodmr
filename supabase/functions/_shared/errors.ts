import { corsHeaders } from './cors.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

/**
 * Standard HTTP error codes
 */
export const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Custom error class with HTTP status code
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Create standardized error response
 */
export const createErrorResponse = (
  error: unknown,
  defaultStatus: number = HttpStatus.INTERNAL_SERVER_ERROR
): Response => {
  console.error('Error in edge function:', error);

  let statusCode = defaultStatus;
  let message = 'Internal server error';
  let details: unknown = undefined;

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    details = error.details;
  } else if (error instanceof z.ZodError) {
    statusCode = HttpStatus.BAD_REQUEST;
    message = 'Validation failed';
    details = error.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
  } else if (error instanceof Error) {
    message = error.message;
    
    // Map common error messages to appropriate status codes
    if (message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('no authorization')) {
      statusCode = HttpStatus.UNAUTHORIZED;
    } else if (message.toLowerCase().includes('forbidden') || message.toLowerCase().includes('only super')) {
      statusCode = HttpStatus.FORBIDDEN;
    } else if (message.toLowerCase().includes('not found')) {
      statusCode = HttpStatus.NOT_FOUND;
    } else if (message.toLowerCase().includes('validation')) {
      statusCode = HttpStatus.BAD_REQUEST;
    }
  }

  return new Response(
    JSON.stringify({ 
      error: message, 
      details,
      timestamp: new Date().toISOString()
    }),
    { 
      status: statusCode, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
};

/**
 * Create standardized success response
 */
export const createSuccessResponse = <T>(
  data: T,
  status: number = HttpStatus.OK
): Response => {
  return new Response(
    JSON.stringify(data),
    { 
      status, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
};
