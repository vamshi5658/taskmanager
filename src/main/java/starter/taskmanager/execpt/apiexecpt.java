package starter.taskmanager.execpt;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class apiexecpt extends RuntimeException {
    public apiexecpt(String message) {
        super(message);
    }
}
