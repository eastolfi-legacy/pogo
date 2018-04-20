import { PokemonCard } from "./pokemon-card";

export const PokemonListModule = {
    state: {
        pokemonList: []
    },
    mutations: {
        addPokemonToList(state, { pokemon }/*payload*/) {
            state.pokemonList.push(pokemon);
        }
    },
    actions: {
        addPokemonList({ commit }, { pokemonList }/*payload*/) {
            pokemonList.forEach((pokemon) => commit("addPokemonToList", { pokemon }));
        },

        addPokemon({ commit }, { pokemon }/*payload*/) {
            commit("addPokemonToList", { pokemon })
        }
    },
    getters: {}
};

export const PokemonListComponent = {
    components: {
        "pokemon-card": PokemonCard
    },
    computed: {
        sourceAsync() {
            return this.$store.state.pokemonList.pokemonList;// REVIEW
        }
    },
    mounted() {
        this.$http.get("/pokemon/list")
        .then(response => {
            this.$store.dispatch("addPokemonList", { pokemonList: response.body });
        });
    },
    methods: {
        addPokemonToList() {
            this.$store.dispatch("addPokemon", {
                pokemon: { id: 9, name: "Test" }
            });
        }
    },
    template: `
        <div>
            <template v-for="pokemon in sourceAsync">
                <pokemon-card
                    v-bind:key="pokemon.id"
                    v-bind:pokemon="pokemon"
                ></pokemon-card>
            </template>
            <b-button @click="addPokemonToList">Add Pokemon</b-button>
        </div>
    `
};
