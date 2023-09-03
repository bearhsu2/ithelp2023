package idv.kuma;

import java.util.*;

public class SlotScoreCalculator {
    private final List<List<String>> rawReels;
    private final Random random;
    private final PayTable payTable;

    public SlotScoreCalculator(List<List<String>> rawReels, Random random, PayTable payTable) {
        this.rawReels = rawReels;
        this.random = random;
        this.payTable = payTable;
    }

    public int calculate(int bet) {


        Reels reels1 = new Reels(rawReels);

        Screen screen = reels1.reelsToScreen(this.random);

        int odd = payTable.getOdd(screen);

        return odd * bet;

    }


}
