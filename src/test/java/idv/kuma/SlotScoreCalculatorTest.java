package idv.kuma;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Random;

class SlotScoreCalculatorTest {

    private final Random random = Mockito.mock(Random.class);
    private final NativeRandomNumberGenerator randomNumberGenerator = new NativeRandomNumberGenerator(random);
    private SlotScoreCalculator sut;
    private SpinResult spinResult;

    @Test
    void three_lines() {

        Mockito.when(random.nextInt(Mockito.anyInt())).thenReturn(0);

        given_sut(List.of(
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3")
        ));


        spinResult = sut.calculate(10);

        Assertions.assertThat(spinResult.getWin()).isEqualTo(1_000);
    }

    private void given_sut(List<List<String>> rawReels) {
        sut = new SlotScoreCalculator(
                new PayTable(),
                new Reels(
                        rawReels, randomNumberGenerator)
        );
    }

    @Test
    void two_lines() {
        Mockito.when(random.nextInt(Mockito.anyInt())).thenReturn(0);

        given_sut(List.of(
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "4")
        ));

        spinResult = sut.calculate(10);

        Assertions.assertThat(spinResult.getWin()).isEqualTo(400);
    }

    @Test
    void one_line() {
        Mockito.when(random.nextInt(Mockito.anyInt())).thenReturn(0);

        given_sut(
                List.of(
                        List.of("A", "2", "3"),
                        List.of("A", "2", "3"),
                        List.of("A", "2", "3"),
                        List.of("A", "2", "3"),
                        List.of("A", "3", "4")
                )
        );


        Assertions.assertThat(sut.calculate(10).getWin()).isEqualTo(100);
    }

    @Test
    void spin_and_lose() {
        Mockito.when(random.nextInt(Mockito.anyInt())).thenReturn(1, 1, 1, 1, 2);

        given_sut(List.of(
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3")
        ));

        spinResult = sut.calculate(10);

        Assertions.assertThat(spinResult.getWin()).isEqualTo(0);
        Assertions.assertThat(spinResult.getScreen()).isEqualTo(
                new Screen(
                        List.of(
                                List.of("2", "3", "A"),
                                List.of("2", "3", "A"),
                                List.of("2", "3", "A"),
                                List.of("2", "3", "A"),
                                List.of("3", "A", "2")
                        )
                )
        );


        then_screen_should_be(
                List.of(
                        List.of("2", "3", "A"),
                        List.of("2", "3", "A"),
                        List.of("2", "3", "A"),
                        List.of("2", "3", "A"),
                        List.of("3", "A", "2")
                )
        );

    }

    private void then_screen_should_be(List<List<String>> rawScreen) {
        Screen screen = sut.getScreen();
        Assertions.assertThat(screen).isEqualTo(
                new Screen(
                        rawScreen
                )
        );
    }

    @Test
    void init() {

        given_sut(List.of(
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3")
        ));

        then_screen_should_be(List.of(
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3"),
                List.of("A", "2", "3")
        ));


    }
}