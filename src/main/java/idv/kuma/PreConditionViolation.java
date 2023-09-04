package idv.kuma;

public class PreConditionViolation extends RuntimeException {
    public PreConditionViolation(String message) {
        super(message);
    }
}
