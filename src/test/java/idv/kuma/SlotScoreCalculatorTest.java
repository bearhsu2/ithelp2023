package idv.kuma;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

class SlotScoreCalculatorTest {
    @Test
    void lose() {

        SlotScoreCalculator sut = new SlotScoreCalculator();

        int win = sut.calculate();

        Assertions.assertThat(win).isEqualTo(0);
    }
}