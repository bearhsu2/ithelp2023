package idv.kuma.slot;

import java.util.function.BooleanSupplier;

public class DBC {

    public static void checkPreCondition(BooleanSupplier preCondition, String message) {
        if (!preCondition.getAsBoolean()) {
            throw new PreConditionViolatedException(message);
        }
    }
}