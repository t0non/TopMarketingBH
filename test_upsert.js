const { createClient } = require('@supabase/supabase-js');
const sb = createClient('https://gycpwtlwehgwxqyrmbzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3B3dGx3ZWhnd3hxeXJtYnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MjgwNTMsImV4cCI6MjEwNjIwNDA1M30.kq7O_qT9NnkSEtjZ8bXnsbU-7yf5wW4VwpwJ4H9lrnA');

sb.from('form_sessions').upsert({
  session_id: 'test_upsert_123',
  status: 'em_progresso'
}, { onConflict: 'session_id' })
.then(res => console.log(res))
.catch(err => console.error(err));
