package starter.taskmanager.service;
import java.util.List;

import starter.taskmanager.payload.taskdto;

public interface taskservice {
    public taskdto savetask(long userid, taskdto taskdto);
    public List<taskdto> getalltasks(long userid);
    public taskdto gettaskbyid(long userid, long taskid);
    public void deletetask(long userid, long taskid);
}