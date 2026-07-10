package starter.taskmanager.serviceimp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import starter.taskmanager.entity.Users;
import starter.taskmanager.payload.userdto;
import starter.taskmanager.repository.userrepo;
import starter.taskmanager.service.userservice;
@Service
public class userserviceimp implements userservice{
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private userrepo userrepo;
    @Override
    public userdto createuser(userdto userdto) {
        userdto.setPassword(passwordEncoder.encode(userdto.getPassword()));
        Users user=dtotouser(userdto);   
        Users savedUser=userrepo.save(user);
        return usertodto(savedUser);
    }
    private Users dtotouser(userdto userdto) {
        Users user=new Users();
        user.setEmail(userdto.getEmail());
        user.setName(userdto.getName());
        user.setPassword(userdto.getPassword());
        return user;
    }
    private userdto usertodto(Users user) {
        userdto userdto1=new userdto();
        userdto1.setId(user.getId());
        userdto1.setEmail(user.getEmail());
        userdto1.setName(user.getName());
        userdto1.setPassword(user.getPassword());
        return userdto1;
    }
}