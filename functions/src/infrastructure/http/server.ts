import express from "express";
import {errorHandler} from "./middlewares/errorHandler";
import cors, {CorsOptions} from "cors";

export function buildServer(routers: {
    authRouter: express.Router;
    userRouter: express.Router;
    meRouter: express.Router;
    taskRouter : express.Router;
}): express.Express {
    const app = express();

    const corsOptions: CorsOptions = {
        origin: (origin, cb ) => {
            if (!origin) return cb(null, true);

            const allowed = [
                "http://localhost:3000",
            ];

            if (allowed.includes(origin)) return cb(null, true);

            return cb(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };

    app.use(cors(corsOptions));
    app.use(express.json());

    app.use("/",
        routers.userRouter,
        routers.authRouter,
        routers.meRouter,
        routers.taskRouter
    );

    app.use((_req, res) => res.status(404).json({message: "Not found"}));
    app.use(errorHandler);

    return app;
}
