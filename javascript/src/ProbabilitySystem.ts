export class ProbabilitySystem {
    spin(betLine: string): number {
        return betLine === 'L1'
            ? 20
            : 0;
    }
}