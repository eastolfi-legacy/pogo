(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PoGO", [], factory);
	else if(typeof exports === 'object')
		exports["PoGO"] = factory();
	else
		root["PoGO"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/app.ts":
/*!***********************!*\
  !*** ./server/app.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
exports.__esModule = true;
// const path = require("path");
var path = __webpack_require__(/*! path */ "path");
// const express = require("express");
var express = __webpack_require__(/*! express */ "express");
// const bodyParser = require("body-parser");
var bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
var routes_1 = __webpack_require__(/*! ./routes */ "./server/routes.ts");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // parse application/json
        this.app.use(bodyParser.json());
        this.app.use("/public", express.static(path.join(__dirname, "../public")));
        this.app.use("/modules", express.static(path.join(__dirname, "../node_modules")));
    };
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        router.use("/", routes_1.IndexRoute.generateRoutes());
        this.app.use(router);
    };
    Server.bootstrap = function () {
        return new Server();
    };
    return Server;
}());
exports.Server = Server;
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

/* WEBPACK VAR INJECTION */}.call(this, "server"))

/***/ }),

/***/ "./server/core/battle/battle.helper.ts":
/*!*********************************************!*\
  !*** ./server/core/battle/battle.helper.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Symbol = __webpack_require__(/*! es6-symbol */ "es6-symbol");
var index_1 = __webpack_require__(/*! ../index */ "./server/core/index.ts");
var token = Symbol("battle-helper");
var instance = null;
var BattleHelper = /** @class */ (function () {
    function BattleHelper(pToken) {
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }
    }
    BattleHelper.prototype.getDamage = function (info) {
        var power = info.power, attack = info.attack, defense = info.defense, types = info.types;
        var typeHelper = index_1.TypeHelper.getInstance();
        var stab = typeHelper.getSTAB(types.pokemonTypes, types.moveType);
        var wab = typeHelper.getWAB();
        var effective = typeHelper.getEffectivenessAgainst(types.moveType, types.type1, types.type2);
        return Math.floor(0.5 * power * (attack / defense) * stab * wab * effective) + 1;
    };
    BattleHelper.prototype.getAttack = function (pokemon, pokemonIVs) {
        return (pokemon.stats.baseAttack + pokemonIVs.attack) * 0.79030001; // assuming a lvl 40 pokemon
    };
    BattleHelper.prototype.getDefense = function (pokemon, pokemonIVs) {
        return (pokemon.stats.baseDefense + pokemonIVs.defense) * 0.79030001; // assuming a lvl 40 pokemon
    };
    BattleHelper.getInstance = function () {
        if (instance === null) {
            instance = new BattleHelper(token);
        }
        return instance;
    };
    return BattleHelper;
}());
exports.BattleHelper = BattleHelper;


/***/ }),

/***/ "./server/core/battle/index.ts":
/*!*************************************!*\
  !*** ./server/core/battle/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./battle.helper */ "./server/core/battle/battle.helper.ts"));


/***/ }),

/***/ "./server/core/collection/collection.helper.ts":
/*!*****************************************************!*\
  !*** ./server/core/collection/collection.helper.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Symbol = __webpack_require__(/*! es6-symbol */ "es6-symbol");
