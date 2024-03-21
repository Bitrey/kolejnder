import AppError, { ErrorType } from "../errors";
import Errors from "../errors/errors";
import { logger } from "../shared/logger";

const requiredEnvs = [
    "NODE_ENV",
    "PORT",
    "JWT_SECRET",
    "COOKIE_SECRET"
] as const;
export type Env = (typeof requiredEnvs)[number];

for (const e of requiredEnvs) {
    logger.debug("Checking env " + e);
    if (!(e in process.env)) {
        logger.error(Errors.MISSING_ENV + ": " + e);
        throw new AppError(Errors.MISSING_ENV, ErrorType.PROGRAMMATIC, e);
    }
}

type Envs = {
    [env in Env]: string;
};

export const envs: Envs = process.env as never;
