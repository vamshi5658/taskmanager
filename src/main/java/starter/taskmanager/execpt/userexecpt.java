package starter.taskmanager.execpt;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class userexecpt extends RuntimeException {
    String message;
    public userexecpt(String message) {
        super(message);
        this.message = message;
    }
}