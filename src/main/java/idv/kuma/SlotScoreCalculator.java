package idv.kuma;

import java.util.*;
import java.util.stream.Collectors;

public class SlotScoreCalculator {
    private final List<List<String>> wheels;
    private final Map<Integer, Integer> odds = Map.ofEntries(
            new AbstractMap.SimpleImmutableEntry<>(0, 0),
            new AbstractMap.SimpleImmutableEntry<>(1, 10),
            new AbstractMap.SimpleImmutableEntry<>(2, 40),
            new AbstractMap.SimpleImmutableEntry<>(3, 100)
    );

    public SlotScoreCalculator(List<List<String>> wheels) {
        this.wheels = wheels;
    }

    public int calculate(int bet) {


        int odd = getOdd();

        return odd * bet;

    }

    private int getOdd() {
        int lines = getLines();

        return getOdd(lines);
    }

    private int getOdd(int lines) {

        Integer odd = odds.get(lines);

        if (Objects.isNull(odd)) {
            throw new RuntimeException("Unsupported lines");
        }

        return odd;
    }

    private int getLines() {
        int lines = 0;
        for (int i = 0; i < 3; i++) {

            int finalI = i;
            Set<String> distinctSymbols = wheels.stream().map(wheel -> wheel.get(finalI)).collect(Collectors.toSet());

            if (distinctSymbols.size() == 1) {
                lines++;
            }
        }
        return lines;
    }


}
