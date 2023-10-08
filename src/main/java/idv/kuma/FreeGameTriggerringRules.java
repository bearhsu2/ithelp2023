package idv.kuma;

import java.util.List;

public class FreeGameTriggerringRules {
    public FreeGameTriggerringRules() {
    }

    public int getFreeGameCount() {
        return 3;
    }

    public boolean checkTriggeringRules(Screen screen) {
        int count = 0;
        for (List<String> rawColumn : screen.rawScreen()) {
            for (String grid : rawColumn) {
                if (grid.equals("A")) {
                    count++;
                }
            }
        }

        return count >= 10;
    }
}