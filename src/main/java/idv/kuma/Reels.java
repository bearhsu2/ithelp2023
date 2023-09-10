package idv.kuma;

import java.util.List;
import java.util.stream.Stream;

public final class Reels {
    private final List<List<String>> rawReels;
    private final RandomNumberGenerator randomNumberGenerator;
    private Screen screen;

    public Reels(List<List<String>> rawReels, RandomNumberGenerator randomNumberGenerator) {
        this.rawReels = rawReels;
        this.randomNumberGenerator = randomNumberGenerator;


        List<List<String>> rawScreen = rawReels.stream().map(
                reel -> {
                    int nextPosition = 0;

                    return Stream.concat(reel.stream(), reel.stream()).toList().subList(
                            nextPosition, nextPosition + 3
                    );
                }
        ).toList();

        this.screen = new Screen(rawScreen);

    }

    // todo: return VOID
    public void spin() {
        List<List<String>> rawScreen = rawReels.stream().map(
                reel -> {

                    int nextPosition = randomNumberGenerator.nextInt(reel.size()); // command

                    return Stream.concat(reel.stream(), reel.stream()).toList().subList( // prepare for query
                            nextPosition, nextPosition + 3
                    );
                }
        ).toList();

        this.screen = new Screen(rawScreen); // prepare for query

    }


    public Screen getScreen() {
        return this.screen;
    }
}