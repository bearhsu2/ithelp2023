package idv.kuma;

public class SlotScoreCalculator {
    private final PayTable payTable;
    private final Reels reels;

    public SlotScoreCalculator(PayTable payTable, Reels reels) {
        this.payTable = payTable;
        this.reels = reels;
    }

    public int calculate(int bet) {

        Screen screen = reels.reelsToScreen();

        int odd = payTable.getOdd(screen);

        return odd * bet;

    }


}
