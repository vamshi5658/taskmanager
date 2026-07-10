package starter.taskmanager.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import starter.taskmanager.entity.Task;                                           
public interface taskrepo extends JpaRepository<Task, Long> {

    List<Task> findByUsersId(long userid);
}