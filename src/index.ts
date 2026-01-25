import express, { Express } from "express";
import { connectToDatabase } from "models";

const startServer = async (): Promise<void> => {
    const application: Express = express();

    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));

    application.get("/", (_, response) => {
        response.status(200).send("Hello from stack overflow backend");
    });

    connectToDatabase();

    const PORT: number = Number(process.env.PORT);

    application.listen(PORT, () => {
        console.log(
            `🚀 Express server is listening on http://localhost:${PORT}`,
        );
    });
};

startServer();
