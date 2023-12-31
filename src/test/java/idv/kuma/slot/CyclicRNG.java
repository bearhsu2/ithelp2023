package idv.kuma.slot;

import idv.kuma.slot.RandomNumberGenerator;

import java.util.ArrayDeque;
import java.util.List;
import java.util.Queue;

public class CyclicRNG implements RandomNumberGenerator {

    private Queue<Integer> expectedValues = new ArrayDeque<>();

    public void resetExpectedValues(List<Integer> expecteds) {

        this.expectedValues.clear();

        this.expectedValues.addAll(expecteds);

    }

    @Override
    public int nextInt(int bound) {

        Integer polled = expectedValues.remove();

        expectedValues.add(polled);

        return polled;
    }
}
