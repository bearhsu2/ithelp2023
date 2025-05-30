export class DBCTool {

    static require(checkCondition: () => boolean, message: string) {
        if (!checkCondition()) {
            throw new Error(message);
        }
    }

    static ensure(checkCondition: () => boolean, message: string) {
        if (!checkCondition()) {
            throw new Error(message);
        }
    }
}