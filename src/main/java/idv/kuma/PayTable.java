package idv.kuma;

import java.util.*;
import java.util.stream.Collectors;

public class PayTable {
    private final Map<Integer, Integer> odds = Map.ofEntries(
            new AbstractMap.SimpleImmutableEntry<Integer, Integer>(0, 0),
            new AbstractMap.SimpleImmutableEntry<Integer, Integer>(1, 10),
            new AbstractMap.SimpleImmutableEntry<Integer, Integer>(2, 40),
            new AbstractMap.SimpleImmutableEntry<Integer, Integer>(3, 100)
    );

    public PayTable() {
    }

    public int getOdd(List<List<String>> screen) {
        int lines = getLines(screen);

        return getOdd(lines);
    }

    private int getLines(List<List<String>> screen) {
        int lines = 0;
        for (int i = 0; i < 3; i++) {

            int finalI = i;
            Set<String> distinctSymbols = screen.stream().map(wheel -> wheel.get(finalI)).collect(Collectors.toSet());

            if (distinctSymbols.size() == 1) {
                lines++;
            }
        }
        return lines;
    }

    private int getOdd(int lines) {

        Integer odd = odds.get(lines);

        if (Objects.isNull(odd)) {
            throw new RuntimeException("Unsupported lines");
        }

        return odd;
    }
}