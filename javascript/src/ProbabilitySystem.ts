export class ProbabilitySystem {
    spin(betLine: string) {
        return betLine === 'L1'
            ? 20
            : 0;
    }
}