import express from "express";
import homeController from "../controllers/homeControllers";

let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.post('/setup-profile', homeController.setupProfile);
    app.post('/webhook', homeController.postWebhook);
    app.get('/webhook', homeController.getWebhook);

    return app.use('/', router);
}
module.exports = initWebRoutes;