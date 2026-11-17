package starter.taskmanager.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import starter.taskmanager.payload.jwtparser;
import starter.taskmanager.payload.userdto;
import starter.taskmanager.security.JwtProvider;
import starter.taskmanager.service.userservice;
import starter.taskmanager.repository.userrepo;
@RestController
@RequestMapping("api/auth/")
public class authcontroller {
    @Autowired 
    private userrepo userrepo;
   
    @Autowired
    private userservice userservice;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtProvider jwtProvider;
    @PostMapping("/register")
    public ResponseEntity<userdto> createuser(@RequestBody userdto userdto) {
        return new ResponseEntity<>(userservice.createuser(userdto), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<jwtparser> loginuser(@RequestBody userdto userdto){
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userdto.getEmail(), userdto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token=jwtProvider.generateToken(authentication);
        var user = userrepo.findByEmail(authentication.getName());
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return ResponseEntity.ok(new jwtparser(token, user.getId()));
    } 
}