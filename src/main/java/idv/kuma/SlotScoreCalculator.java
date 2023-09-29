package idv.kuma;

import java.util.List;

public class SlotScoreCalculator {
    private final PayTable baseGamePayTable;
    private final Reels reels;
    private final Reels freeGameReels;
    private final FreeGamePayTable freeGamePayTable;
    private int freeGameCount;
    private int freeGameBet;

    public SlotScoreCalculator(PayTable baseGamePayTable, Reels reels, Reels freeGameReels, FreeGamePayTable freeGamePayTable) {
        this.baseGamePayTable = baseGamePayTable;
        this.reels = reels;
        this.freeGameReels = freeGameReels;
        this.freeGamePayTable = freeGamePayTable;
    }

    public SpinResult spinBase(int bet) throws WrongModeException {

        if (freeGameCount > 0) {
            throw new WrongModeException("wrong mode: FREE_GAME");
        }


        reels.spin();

        Screen screen = reels.getScreen();

        int odd = baseGamePayTable.getOdd(screen);

        int win = odd * bet;

        tryTriggerFreeGame(screen, bet);

        return new SpinResult(win, screen);

    }

    private void tryTriggerFreeGame(Screen screen, int bet) {
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
            freeGameBet = bet;
        }
    }


    public Screen getScreen() {

        if (freeGameCount <= 0) {
            return reels.getScreen();
        } else {
            return freeGameReels.getScreen();
        }
    }


    public SpinResult spinFree() throws WrongModeException {


        if (freeGameCount <= 0) {
            throw new WrongModeException("wrong mode: BASE_GAME");
        }

        freeGameReels.spin();

        Screen screen = freeGameReels.getScreen();

        int odd = freeGamePayTable.getOddFreeGame(screen);

        int win = odd * freeGameBet;

        tryDeactiveFreegame();

        return new SpinResult(win, screen);

    }

    private void tryDeactiveFreegame() {
        freeGameCount--;
    }

//    private int getOddFreeGame(Screen screen) {
//
//        return freeGamePayTable.getOddFreeGame(screen);
//    }
}
