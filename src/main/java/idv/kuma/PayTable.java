package idv.kuma;

import java.util.AbstractMap;
import java.util.Map;

public class PayTable {
    private final Map<Integer, Integer> odds = Map.ofEntries(
            new AbstractMap.SimpleImmutableEntry<>(0, 0),
            new AbstractMap.SimpleImmutableEntry<>(1, 10),
            new AbstractMap.SimpleImmutableEntry<>(2, 40),
            new AbstractMap.SimpleImmutableEntry<>(3, 100)
    );
    private final idv.kuma.DBC DBC = new DBC();


    public int getOdd(Screen screen) {

        int lines = screen.countStraightLines();

        return getOdd(lines);
    }

    private Integer getOdd(int lines) {

        DBC.checkPreCondition(() -> odds.containsKey(lines), "Unsupported lines");

        return odds.get(lines);
    }


}