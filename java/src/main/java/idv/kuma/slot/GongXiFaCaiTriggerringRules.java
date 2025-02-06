package idv.kuma.slot;

import java.util.List;

public class GongXiFaCaiTriggerringRules implements FreeGameTriggerringRules {
    public GongXiFaCaiTriggerringRules() {
    }

    @Override
    public int getCount() {
        return 3;
    }

    @Override
    public boolean check(Screen screen) {
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