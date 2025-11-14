// Temporary ambient type declarations for Lovable Cloud database types.
// This file unblocks TypeScript when the auto-generated types.ts is not yet present.
// It will be superseded automatically once types are generated.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = any;
