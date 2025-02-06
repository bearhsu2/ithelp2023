package idv.kuma.slot;

public class PreConditionViolatedException extends RuntimeException {
    public PreConditionViolatedException(String message) {
        super(message);
    }
}
