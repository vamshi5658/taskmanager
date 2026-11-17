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
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="m6 12.5 4 4L18.5 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 2.8a9.2 9.2 0 1 0 9.2 9.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span>Taskflow</span>
        </div>
        <span className="topbar-note">A little more focus, every day.</span>
      </header>

      <main className="page-content">
        <section className="hero">
          <p className="eyebrow">{token ? 'Your workspace' : 'Your day, in order'}</p>
          <h1>{token ? 'Make progress.' : 'Make room for what matters.'}</h1>
          <p>
            {token
              ? 'Keep your next steps clear, capture new tasks, and move forward.'
              : 'A calm, simple space to collect your tasks and keep moving forward.'}
          </p>
        </section>

        <section className="card">
          {!token ? (
            <Auth onLogin={handleLogin} />
          ) : (
            <>
              <div className="session-bar">
                <span className="session-status"><span className="status-dot" />Signed in to your workspace</span>
                <button className="logout-button" onClick={handleLogout}>Log out</button>
              </div>
              <Tasks token={token} userid={userId} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