var array_prototype_find_1 = __webpack_require__(/*! array.prototype.find */ "array.prototype.find");
var index_1 = __webpack_require__(/*! ../index */ "./server/core/index.ts");
var token = Symbol("collection-helper");
var instance = null;
var CollectionHelper = /** @class */ (function () {
    function CollectionHelper(pToken) {
        this.myCollection = [];
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }
    }
    CollectionHelper.prototype.setCollection = function (items) {
        this.myCollection = items;
    };
    CollectionHelper.prototype.findByName = function (name) {
        if (!name || !name.trim())
            return null;
        return array_prototype_find_1["default"](this.myCollection, function (pokemon) { return name.toLowerCase().trim() === pokemon.name.toLowerCase().trim(); });
    };
    CollectionHelper.prototype.findByNameAndIV = function (name, iv) {
        if (!name || !name.trim())
            return null;
        return array_prototype_find_1["default"](this.myCollection, function (pokemon) { return name.toLowerCase().trim() === pokemon.name.toLowerCase().trim() && pokemon.iv === iv; });
    };
    CollectionHelper.prototype.getBestTeamAgainst = function (name) {
        var _this = this;
        var pokemonScores = this.myCollection.map(function (myPokemon) {
            return {
                name: myPokemon.name,
                iv: myPokemon.iv,
                score: index_1.PokemonHelper.getInstance().getScoreForMinePokemonAgainst(myPokemon.name, myPokemon.iv, name)
            };
        });
        var team = pokemonScores.sort(function (itemA, itemB) { return itemA.score > itemB.score ? -1 : itemA.score < itemB.score ? 1 : 0; }).slice(0, 6);
        console.log("Best team against " + name + ":");
        team.forEach(function (member) {
            var pokemon = _this.findByNameAndIV(member.name, member.iv);
            console.log(pokemon.name + " " + pokemon.iv + "% with " + pokemon.attackFast + " and " + pokemon.attackCharged + " => Score: " + member.score);
        });
    };
    CollectionHelper.getInstance = function () {
        if (instance === null) {
            instance = new CollectionHelper(token);
        }
        return instance;
    };
    return CollectionHelper;
}());
exports.CollectionHelper = CollectionHelper;


/***/ }),

/***/ "./server/core/collection/index.ts":
/*!*****************************************!*\
  !*** ./server/core/collection/index.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./collection.helper */ "./server/core/collection/collection.helper.ts"));


/***/ }),

/***/ "./server/core/index.ts":
/*!******************************!*\
  !*** ./server/core/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./battle */ "./server/core/battle/index.ts"));
__export(__webpack_require__(/*! ./collection */ "./server/core/collection/index.ts"));
__export(__webpack_require__(/*! ./moves */ "./server/core/moves/index.ts"));
__export(__webpack_require__(/*! ./pokemon */ "./server/core/pokemon/index.ts"));
__export(__webpack_require__(/*! ./types */ "./server/core/types/index.ts"));
__export(__webpack_require__(/*! ./utils */ "./server/core/utils/index.ts"));


/***/ }),

/***/ "./server/core/moves/index.ts":
/*!************************************!*\
  !*** ./server/core/moves/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./move.helper */ "./server/core/moves/move.helper.ts"));


/***/ }),

/***/ "./server/core/moves/move.helper.ts":
/*!******************************************!*\
  !*** ./server/core/moves/move.helper.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Symbol = __webpack_require__(/*! es6-symbol */ "es6-symbol");
var array_prototype_find_1 = __webpack_require__(/*! array.prototype.find */ "array.prototype.find");
// import * as Moves from "pokemongo-json-pokedex/output/move.json";
var index_1 = __webpack_require__(/*! ../index */ "./server/core/index.ts");
var token = Symbol("move-helper");
var instance = null;
var MoveHelper = /** @class */ (function () {
    function MoveHelper(pToken) {
        this.allMoves = [];
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }
        // this.allMoves = <IMove[]>Moves;
    }
    MoveHelper.prototype.hasData = function () {
        return this.allMoves && this.allMoves.length !== 0;
    };
    MoveHelper.prototype.setData = function (data) {
        this.allMoves = data;
    };
    MoveHelper.prototype.findByName = function (name) {
        if (!name || !name.trim())
            return null;
        return array_prototype_find_1["default"](this.allMoves, function (type) { return name.toLowerCase().trim() === type.name.toLowerCase().trim(); });
    };
    MoveHelper.prototype.getMoveDPS = function (moveName) {
        var move = this.findByName(moveName);
        return index_1.Utils.round(move.power / move.durationMs * 1000, 4);
    };
    MoveHelper.prototype.getMoveDPE = function (moveName) {
        var move = this.findByName(moveName);
        return index_1.Utils.round(move.power / Math.abs(move.energyDelta), 4);
    };
    MoveHelper.prototype.getMoveDPS_DPE = function (moveName) {
        return index_1.Utils.round(this.getMoveDPS(moveName) * this.getMoveDPE(moveName), 4);
    };
    MoveHelper.prototype.getDPS = function (moveName, damage) {
        var move = this.findByName(moveName);
        return index_1.Utils.round(damage / move.durationMs * 1000, 4);
    };
    MoveHelper.prototype.getDPE = function (moveName, damage) {
        var move = this.findByName(moveName);
        return index_1.Utils.round(damage / Math.abs(move.energyDelta), 4);
    };
    MoveHelper.prototype.getDPS_DPE = function (moveName, damage) {
        return index_1.Utils.round(this.getDPS(moveName, damage) * this.getDPE(moveName, damage), 4);
    };
    MoveHelper.getInstance = function () {
        if (instance === null) {
            instance = new MoveHelper(token);
        }
        return instance;
    };
    return MoveHelper;
}());
exports.MoveHelper = MoveHelper;
// Function getMoveHelper(): MoveHelper {
//     return MoveHelper.getInstance();
// }
// export getMoveHelper;


