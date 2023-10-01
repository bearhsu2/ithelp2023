package idv.kuma;

public class DafuAllStarsPayTable implements PayTable {
    @Override
    public int getOdd(Screen screen) {
        return 400;
    }
}
