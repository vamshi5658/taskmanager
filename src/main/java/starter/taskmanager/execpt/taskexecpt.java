package starter.taskmanager.execpt;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class taskexecpt extends Exception {
    String message;
    public taskexecpt(String message) {
        super(message);
        this.message = message;
    }
}