/***/ }),

/***/ "./server/core/pokemon/index.ts":
/*!**************************************!*\
  !*** ./server/core/pokemon/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./pokemon.helper */ "./server/core/pokemon/pokemon.helper.ts"));


/***/ }),

/***/ "./server/core/pokemon/pokemon.helper.ts":
/*!***********************************************!*\
  !*** ./server/core/pokemon/pokemon.helper.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Symbol = __webpack_require__(/*! es6-symbol */ "es6-symbol");
var array_prototype_find_1 = __webpack_require__(/*! array.prototype.find */ "array.prototype.find");
// import * as Pokemons from "pokemongo-json-pokedex/output/pokemon.json";
var index_1 = __webpack_require__(/*! ../index */ "./server/core/index.ts");
// import { BattleHelper } from "./battle.helper";
// import { CollectionHelper } from "./collection.helper";
// import { MoveHelper } from "./move.helper";
// import { TypeHelper } from "./type.helper";
// import { Utils } from "../utils";
var token = Symbol("pokemon-helper");
var instance = null;
var PokemonHelper = /** @class */ (function () {
    function PokemonHelper(pToken) {
        this.allPokemon = [];
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }
        // this.allPokemon = <IPokemon[]>Pokemons;
    }
    PokemonHelper.prototype.hasData = function () {
        return this.allPokemon && this.allPokemon.length !== 0;
    };
    PokemonHelper.prototype.setData = function (data) {
        this.allPokemon = data;
    };
    PokemonHelper.prototype.findByName = function (name) {
        return array_prototype_find_1["default"](this.allPokemon, function (pkmn) { return name.toLowerCase().trim() === pkmn.name.toLowerCase().trim(); });
    };
    PokemonHelper.prototype.getBestAttacks = function (pokemonName) {
        var pokemon = this.findByName(pokemonName);
        var bestQuickMove = pokemon.quickMoves
            .map(function (quickMove) {
            var move = index_1.MoveHelper.getInstance().findByName(quickMove.name);
            return { name: move.name, score: index_1.MoveHelper.getInstance().getMoveDPS_DPE(move.name) };
        })
            .sort(function (itemA, itemB) { return itemA.score < itemB.score; })[0];
        var bestChargedMove = pokemon.cinematicMoves
            .map(function (quickMove) {
            var move = index_1.MoveHelper.getInstance().findByName(quickMove.name);
            return { name: move.name, score: index_1.MoveHelper.getInstance().getMoveDPS_DPE(move.name) };
        })
            .sort(function (itemA, itemB) { return itemA.score < itemB.score; })[0];
        return { quick: bestQuickMove, charged: bestChargedMove };
    };
    PokemonHelper.prototype.getAllInfo = function (pokemonName) {
        var pokemon = this.findByName(pokemonName);
        console.log("\nInformation for #" + pokemon.dex + " " + pokemon.name + "\n");
        console.log("Max CP: " + pokemon.maxCP);
        console.log("Types: " + pokemon.types[0].name + (pokemon.types[1] ? " - " + pokemon.types[1].name : ""));
        console.log("Stats: " + pokemon.stats.baseAttack + " Attack | " + pokemon.stats.baseDefense + " Defense | " + pokemon.stats.baseStamina + " Stamina");
        console.log("Quick Moves:");
        pokemon.quickMoves.forEach(function (m) {
            var move = index_1.MoveHelper.getInstance().findByName(m.name);
            console.log("\t" + move.name + " (" + move.pokemonType.name + ") => Power: " + move.power + " | DPS: " + index_1.MoveHelper.getInstance().getMoveDPS(move.name) + " | DPE: " + index_1.MoveHelper.getInstance().getMoveDPE(move.name) + " | Score: " + index_1.MoveHelper.getInstance().getMoveDPS_DPE(move.name));
        });
        console.log("Charged Moves:");
        pokemon.cinematicMoves.forEach(function (m) {
            var move = index_1.MoveHelper.getInstance().findByName(m.name);
            console.log("\t" + move.name + " (" + move.pokemonType.name + ") => Power: " + move.power + " | DPS: " + index_1.MoveHelper.getInstance().getMoveDPS(move.name) + " | DPE: " + index_1.MoveHelper.getInstance().getMoveDPE(move.name) + " | Score: " + index_1.MoveHelper.getInstance().getMoveDPS_DPE(move.name));
        });
        var bestAttacks = this.getBestAttacks(pokemonName);
        console.log("Best Quick Attack is \"" + bestAttacks.quick.name + "\" (" + bestAttacks.quick.score + " score)");
        console.log("Best Charged Attack is \"" + bestAttacks.charged.name + "\" (" + bestAttacks.charged.score + " score)");
    };
    PokemonHelper.prototype.findStrongestTypesAgainstType = function (typeAgainst) {
        if (!typeAgainst)
            return [];
        var types = [];
        var typeName = typeAgainst.name;
        index_1.TypeHelper.getInstance().allTypes.forEach(function (type) {
            var strongAgainst = type.damage
                .filter(function (damageAgainstType) { return damageAgainstType.id === typeAgainst.id && (damageAgainstType.attackScalar || 0) > 1; });
            if (strongAgainst && strongAgainst.length) {
                types.push(type.name);
            }
        });
        return index_1.Utils.uniques(types);
    };
    PokemonHelper.prototype.getTypesStrongestAgainst = function (pokemonName) {
        var pokemon = this.findByName(pokemonName);
        var type1 = index_1.TypeHelper.getInstance().findByName(pokemon.types[0].name);
        var type2 = index_1.TypeHelper.getInstance().findByName(pokemon.types[1].name);
        var strongAgainstType1 = this.findStrongestTypesAgainstType(type1);
        var strongAgainstType2 = this.findStrongestTypesAgainstType(type2);
        var strongestTypes = index_1.Utils.uniques(strongAgainstType1.concat(strongAgainstType2))
            .map(function (type) { return index_1.TypeHelper.getInstance().findByName(type); });
        console.log("Strongest types against " + pokemon.name + ": ");
        for (var _i = 0, strongAgainstType1_1 = strongAgainstType1; _i < strongAgainstType1_1.length; _i++) {
            var type = strongAgainstType1_1[_i];
            console.log(type + " is strong against " + type1.name);
            if (strongAgainstType2.indexOf(type) !== -1) {
                console.log("\tand against " + type2.name + "!");
            }
        }
        for (var _a = 0, strongAgainstType2_1 = strongAgainstType2; _a < strongAgainstType2_1.length; _a++) {
            var type = strongAgainstType2_1[_a];
            if (strongAgainstType2.indexOf(type) === -1) {
                console.log(type + " is strong against " + type2.name);
            }
        }
        return strongestTypes;
    };
    PokemonHelper.prototype.getScoreForPokemonAgainst = function (pokemonName, pokemonAgainst) {
        var _this = this;
        var pokemon = this.findByName(pokemonName);
        var against = this.findByName(pokemonAgainst);
        var lastBestQuickMove = null;
        pokemon.quickMoves.forEach(function (quickMove) {
            var damageQuick = _this.getDamageAgainst(pokemonName, quickMove.name, pokemonAgainst);
            console.log(pokemonName + " will do " + damageQuick + " damage to " + pokemonAgainst + " with " + quickMove.name);
            if (!lastBestQuickMove || lastBestQuickMove.damage < damageQuick) {
                lastBestQuickMove = { name: quickMove.name, damage: damageQuick };
            }
        });
        var lastBestChargedMove = null;
        pokemon.cinematicMoves.forEach(function (chargedMove) {
            var damageCharged = _this.getDamageAgainst(pokemonName, chargedMove.name, pokemonAgainst);
            console.log(pokemonName + " will do " + damageCharged + " damage to " + pokemonAgainst + " with " + chargedMove.name);
            if (!lastBestChargedMove || lastBestChargedMove.damage < damageCharged) {
                lastBestChargedMove = { name: chargedMove.name, damage: damageCharged };
            }
        });
        console.log("The best configuration for " + pokemonName + " against " + pokemonAgainst + " is:");
        console.log("\tQuick Attack: " + lastBestQuickMove.name + " with " + lastBestQuickMove.damage + " damage (" + index_1.MoveHelper.getInstance().getDPS_DPE(lastBestQuickMove.name, lastBestQuickMove.damage) + " DPS)");
        console.log("\tCharged Attack: " + lastBestChargedMove.name + " with " + lastBestChargedMove.damage + " damage (" + index_1.MoveHelper.getInstance().getDPS_DPE(lastBestChargedMove.name, lastBestChargedMove.damage) + " DPS)");
        // console.log(`Types of ${pokemon.name}:`);
        // console.log(pokemon.types);
        // console.log(`Fast attacks of ${pokemon.name}:`);
        // console.log(pokemon.quickMoves);
        // console.log(`Charged attacks of ${pokemon.name}:`);
        // console.log(pokemon.cinematicMoves);
        // console.log(`Types of ${against.name}:`);
        // console.log(against.types);
    };
    PokemonHelper.prototype.getScoreForMinePokemonAgainst = function (pokemonName, pokemonIV, pokemonAgainst) {
        var pokemon = this.findByName(pokemonName);
        var myPokemon = index_1.CollectionHelper.getInstance().findByNameAndIV(pokemonName, pokemonIV);
        var against = this.findByName(pokemonAgainst);
        var damageQuick = this.getDamageAgainst(pokemonName, myPokemon.attackFast, pokemonAgainst);
        // console.log(`Your ${pokemonName} will do ${damageQuick} damage to ${pokemonAgainst} with ${myPokemon.attackFast}`);
        var damageCharged = this.getDamageAgainst(pokemonName, myPokemon.attackCharged, pokemonAgainst);
        // console.log(`Your ${pokemonName} will do ${damageCharged} damage to ${pokemonAgainst} with ${myPokemon.attackCharged}`);
        var scoreQuick = index_1.MoveHelper.getInstance().getDPS_DPE(myPokemon.attackFast, damageQuick);
        var scoreCharged = index_1.MoveHelper.getInstance().getDPS_DPE(myPokemon.attackCharged, damageCharged);
        return scoreQuick + scoreCharged;
    };
    PokemonHelper.prototype.getDamageAgainst = function (pokemonUser, moveName, pokemonName) {
        var move = index_1.MoveHelper.getInstance().findByName(moveName);
        var pokemon = this.findByName(pokemonUser);
        var myPokemon = index_1.CollectionHelper.getInstance().findByName(pokemonUser);
        var pokemonAgainst = this.findByName(pokemonName);
        var damage = index_1.BattleHelper.getInstance().getDamage({
            power: move.power,
            attack: index_1.BattleHelper.getInstance().getAttack(pokemon, { attack: 15, defense: 15, stamina: 15 }),
            defense: index_1.BattleHelper.getInstance().getDefense(pokemon, { attack: 15, defense: 15, stamina: 15 }),
            types: {
                pokemonTypes: pokemon.types,
                moveType: move.pokemonType.name,
                type1: pokemonAgainst.types[0].name,
                type2: pokemonAgainst.types[1] ? pokemonAgainst.types[1].name : null
            }
        });
        // console.log(pokemon);
        // console.log(move);
        // console.log(pokemonAgainst.types);
        // console.log(damage);
        return index_1.Utils.round(damage, 4);
    };
    PokemonHelper.getInstance = function () {
        if (instance === null) {
            instance = new PokemonHelper(token);
        }
        return instance;
    };
    return PokemonHelper;
}());
exports.PokemonHelper = PokemonHelper;


