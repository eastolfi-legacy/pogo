import Vue from "Vue";

export const PokemonCard = {
    template: `
        <div>
            <b-card
                v-bind:title="pokemon.name"
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <b-dropdown id="ddown1" text="Actions" class="m-md-2" variant="primary">
                    <b-dropdown-item>First Action</b-dropdown-item>
                    <b-dropdown-item>Second Action</b-dropdown-item>
                    <b-dropdown-item>Third Action</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Something else here...</b-dropdown-item>
                    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                </b-dropdown>
            </b-card>
        </div>
    `,
    props: [
        "pokemon"
    ]
};
