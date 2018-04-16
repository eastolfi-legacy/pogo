const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++;
        }
    },
    actions: {
        increment({ commit }) {
            commit("increment");
        }
    }
});

const Counter = {
    template: `<div>{{ count }} <button @click="increment">+1</button></div>`,
    computed: {
        count() {
            return this.$store.state.count;
        }
    },
    methods: {
        ...Vuex.mapMutations([
            "increment"  // map `this.increment()` to `this.$store.commit('increment')`
        ])
    }
};

const app = new Vue({
    el: "#my-app",
    store,
    components: {
        Counter
    },
    template: `
        <div class="app">
            <counter></counter>
        </div>
    `
});
