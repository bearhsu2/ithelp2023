package idv.kuma.slot;

public class SlotScoreCalculator {
    private final GameFlow baseGameFlow;
    private final GameFlow freeGameFlow;
    private final FreeGameTriggerringRules freeGameTriggerringRules;
    private int freeGameCount;
    private int freeGameBet;

    public SlotScoreCalculator(GameFlow baseGameFlow, GameFlow freeGameFlow, FreeGameTriggerringRules freeGameTriggerringRules) {
        this.baseGameFlow = baseGameFlow;
        this.freeGameFlow = freeGameFlow;
        this.freeGameTriggerringRules = freeGameTriggerringRules;
    }

    public SpinResult spinBase(int bet) throws WrongModeException {

        if (isFreeGame()) {
            throw new WrongModeException("wrong mode: FREE_GAME");
        }

        SpinResult result = baseGameFlow.runGameFlow(bet);

        tryTriggerFreeGame(result.getScreen(), bet);

        return result;

    }

    public boolean isFreeGame() {
        return freeGameCount > 0;
    }

    private void tryTriggerFreeGame(Screen screen, int bet) {
        boolean shouldTriggerFreeGame = freeGameTriggerringRules.check(screen);

        if (shouldTriggerFreeGame) {
            freeGameCount += freeGameTriggerringRules.getCount();
            freeGameBet = bet;
        }
    }


    public Screen getScreen() {

        if (!isFreeGame()) {
            return baseGameFlow.getScreen();
        } else {
            return freeGameFlow.getScreen();
        }
    }

    public SpinResult spinFree() throws WrongModeException {


        if (!isFreeGame()) {
            throw new WrongModeException("wrong mode: BASE_GAME");
        }


        SpinResult spinResult = freeGameFlow.runGameFlow(freeGameBet);

        tryDeactivateFreeGame();

        return spinResult;

    }

    private void tryDeactivateFreeGame() {
        freeGameCount--;
    }

    public Memento toMemento() {

        return new Memento(
                baseGameFlow.getPositions(),
                freeGameFlow.getPositions(),
                freeGameCount

        );
    }

    public void restore(Memento memento) {

        baseGameFlow.restore(memento.getBaseGamePositions());
        freeGameFlow.restore(memento.getFreeGamePositions());
        freeGameCount = memento.getFreeGameCount();
    }
}
