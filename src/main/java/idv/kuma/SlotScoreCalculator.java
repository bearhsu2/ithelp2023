package idv.kuma;

import java.util.*;

public class SlotScoreCalculator {
    private final Random random;
    private final PayTable payTable;
    private final Reels reels;

    public SlotScoreCalculator(List<List<String>> rawReels, Random random, PayTable payTable) {
        this.random = random;
        this.payTable = payTable;
        this.reels = new Reels(rawReels, random);
    }

    public int calculate(int bet) {

        Screen screen = reels.reelsToScreen();

        int odd = payTable.getOdd(screen);

        return odd * bet;

    }


}
