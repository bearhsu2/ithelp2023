package idv.kuma;

import java.util.List;

public class SlotScoreCalculator {
    private final PayTable payTable;
    private final Reels reels;
    private Reels freeGameReels;
    private int freeGameCount;

    public SlotScoreCalculator(PayTable payTable, Reels reels, Reels freeGameReels) {
        this.payTable = payTable;
        this.reels = reels;
        this.freeGameReels = freeGameReels;
    }

    public SpinResult spinBase(int bet) {

        if (freeGameCount > 0) {
            throw new RuntimeException("wrong mode: FREE_GAME");
        }


        reels.spin();

        Screen screen = reels.getScreen();

        int odd = payTable.getOdd(screen);

        int win = odd * bet;

        int count = 0;
        for (List<String> rawColumn : screen.rawScreen()) {
            for (String grid : rawColumn) {
                if (grid.equals("A")) {
                    count++;
                }
            }
        }

        if (count >= 10) {
            freeGameCount += 3;
        }

        return new SpinResult(win, screen);

    }


    public Screen getScreen() {
        return reels.getScreen();
    }


    public SpinResult spinFree() {


        if (freeGameCount <= 0) {
            throw new RuntimeException("wrong mode: BASE_GAME");
        }

        freeGameReels.spin();

        Screen screen = freeGameReels.getScreen();

        int odd = getOddFreeGame(screen);

        int win = odd * 10;

        freeGameCount--;

        return new SpinResult(win, screen);

    }

    private int getOddFreeGame(Screen screen) {
        int odd = 0;

        int lines = screen.countStraightLines();
        if (lines == 3) {
            odd = 500;

        } else if (lines == 2) {
            odd = 300;
        } else if (lines == 1) {
            odd = 100;

        }
        return odd;
    }
}
