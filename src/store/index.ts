import {Module, createVuexStore} from 'vuex-simple';
import Vue from 'vue';
import Vuex from 'vuex';

import ProductModule from "@/store/modules/product";
import CartModule from "@/store/modules/cart";

let instance: MyRootStore | null = null;

// Использовал vuex-simple для удобного и упрощённого управления стором
export default class MyRootStore {
    static getInstance(): MyRootStore {
        return instance || new MyRootStore();
    }

    constructor() {
        if (instance) return instance;
        instance = this;
    }

    @Module()
    public product = new ProductModule();

    @Module()
    public cart = new CartModule();
}

Vue.use(Vuex);

export const createStore = createVuexStore(MyRootStore.getInstance(), {
    strict: false,
    modules: {},
    plugins: []
});