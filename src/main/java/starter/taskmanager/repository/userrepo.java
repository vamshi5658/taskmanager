package starter.taskmanager.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import starter.taskmanager.entity.Users;
public interface userrepo extends JpaRepository<Users, Long> {
    <optional>Users findByEmail(String email);
}