package idv.kuma;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class SlotScoreCalculator {
    private final List<List<String>> wheels;

    public SlotScoreCalculator(List<List<String>> wheels) {
        this.wheels = wheels;
    }

    public int calculate(int bet) {


        // # lines
        int lines = getLines();

        // get odds
        int odd = getOdd(lines);

        return odd * bet;

    }

    private int getOdd(int sumOfSameLines) {
        int odd;
        if (sumOfSameLines == 0) {
            odd = 0;
        } else if (sumOfSameLines == 1) {
            odd = 10;
        } else if (sumOfSameLines == 2) {
            odd = 40;
        } else {
            throw new RuntimeException("TBD");
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
