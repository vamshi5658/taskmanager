package starter.taskmanager.payload;
import lombok.Getter;
@Getter
public class jwtparser {
    private String token;
    private String type="bearer";
    public jwtparser(String token) {
        this.token = token;
    }
}