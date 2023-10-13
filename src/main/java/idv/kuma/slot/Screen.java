package idv.kuma.slot;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public record Screen(List<List<String>> rawScreen) {
    int countStraightLines() {
        int lines = 0;
        for (int i = 0; i < 3; i++) {

            int finalI = i;
            Set<String> distinctSymbols = rawScreen().stream().map(wheel -> wheel.get(finalI)).collect(Collectors.toSet());

            if (distinctSymbols.size() == 1) {
                lines++;
            }
        }
        return lines;
    }
}