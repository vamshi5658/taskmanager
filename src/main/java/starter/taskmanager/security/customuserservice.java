package starter.taskmanager.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashSet;
import java.util.Set;
import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.stereotype.Service;

import starter.taskmanager.entity.Users;
import starter.taskmanager.repository.userrepo;

@Service
public class customuserservice implements UserDetailsService{
    @Autowired
    private userrepo userrepo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userrepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_ADMIN");
        return new User(user.getEmail(), user.getPassword(), getAuthorities(roles));
    }
    private Collection<? extends GrantedAuthority> getAuthorities(Set <String> roles) {
        return roles.stream().map(
            role -> new SimpleGrantedAuthority(role)
        ).collect(Collectors.toList());
    }
} 