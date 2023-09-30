package idv.kuma;

public class GameFlow {
    private final Reels reels;
    private final PayTable payTable;

    public GameFlow(Reels reels, PayTable payTable) {
        this.reels = reels;
        this.payTable = payTable;
    }

    SpinResult runGameFlow(int bet) {

        this.reels.spin();

        Screen screen = this.reels.getScreen();

        int odd = this.payTable.getOdd(screen);

        int win = odd * bet;

        return new SpinResult(win, screen);
    }

    Screen getScreen() {
        return this.reels.getScreen();

    }
}