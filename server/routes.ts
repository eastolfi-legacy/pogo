import * as fs from "fs";
import * as path from "path";
import * as express from "express";
import {
    CollectionHelper, PokemonHelper,
    MoveHelper, TypeHelper, BattleHelper
} from "./core/index";

export class IndexRoute {
    private index(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.sendFile("index.html", { root: path.join(__dirname, "../public/views") });
    }

    private pokemonList(req: express.Request, res: express.Response, next: express.NextFunction): void {
        res.send([
            { "id": 1, "name": "Tyranitar", "pc": 3296, "iv": 98, "attackFast": "Bite Fast", "attackCharged": "Stone Edge", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
            { "id": 2, "name": "Groudon", "pc": 3013, "iv": 80, "attackFast": "Bite Fast", "attackCharged": "Stone Edge", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
            { "id": 3, "name": "Snorlax", "pc": 2986, "iv": 93, "attackFast": "Lick Fast", "attackCharged": "Heavy Slam", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
            { "id": 4, "name": "Vaporeon", "pc": 2825, "iv": 86, "attackFast": "Water Gun Fast", "attackCharged": "Water Pulse", "stats": { "attack": 10, "defense": 10, "stamina": 10 } }
        ]);
    }

    private test(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const hasAllData = () => {
            return (
                TypeHelper.getInstance().hasData() &&
                MoveHelper.getInstance().hasData() &&
                PokemonHelper.getInstance().hasData()
            );
        }

        const fnc = () => {
            CollectionHelper.getInstance().getBestTeamAgainst("Latias");
            // res.send(data);
            res.send("OK");
        };

        if (hasAllData()) {
            fnc();
        } else {
            if (!TypeHelper.getInstance().hasData()) {
                const filepath = path.join(__dirname, "../node_modules/pokemongo-json-pokedex/output/type.json");
                fs.readFile(filepath, "utf8", (error, data: any) => {
                    TypeHelper.getInstance().setData(data);
                    if (hasAllData()) fnc();
                });
            }
            if (!MoveHelper.getInstance().hasData()) {
                const filepath = path.join(__dirname, "../node_modules/pokemongo-json-pokedex/output/move.json");
                fs.readFile(filepath, "utf8", (error, data: any) => {
                    MoveHelper.getInstance().setData(data);
                    if (hasAllData()) fnc();
                });
            }
            if (!PokemonHelper.getInstance().hasData()) {
                const filepath = path.join(__dirname, "../node_modules/pokemongo-json-pokedex/output/pokemon.json");
                fs.readFile(filepath, "utf8", (error, data: any) => {
                    PokemonHelper.getInstance().setData(data);
                    if (hasAllData()) fnc();
                });
            }
        }
    }

    public static generateRoutes(): express.Router {
        let router = new express.Router();
        let instance = new IndexRoute();

        router.get("/", instance.index);
        router.get("/pokemon/list", instance.pokemonList);
        router.get("/test", instance.test);

        return router;
    }
}
