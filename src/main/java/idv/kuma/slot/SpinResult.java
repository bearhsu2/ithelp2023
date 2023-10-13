package idv.kuma.slot;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpinResult {
    private final int win;
    private final Screen screen;
}
