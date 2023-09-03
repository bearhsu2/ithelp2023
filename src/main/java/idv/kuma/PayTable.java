package idv.kuma;

import java.util.*;

public class PayTable {
    private final Map<Integer, Integer> odds = Map.ofEntries(
            new AbstractMap.SimpleImmutableEntry<Integer, Integer>(0, 0),
            new AbstractMap.SimpleImmutableEntry<Integer, Integer>(1, 10),
            new AbstractMap.SimpleImmutableEntry<Integer, Integer>(2, 40),
            new AbstractMap.SimpleImmutableEntry<Integer, Integer>(3, 100)
    );

    public PayTable() {
    }

    public int getOdd(List<List<String>> rawScreen) {
        int lines = new Screen(rawScreen).countStraightLines();

        return getOdd(lines);
    }

    private int getOdd(int lines) {

        Integer odd = odds.get(lines);

        if (Objects.isNull(odd)) {
            throw new RuntimeException("Unsupported lines");
        }

        return odd;
    }
}