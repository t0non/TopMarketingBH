const http = require('https');
const data = JSON.stringify({
  session_id: 'test_123',
  status: 'em_progresso',
  current_step: 1,
  max_step: 1
});
const options = {
  hostname: 'gycpwtlwehgwxqyrmbzt.supabase.co',
  path: '/rest/v1/form_sessions',
  method: 'POST',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3B3dGx3ZWhnd3hxeXJtYnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MjgwNTMsImV4cCI6MjEwNjIwNDA1M30.kq7O_qT9NnkSEtjZ8bXnsbU-7yf5wW4VwpwJ4H9lrnA',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Y3B3dGx3ZWhnd3hxeXJtYnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2MjgwNTMsImV4cCI6MjEwNjIwNDA1M30.kq7O_qT9NnkSEtjZ8bXnsbU-7yf5wW4VwpwJ4H9lrnA',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
  }
};
const req = http.request(options, res => {
  let resData = '';
  res.on('data', chunk => resData += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, '\nDATA:', resData));
});
req.on('error', e => console.error(e));
req.write(data);
req.end();
