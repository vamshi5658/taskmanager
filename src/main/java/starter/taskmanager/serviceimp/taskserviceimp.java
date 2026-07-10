package starter.taskmanager.serviceimp;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import starter.taskmanager.entity.Task;
import starter.taskmanager.entity.Users;
import starter.taskmanager.execpt.userexecpt;
import starter.taskmanager.payload.taskdto;
import starter.taskmanager.repository.taskrepo;
import starter.taskmanager.repository.userrepo;
import starter.taskmanager.service.taskservice;



@Service
public class taskserviceimp implements taskservice{
    @Autowired
    private ModelMapper modelmapper;
    @Autowired
    private userrepo userrepo;
    @Autowired
    private taskrepo taskrepo;
    @Override
    public taskdto savetask(long userid, taskdto taskdto) {
        Users user=userrepo.findById(userid).orElseThrow(()->new userexecpt(String.format("user with id %d not found", userid)));
        Task task=modelmapper.map(taskdto, Task.class);
        task.setUsers(user);
        Task savedtask=taskrepo.save(task);
        return modelmapper.map(savedtask, taskdto.class);
    }
    @Override
    public List<taskdto> getalltasks(long userid) {
        userrepo.findById(userid).orElseThrow(()->new userexecpt(String.format("user with id %d not found", userid)));
        List<Task> tasks=taskrepo.findByUsersId(userid);
        return tasks.stream().map((task)->modelmapper.map(task, taskdto.class)).collect(Collectors.toList());
    }
    @Override
    public taskdto gettaskbyid(long userid, long taskid) {
        Users user=userrepo.findById(userid).orElseThrow(()->new userexecpt(String.format("user with id %d not found", userid)));
        Task task=taskrepo.findById(taskid).orElseThrow(()->new userexecpt(String.format("task with id %d not found", taskid)));
        if(task.getUsers().getId()!=user.getId()) {
            throw new userexecpt(String.format("task with id %d does not belong to user with id %d", taskid, userid));
        }
        return modelmapper.map(task, taskdto.class);
    }
    @Override
    public void deletetask(long userid, long taskid) {
        Users user=userrepo.findById(userid).orElseThrow(()->new userexecpt(String.format("user with id %d not found", userid)));
        Task task=taskrepo.findById(taskid).orElseThrow(()->new userexecpt(String.format("task with id %d not found", taskid)));
        if(task.getUsers().getId()!=user.getId()) {
            throw new userexecpt(String.format("task with id %d does not belong to user with id %d", taskid, userid));
        }
        taskrepo.delete(task);
    }
}