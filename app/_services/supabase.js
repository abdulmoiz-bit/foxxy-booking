import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://kkhzhxfunikakbcjdjyx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtraHpoeGZ1bmlrYWtiY2pkanl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMDc3MTcsImV4cCI6MjA0NjY4MzcxN30.f1B75MXN2JOXDM5ZOFEki0iZY9-7McMDOFSqjsymdYg "
);
