import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { userRouter } from "./routes/userRouter";
import { productRouter } from "./routes/productRouter";
import { orderRouter } from "./routes/orderRoute";
import { logger } from "@bogeychan/elysia-logger";
import jwt from "@elysiajs/jwt";
import { authPlugin } from "./middleware/authPlugin";


const app =new Elysia();


app.use(cors());
app.use(logger());
app.use(
    swagger({
    path:"/swagger",
})
)
.get("/", () => {
    return "Main Route" ;
})
.use(userRouter)
.use(productRouter)
.use(orderRouter)
.use(authPlugin)
.listen(3000);
