import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import handlerError from "./middlewares/handlerError";
import { swaggerSpecification } from "./docs/swagger";
import { connectToDatabase } from "./models";
import { Paths } from "./utils/constants";

const startServer = async (): Promise<void> => {
    const application: Express = express();

    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));

    application.get("/", (_, response) => {
        response.status(200).send("Hello from stack overflow backend");
    });

    connectToDatabase();

    application.use(
        Paths.DOCS_PATH,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpecification, { explorer: true }),
    )

    const PORT: number = Number(process.env.PORT);

    application.use(handlerError)

    application.listen(PORT, () => {
        console.log(
            `🚀 Express server is listening on http://localhost:${PORT}`,
        );
    });
};

startServer();
