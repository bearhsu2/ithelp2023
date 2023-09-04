package idv.kuma;

import java.util.AbstractMap;
import java.util.Map;
import java.util.function.Supplier;

public class PayTable {
    private final Map<Integer, Integer> odds = Map.ofEntries(
            new AbstractMap.SimpleImmutableEntry<>(0, 0),
            new AbstractMap.SimpleImmutableEntry<>(1, 10),
            new AbstractMap.SimpleImmutableEntry<>(2, 40),
            new AbstractMap.SimpleImmutableEntry<>(3, 100)
    );


    public int getOdd(Screen screen) {

        int lines = screen.countStraightLines();

        return getOdd(lines);
    }

    private Integer getOdd(int lines) {

        Supplier<Boolean> preCondition = () -> odds.containsKey(lines);


        checkPreCondition((Supplier<Boolean>) preCondition);

        return odds.get(lines);
    }

    private void checkPreCondition(Supplier<Boolean> preCondition) {
        if (!(boolean) preCondition.get()) {
            throw new RuntimeException("Unsupported lines");
        }
    }


}