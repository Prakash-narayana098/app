import Elysia from "elysia";


export const  orderRouter =new Elysia({prefix: "/orders"}).get("/list",
    async ({}) => {
        return [];
    }
);
 