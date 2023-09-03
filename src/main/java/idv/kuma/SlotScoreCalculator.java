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
    private final Random random;

    public SlotScoreCalculator(List<List<String>> wheels, Random random) {
        this.wheels = wheels;
        this.random = random;
    }

    public int calculate(int bet) {

        List<List<String>> screen = new ArrayList<>();
        for (List<String> wheel : wheels) {
            int nextPosition = random.nextInt(wheel.size());

            List dummyWheel = new ArrayList();
            dummyWheel.addAll(wheel);
            dummyWheel.addAll(wheel);

            List<String> column = dummyWheel.subList(nextPosition, nextPosition + 3);

            screen.add(column);
        }

        // -----------------

        int odd = getOdd(screen);

        return odd * bet;

    }

    private int getOdd(List<List<String>> screen) {
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
