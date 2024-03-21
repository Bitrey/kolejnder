import "./config";

import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { envs } from "./config/envs";
import { logger } from "./shared/logger";
import { UNAUTHORIZED } from "http-status";
import Errors from "./errors/errors";
import { config } from "./config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = new Elysia()
    .use(
        jwt({
            name: config.auth.cookie.name,
            secret: envs.COOKIE_SECRET
        })
    )
    .use(cookie())
    // .get("/sign/:name", async ({ jwt, cookie, params }) => {
    //     cookie.auth.set({
    //         value: await jwt.sign(params),
    //         httpOnly: true
    //     });

    //     return `Sign in as ${params.name}`;
    // })
    .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
        const profile = await jwt.verify(auth.value);

        if (!profile) {
            set.status = UNAUTHORIZED;
            return Errors.UNAUTHORIZED;
        }

        return profile;
    })
    .listen(envs.PORT);

logger.info(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
