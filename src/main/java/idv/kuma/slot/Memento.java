package idv.kuma.slot;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Memento {

    List<Integer> baseGamePositions;
    List<Integer> freeGamePositions;

    int freeGameCount;

}
