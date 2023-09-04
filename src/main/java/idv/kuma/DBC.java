package idv.kuma;

import java.util.function.BooleanSupplier;
import java.util.function.Supplier;

public class DBC {

    public static void checkPreCondition(BooleanSupplier preCondition, String message) {
        if (!preCondition.getAsBoolean()) {
            throw new PreConditionViolatedException(message);
        }
    }
}