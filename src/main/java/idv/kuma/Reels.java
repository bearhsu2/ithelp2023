package idv.kuma;

import java.util.ArrayList;
import java.util.List;

public final class Reels {

    private final List<Reel> reelList = new ArrayList<>();

    public Reels(List<List<String>> rawReels, RandomNumberGenerator randomNumberGenerator) {

        for (List<String> rawReel : rawReels) {
            Reel reel = new Reel(rawReel, randomNumberGenerator);
            reelList.add(reel);
        }


    }

    public void spin() {

        for (Reel reel : reelList) {
            reel.roll();
        }


    }


    public Screen getScreen() {

        List<List<String>> rawScreen = reelList.stream().map(
                reel -> reel.getScreenColumn(3)
        ).toList();

        return new Screen(rawScreen);
    }
}