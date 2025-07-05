import {ProbabilitySystem} from "./ProbabilitySystem";
import {Bet} from "./Bet";
import {ProbabilitySystemFactory} from "./ProbabilitySystemFactory";

describe('probability system simulator', () => {


    test('RTP Simulator', () => {

        const sut: ProbabilitySystem = new ProbabilitySystemFactory().createProbabilitySystem('JinInManWu');

        let nextGameType = sut.getNextGameType();
        const rounds = 1_000;
        let totalOdd = 0;
        for (let i = 0; i < rounds; i++) {

            const spinResult = "BASE_GAME" === nextGameType
                ? sut.spin(new Bet('L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'))
                : sut.spinFree();

            totalOdd += spinResult.odd;
            nextGameType = spinResult.nextGameType;

        }

        console.log(`Total odd: ${totalOdd}, Average odd: ${totalOdd / rounds}`);

    });


});
