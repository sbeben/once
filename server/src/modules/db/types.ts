import { PostgrestError } from "@supabase/supabase-js";

export type DBResponse<T> = Promise<{ data: T | null; error: PostgrestError | null }>;