/***/ }),

/***/ "./server/core/types/index.ts":
/*!************************************!*\
  !*** ./server/core/types/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./type.helper */ "./server/core/types/type.helper.ts"));


/***/ }),

/***/ "./server/core/types/type.helper.ts":
/*!******************************************!*\
  !*** ./server/core/types/type.helper.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var array_prototype_find_1 = __webpack_require__(/*! array.prototype.find */ "array.prototype.find");
var Symbol = __webpack_require__(/*! es6-symbol */ "es6-symbol");
var token = Symbol("type-helper");
var instance = null;
var TypeHelper = /** @class */ (function () {
    function TypeHelper(pToken) {
        this.allTypes = [];
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }
        // this.allTypes = <IType[]>Types;
    }
    TypeHelper.prototype.hasData = function () {
        return this.allTypes && this.allTypes.length !== 0;
    };
    TypeHelper.prototype.setData = function (data) {
        this.allTypes = data;
    };
    TypeHelper.prototype.findByName = function (name) {
        if (!name || !name.trim())
            return null;
        return array_prototype_find_1["default"](this.allTypes, function (type) { return name.toLowerCase().trim() === type.name.toLowerCase().trim(); });
        // return this.allTypes.find(type => name.toLowerCase().trim() === type.name.toLowerCase().trim());
    };
    TypeHelper.prototype.getSTAB = function (pokemonTypes, moveType) {
        if (pokemonTypes.map(function (type) { return type.name; }).indexOf(moveType) !== -1) {
            return 1.2;
        }
        else {
            return 1.0;
        }
    };
    TypeHelper.prototype.getWAB = function () {
        return 1.0;
    };
    TypeHelper.prototype.getEffectivenessAgainst = function (type, typeAgainst1, typeAgainst2) {
        var type1 = this.findByName(typeAgainst1);
        var type2 = this.findByName(typeAgainst2);
        var effectivenessAgainstType1 = this.findByName(type)
            .damage.find(function (d) { return d.id === type1.id; })
            .attackScalar;
        var effectivenessAgainstType2 = (typeAgainst2 && typeAgainst2.trim().length) ?
            this.findByName(type)
                .damage.find(function (d) { return d.id === type2.id; })
                .attackScalar
            : 1.0;
        // return effectivenessAgainstType1 * effectivenessAgainstType2;
        // return Math.trunc(effectivenessAgainstType1 * effectivenessAgainstType2 * 10000) / 10000;
        return Math.round(effectivenessAgainstType1 * effectivenessAgainstType2 * 1000) / 1000;
    };
    TypeHelper.getInstance = function () {
        if (instance === null) {
            instance = new TypeHelper(token);
        }
        return instance;
    };
    return TypeHelper;
}());
exports.TypeHelper = TypeHelper;


