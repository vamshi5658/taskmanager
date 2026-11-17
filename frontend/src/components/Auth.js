import React, {useState} from 'react';
import { register, login } from '../api';

export default function Auth({onLogin}){
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({name:'', email:'', password:''});
  const [err, setErr] = useState(null);

  function onChange(e){ setForm({...form, [e.target.name]: e.target.value}); }

  async function submit(e){
    e.preventDefault();
    try{
      if(isLogin){
        const data = await login({email:form.email, password:form.password});
        // backend currently responds with jwtparser holding token string. Keep flexibility.
        const token = data.token || (typeof data === 'string' ? data : (data?.jwt || ''));
        // userid is not returned by backend on login; prompt user to paste their id into localStorage if needed.
        onLogin({ token, userid: data.userid });
      } else {
        const created = await register({name:form.name, email:form.email, password:form.password});
        alert('User created. Please login.');
        setIsLogin(true);
      }
    }catch(e){ setErr(e.message); }
  }

  return (
    <div className="auth-panel">
      <div className="section-heading">
        <div>
          <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
          <p>{isLogin ? 'Sign in to pick up where you left off.' : 'Create an account to start organizing your tasks.'}</p>
        </div>
      </div>
      <form className="auth-form" onSubmit={submit}>
        {!isLogin && (
          <div className="field">
            <label htmlFor="auth-name">Name</label>
            <input id="auth-name" name="name" value={form.name} onChange={onChange} placeholder="Your name" autoComplete="name" required />
          </div>
        )}
        <div className="field">
          <label htmlFor="auth-email">Email address</label>
          <input id="auth-email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="auth-password">Password</label>
          <input id="auth-password" name="password" type="password" value={form.password} onChange={onChange} placeholder="Enter your password" autoComplete={isLogin ? 'current-password' : 'new-password'} required />
        </div>
        <button className="primary-button auth-submit" type="submit">{isLogin ? 'Sign in' : 'Create account'}</button>
      </form>
      <div className="auth-switch">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button type="button" onClick={()=>{setIsLogin(!isLogin); setErr(null);}}>
          {isLogin ? 'Create one' : 'Sign in'}
        </button>
      </div>
      {err && <p className="error-message" role="alert">{err}</p>}
    </div>
  );
}
