import jwt from "@elysiajs/jwt";
import Elysia, { error } from "elysia";

console.log(Bun.env.JWT_TOKEN, "token");

export const authPlugin = (app: Elysia) => 
    app.use(
        jwt({
        secret :Bun.env.JWT_TOKEN!,
    })
)
.derive(async ({jwt, headers, set}) => {
    const authorization =headers.authorization;
    if (!authorization?.startsWith("Bearer")){
        return error(401, "Unauthorized");
    }
    const token = authorization.slice;
    const user = await jwt.verify(token as string);

});