package starter.taskmanager.payload;
import lombok.Getter;
@Getter
public class jwtparser {
    private String token;
    private String type="bearer";
    private long userid;
    public jwtparser(String token,long userid) {
        this.token = token;
        this.userid=userid;
    }
}