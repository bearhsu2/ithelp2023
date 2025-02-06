package idv.kuma.slot;

import idv.kuma.slot.PayTable;
import idv.kuma.slot.Screen;

import java.util.List;

public class DafuAllStarsPayTable implements PayTable {
    @Override
    public int getOdd(Screen screen) {

        List<List<String>> rawScreen = screen.rawScreen();

        int count = 0;
        for (List<String> row : rawScreen) {

            if (row.get(0).equals("A")) {
                count++;
            } else {
                break;
            }

        }

        if (count == 5) {
            return 400;
        }

        return 200;

    }
}
