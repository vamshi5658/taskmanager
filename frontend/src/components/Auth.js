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
        onLogin({token, userid: localStorage.getItem('userid')});
      } else {
        const created = await register({name:form.name, email:form.email, password:form.password});
        alert('User created. Please login.');
        setIsLogin(true);
      }
    }catch(e){ setErr(e.message); }
  }

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit}>
        {!isLogin && (
          <div>
            <input name="name" value={form.name} onChange={onChange} placeholder="Name" required />
          </div>
        )}
        <div>
          <input name="email" value={form.email} onChange={onChange} placeholder="Email" required />
        </div>
        <div>
          <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" required />
        </div>
        <div>
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </div>
      </form>
      <div>
        <button onClick={()=>{setIsLogin(!isLogin); setErr(null);}}>
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
      {err && <p style={{color:'red'}}>{err}</p>}
    </div>
  );
}