/***/ }),

/***/ "./server/core/utils/index.ts":
/*!************************************!*\
  !*** ./server/core/utils/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./utils */ "./server/core/utils/utils.ts"));


/***/ }),

/***/ "./server/core/utils/utils.ts":
/*!************************************!*\
  !*** ./server/core/utils/utils.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var es6_set_1 = __webpack_require__(/*! es6-set */ "es6-set");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.uniques = function (array) {
        return new es6_set_1.Set(array).slice();
    };
    Utils.round = function (number, precision) {
        var shift = function (number, precision, reverseShift) {
            if (reverseShift) {
                precision = -precision;
            }
            var numArray = ("" + number).split("e");
            return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };
        return shift(Math.round(shift(number, precision, false)), precision, true);
    };
    return Utils;
}());
exports.Utils = Utils;


/***/ }),

/***/ "./server/routes.ts":
/*!**************************!*\
  !*** ./server/routes.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
exports.__esModule = true;
var fs = __webpack_require__(/*! fs */ "fs");
var path = __webpack_require__(/*! path */ "path");
var express = __webpack_require__(/*! express */ "express");
var index_1 = __webpack_require__(/*! ./core/index */ "./server/core/index.ts");
var IndexRoute = /** @class */ (function () {
    function IndexRoute() {
    }
    IndexRoute.prototype.index = function (req, res, next) {
        res.sendFile("index.html", { root: path.join(__dirname, "../public/views") });
    };
    IndexRoute.prototype.pokemonList = function (req, res, next) {
        res.send([
            { "id": 1, "name": "Tyranitar", "pc": 3296, "iv": 98, "attackFast": "Bite Fast", "attackCharged": "Stone Edge", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
            { "id": 2, "name": "Groudon", "pc": 3013, "iv": 80, "attackFast": "Bite Fast", "attackCharged": "Stone Edge", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
            { "id": 3, "name": "Snorlax", "pc": 2986, "iv": 93, "attackFast": "Lick Fast", "attackCharged": "Heavy Slam", "stats": { "attack": 10, "defense": 10, "stamina": 10 } },
            { "id": 4, "name": "Vaporeon", "pc": 2825, "iv": 86, "attackFast": "Water Gun Fast", "attackCharged": "Water Pulse", "stats": { "attack": 10, "defense": 10, "stamina": 10 } }
        ]);
    };
    IndexRoute.prototype.test = function (req, res, next) {
        var hasAllData = function () {
            return (index_1.TypeHelper.getInstance().hasData() &&
                index_1.MoveHelper.getInstance().hasData() &&
                index_1.PokemonHelper.getInstance().hasData());
        };
        var fnc = function () {
            index_1.CollectionHelper.getInstance().getBestTeamAgainst("Latias");
            // res.send(data);
            res.send("OK");
        };
        if (hasAllData()) {
            fnc();
        }
        else {
            if (!index_1.TypeHelper.getInstance().hasData()) {
                var filepath = path.join(__dirname, "../node_modules/pokemongo-json-pokedex/output/type.json");
                fs.readFile(filepath, "utf8", function (error, data) {
                    index_1.TypeHelper.getInstance().setData(data);
                    if (hasAllData())
                        fnc();
                });
            }
            if (!index_1.MoveHelper.getInstance().hasData()) {
                var filepath = path.join(__dirname, "../node_modules/pokemongo-json-pokedex/output/move.json");
                fs.readFile(filepath, "utf8", function (error, data) {
                    index_1.MoveHelper.getInstance().setData(data);
                    if (hasAllData())
                        fnc();
                });
            }
            if (!index_1.PokemonHelper.getInstance().hasData()) {
                var filepath = path.join(__dirname, "../node_modules/pokemongo-json-pokedex/output/pokemon.json");
                fs.readFile(filepath, "utf8", function (error, data) {
                    index_1.PokemonHelper.getInstance().setData(data);
                    if (hasAllData())
                        fnc();
                });
            }
        }
    };
    IndexRoute.generateRoutes = function () {
        var router = new express.Router();
        var instance = new IndexRoute();
        router.get("/", instance.index);
        router.get("/pokemon/list", instance.pokemonList);
        router.get("/test", instance.test);
        return router;
    };
    return IndexRoute;
}());
exports.IndexRoute = IndexRoute;

/* WEBPACK VAR INJECTION */}.call(this, "server"))

/***/ }),

/***/ "array.prototype.find":
/*!***************************************!*\
  !*** external "array.prototype.find" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("array.prototype.find");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "es6-set":
/*!**************************!*\
  !*** external "es6-set" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("es6-set");

/***/ }),

/***/ "es6-symbol":
/*!*****************************!*\
  !*** external "es6-symbol" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("es6-symbol");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
});
//# sourceMappingURL=app.js.map