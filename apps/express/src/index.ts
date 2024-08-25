import "dotenv/config";
import { appConfig } from "./configs/app.config";
import { app } from "./app";
import { connectDb } from "./db/connect";
import { registerV1Routes } from "./api/v1router";

(async () => {
    await connectDb();

    registerV1Routes(app);

    app.listen(appConfig.PORT, () => {
        console.log(`Server is running on http://localhost:${appConfig.PORT}`);
    });
})();
