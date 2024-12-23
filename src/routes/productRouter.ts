import Elysia from "elysia";
import { prisma } from "../models/db";

export const  productRouter =new Elysia({prefix: "/products"}).get("/List",
    async ({}) => {
        const products = await prisma.product.findMany({})
           return products ;
    }
);
 