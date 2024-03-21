import { ErrorKey } from "./errors";

export enum ErrorType {
    PROGRAMMATIC = "program",
    USER = "user"
}

class AppError extends Error {
    public readonly error: ErrorKey;
    public readonly type: ErrorType;
    public readonly args: string[];

    constructor(error: ErrorKey, type?: ErrorType, ...args: string[]) {
        super(error.toString());
        this.name = error.toString();

        this.error = error;
        this.type = type || ErrorType.PROGRAMMATIC;
        this.args = args;
    }

    public toString(): string {
        return `${this.error} ${
            this.type === ErrorType.PROGRAMMATIC ? "PROGRAMMATIC" : "USER"
        } error: ${this.args.join(", ")}`;
    }
}

export default AppError;
