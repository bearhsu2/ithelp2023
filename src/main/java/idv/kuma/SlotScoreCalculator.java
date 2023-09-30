package idv.kuma;

import java.util.List;

public class SlotScoreCalculator {
    private final Reels baseGameReels;
    private final PayTable baseGamePayTable;
    private final Reels freeGameReels;
    private final PayTable freeGamePayTable;
    private int freeGameCount;
    private int freeGameBet;

    public SlotScoreCalculator(Reels baseGameReels, PayTable baseGamePayTable, Reels freeGameReels, PayTable freeGamePayTable) {
        this.baseGameReels = baseGameReels;
        this.baseGamePayTable = baseGamePayTable;
        this.freeGameReels = freeGameReels;
        this.freeGamePayTable = freeGamePayTable;
    }

    public SpinResult spinBase(int bet) throws WrongModeException {

        if (freeGameCount > 0) {
            throw new WrongModeException("wrong mode: FREE_GAME");
        }

        SpinResult result = runGameFlow(bet, baseGameReels, baseGamePayTable);

        tryTriggerFreeGame(result.getScreen(), bet);

        return result;

    }

    private SpinResult runGameFlow(int bet, Reels reels, PayTable payTable) {

        reels.spin();

        Screen screen = reels.getScreen();

        int odd = payTable.getOdd(screen);

        int win = odd * bet;

        return new SpinResult(win, screen);
    }

    private record Result(Screen screen, int win) {
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
            return baseGameReels.getScreen();
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

        int odd = freeGamePayTable.getOdd(screen);

        int win = odd * freeGameBet;

        tryDeactivateFreeGame();

        return new SpinResult(win, screen);

    }

    private void tryDeactivateFreeGame() {
        freeGameCount--;
    }

}
