package starter.taskmanager.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import starter.taskmanager.payload.taskdto;
import starter.taskmanager.service.taskservice;
@RestController
@RequestMapping("/api")
public class taskcontroller {
    @Autowired
    private taskservice taskservice;

    @PostMapping("/{userid}/tasks")
    public ResponseEntity<taskdto> savetask(@PathVariable long userid, @RequestBody taskdto taskdto) {
        return new ResponseEntity<>(taskservice.savetask(userid, taskdto), HttpStatus.CREATED);
    }
    @GetMapping("/{userid}/tasks")
    public ResponseEntity<List<taskdto>> getalltasks(@PathVariable long userid) {
        return new ResponseEntity<>(taskservice.getalltasks(userid), HttpStatus.OK);
    }
    @GetMapping("/{userid}/tasks/{taskid}")
    public ResponseEntity<taskdto> gettaskbyid(@PathVariable long userid, @PathVariable long taskid) {
        return new ResponseEntity<>(taskservice.gettaskbyid(userid, taskid), HttpStatus.OK);
    }
    @DeleteMapping("/{userid}/tasks/{taskid}")
    public ResponseEntity<Void> deletetask(@PathVariable long userid, @PathVariable long taskid) {
        taskservice.deletetask(userid, taskid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}