const API_BASE = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');

export async function register(user){
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user)
  });
  if(!res.ok) throw new Error('Register failed');
  return res.json();
}

export async function login(user){
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user)
  });
  if(!res.ok) throw new Error('Login failed');
  const body = await res.json();
  return body; // expected {token: '...'}
}

export async function getTasks(token, userid){
  const res = await fetch(`${API_BASE}/api/${userid}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if(!res.ok) throw new Error('Failed to load tasks');
  return res.json();
}

export async function createTask(token, userid, task){
  const res = await fetch(`${API_BASE}/api/${userid}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(task)
  });
  if(!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function deleteTask(token, userid, taskid){
  const res = await fetch(`${API_BASE}/api/${userid}/tasks/${taskid}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if(!res.ok) throw new Error('Failed to delete task');
  return;
}
