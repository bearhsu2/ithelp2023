package idv.kuma;

import java.util.*;

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

    private int getOdd(int lines) {

        if (!odds.containsKey(lines)) {
            throw new PreConditionViolation("Unsupported lines");
        }

        return odds.get(lines);
    }


}