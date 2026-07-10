package starter.taskmanager.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class userdto{
    private long id;
    private String name;
    private String email;
    private String password;
}