package idv.kuma;

import java.util.*;
import java.util.stream.Stream;

public class SlotScoreCalculator {
    private final List<List<String>> reels;
    private final Random random;
    private final PayTable payTable;

    public SlotScoreCalculator(List<List<String>> reels, Random random, PayTable payTable) {
        this.reels = reels;
        this.random = random;
        this.payTable = payTable;
    }

    public int calculate(int bet) {


        List<List<String>> rawScreen = reels.stream().map(
                reel -> {
                    int nextPosition = random.nextInt(reel.size());

                    return Stream.concat(reel.stream(), reel.stream()).toList().subList(
                            nextPosition, nextPosition + 3
                    );
                }
        ).toList();

        Screen screen = new Screen(rawScreen);

        int odd = payTable.getOdd(screen);

        return odd * bet;

    }


}
