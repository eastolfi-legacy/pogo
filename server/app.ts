// const path = require("path");
import * as path from "path";
// const express = require("express");
import * as express from "express";
// const bodyParser = require("body-parser");
import * as bodyParser from "body-parser";

import { IndexRoute } from "./routes";

export class Server {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.config();
        this.routes();
    }

    private config(): void {
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))

        // parse application/json
        this.app.use(bodyParser.json())

        this.app.use("/public", express.static(path.join(__dirname, "../public")));
        this.app.use("/modules", express.static(path.join(__dirname, "../node_modules")));
    }

    private routes(): void {
        let router: express.Router;
        router = express.Router();

        router.use("/", IndexRoute.generateRoutes());

        this.app.use(router);
    }

    public static bootstrap(): Server {
        return new Server();
    }
}

// module.exports = Server.bootstrap();








// app.get("/pokemon/list", (req, res) => {
//     res.send([
//         { "id": 1, "name": "Tyranitar", "pc": 3296, "iv": 98, "attackFast": "Bite Fast", "attackCharged": "Stone Edge", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
//         { "id": 2, "name": "Groudon", "pc": 3013, "iv": 80, "attackFast": "Bite Fast", "attackCharged": "Stone Edge", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
//         { "id": 3, "name": "Snorlax", "pc": 2986, "iv": 93, "attackFast": "Lick Fast", "attackCharged": "Heavy Slam", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
//         { "id": 4, "name": "Vaporeon", "pc": 2825, "iv": 86, "attackFast": "Water Gun Fast", "attackCharged": "Water Pulse", "stats": { "attack": 10, "defense": 10, "stamina": 10 } }
//     ]);
// });
//
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Application listening at port ${PORT}`);
// });
