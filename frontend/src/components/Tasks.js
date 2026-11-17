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
    <div className="tasks-panel">
      <div className="tasks-heading">
        <div>
          <h2>Your tasks</h2>
          <p>One step at a time. You’ve got this.</p>
        </div>
        <span className="task-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
      </div>
      {err && <p className="error-message" role="alert">{err}</p>}
      <div className="task-entry">
        <input aria-label="New task name" value={name} onChange={e=>setName(e.target.value)} placeholder="What needs to get done?" />
        <button className="primary-button" onClick={add}>Add task <span aria-hidden="true">+</span></button>
      </div>
      {tasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">✓</span>
          <p>Your list is clear.</p>
          <span>Add a task above to get started.</span>
        </div>
      ) : (
      <ul className="task-list">
        {tasks.map(t=> (
          <li key={t.id}>
            <span className="task-check" aria-hidden="true"></span>
            <span className="task-name">{t.tname}</span>
            <button className="delete-button" aria-label={`Delete ${t.tname}`} onClick={()=>remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
