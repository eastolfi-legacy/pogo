import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vue, { PluginObject } from "Vue";
// import Component from "vue-class-component";
import Vuex from "Vuex";
import { Store, mapMutations } from "Vuex";
import VueResource from "vue-resource";
import BootstrapVue from "bootstrap-vue";

import { PokemonListModule, PokemonListComponent } from "./pokemon-list";

// import { CollectionHelper } from "./core/index";

// import * as Pokemons from "pokemongo-json-pokedex/output/pokemon.json";
// import { IPokemon } from "./core/index";
//
// let pruebas: any[] = Pokemons;
// let pruebas = Pokemons.map(p => <IPokemon>p);
// for (let i = 0; i < Object.size(Pokemons); i++) {
//     console.log(Pokemons[i]);
// }
// console.log(pruebas);

// CollectionHelper.getInstance().getBestTeamAgainst("Latias");

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(BootstrapVue);

const store = new Store({
    state: { },
    mutations: { },
    actions: { },
    modules: {
        pokemonList: PokemonListModule
    }
});

// Global component registration -> before new Vue()
// Vue.component("pokemongo-card", {
//     template: `
//         <div>Card</div>
//     `
// });

const app = new Vue({
    el: "#my-app",
    store,
    components: {
        "pokemon-list": PokemonListComponent
    },
    methods: {
        test() {
            this.$http.get("/test")
            .then(response => console.log(response))
            .catch(error => console.error(error));
        }
    },
    template: `
        <div class="app">
            <button @click="test">Test</button>
            <pokemon-list></pokemon-list>
        </div>
    `
});
