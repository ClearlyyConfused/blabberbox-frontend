// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API;
const supabase = createClient(supabaseUrl, supabaseKey);

// supabase communicates with the backend
// import where needed
export default supabase;
