package idv.kuma;

import java.util.ArrayList;
import java.util.List;

public final class Reels {
    private final RandomNumberGenerator randomNumberGenerator;

    private final List<Reel> reelList = new ArrayList<>();
//    private final List<List<String>> rawReels;
//    private Screen screen;

    public Reels(List<List<String>> rawReels, RandomNumberGenerator randomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;

        for (List<String> rawReel : rawReels) {
            Reel reel = new Reel(rawReel);
            reelList.add(reel);
        }


//        this.rawReels = rawReels;
//        List<List<String>> rawScreen = rawReels.stream().map(
//                reel -> {
//                    int nextPosition = 0;
//
//                    return Stream.concat(reel.stream(), reel.stream()).toList().subList(
//                            nextPosition, nextPosition + 3
//                    );
//                }
//        ).toList();

//        this.screen = new Screen(rawScreen);

    }

    public void spin() {

        for (Reel reel : reelList) {
            reel.roll(randomNumberGenerator);
        }

//        List<List<String>> rawScreen = rawReels.stream().map(
//                reel -> {
//
//                    int nextPosition = randomNumberGenerator.nextInt(reel.size()); // command
//
//                    return Stream.concat(reel.stream(), reel.stream()).toList().subList( // prepare for query
//                            nextPosition, nextPosition + 3
//                    );
//                }
//        ).toList();

//        this.screen = new Screen(rawScreen); // prepare for query

    }


    public Screen getScreen() {

        List<List<String>> rawScreen = reelList.stream().map(
                reel -> reel.getScreenColumn(3)
        ).toList();

        return new Screen(rawScreen);
    }
}