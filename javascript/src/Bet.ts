export class Bet {
    lines: string[];

    constructor(...lines: string[]) {
        this.lines = lines;
    }

    includes(line: string): boolean {
        return this.lines.filter(betLine => betLine === line).length > 0;
    }
}