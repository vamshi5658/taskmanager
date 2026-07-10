import React, {useState} from 'react';
import Auth from './components/Auth';
import Tasks from './components/Tasks';
import './App.css';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userid'));

  function handleLogin({token, userid}){
    if(token) localStorage.setItem('token', token);
    if(userid) localStorage.setItem('userid', userid);
    setToken(token);
    setUserId(userid);
  }
  function handleLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    setToken(null);
    setUserId(null);
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {!token ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>Logged in</div>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <Tasks token={token} userid={userId} />
        </>
      )}
    </div>
  );
}
