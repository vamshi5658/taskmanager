import React, {useEffect, useState} from 'react';
import { getTasks, createTask, deleteTask } from '../api';

export default function Tasks({token, userid}){
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [err, setErr] = useState(null);

  async function load(){
    try{
      const data = await getTasks(token, userid || 0);
      setTasks(data);
    }catch(e){ setErr(e.message); }
  }
  useEffect(()=>{ load(); }, []);

  async function add(){
    try{
      const t = await createTask(token, userid || 0, {tname: name});
      setTasks(prev=>[...prev, t]);
      setName('');
    }catch(e){ setErr(e.message); }
  }
  async function remove(id){
    try{
      await deleteTask(token, userid || 0, id);
      setTasks(prev=>prev.filter(x=>x.id!==id));
    }catch(e){ setErr(e.message); }
  }

  return (
    <div>
      <h2>Tasks</h2>
      {err && <p style={{color:'red'}}>{err}</p>}
      <div>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="New task name" />
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {tasks.map(t=> (
          <li key={t.id}>{t.tname} <button onClick={()=>remove(t.id)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
}
