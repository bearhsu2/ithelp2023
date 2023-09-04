package idv.kuma;

public class PreConditionViolatedException extends RuntimeException {
    public PreConditionViolatedException(String message) {
        super(message);
    }
}
