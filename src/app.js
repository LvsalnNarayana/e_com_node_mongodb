import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";

import indexRouter from "./v1/routes/user.router.js";
import { httpLogger } from "./v1/services/logger.js";
import v1Router from "./v1/index.js";
const app = express();

app.use((req,res,next) => {
    if (req.user) {
        httpLogger(req,res,next)
    } else {
        next()
    }
});
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/v1", v1Router);

export default app;
