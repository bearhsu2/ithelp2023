package idv.kuma;

import java.util.List;

public class SlotScoreCalculator {
    private final Reels baseGameReels;
    private final PayTable baseGamePayTable;
    private final Reels freeGameReels;
    private final PayTable freeGamePayTable;
    private final GameFlow baseGameFlow;
    private final GameFlow freeGameFlow;
    private int freeGameCount;
    private int freeGameBet;

    public SlotScoreCalculator(Reels baseGameReels, PayTable baseGamePayTable, Reels freeGameReels, PayTable freeGamePayTable) {
        this.baseGameReels = baseGameReels;
        this.baseGamePayTable = baseGamePayTable;
        this.freeGameReels = freeGameReels;
        this.freeGamePayTable = freeGamePayTable;
        baseGameFlow = new GameFlow(baseGameReels, baseGamePayTable);
        freeGameFlow = new GameFlow(freeGameReels, freeGamePayTable);
    }

    public SpinResult spinBase(int bet) throws WrongModeException {

        if (freeGameCount > 0) {
            throw new WrongModeException("wrong mode: FREE_GAME");
        }

        SpinResult result = baseGameFlow.runGameFlow(bet);

        tryTriggerFreeGame(result.getScreen(), bet);

        return result;

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
            return baseGameFlow.getScreen();
        } else {
            return freeGameFlow.getScreen();
        }
    }

    public SpinResult spinFree() throws WrongModeException {


        if (freeGameCount <= 0) {
            throw new WrongModeException("wrong mode: BASE_GAME");
        }


        SpinResult spinResult = freeGameFlow.runGameFlow(freeGameBet);

        tryDeactivateFreeGame();

        return spinResult;

    }

    private void tryDeactivateFreeGame() {
        freeGameCount--;
    }

}
