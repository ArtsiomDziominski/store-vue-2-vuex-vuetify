import {Mutation, State} from 'vuex-simple';
import {Cart} from "@/interfaces";

let instance: CartModule | null = null;

// Использовал vuex-simple для удобного и упрощённого управления стором
export default class CartModule {
    constructor() {
        if (instance) return instance;
        instance = this;
    }

    @State()
    public cart: Interfaces.Cart[] = [];

    @Mutation()
    public addToCart(product: Interfaces.Product): void {
        const productIndex = this.cart.findIndex((item) => item.name === product.name);
        if (productIndex > -1) this.cart[productIndex].quantity++;
        else this.cart.push({...product, quantity: 1});
    }

    @Mutation()
    public removeFromCart(product: Interfaces.Product): void {
        const cartIndex = this.cart.findIndex((item) => item.name === product.name)
        if (this.cart[cartIndex].quantity > 1) this.cart[cartIndex].quantity--;
        else this.cart.splice(cartIndex, 1);
    }

    @Mutation()
    public updateCart(products: Interfaces.Product[]): void {
        this.cart = this.cart.map((item) => {
            const product = products.find(product => product.T === item.T);
            if (product) return {...item, C: product.C, price: product.C};
            return {...item}
        })
    }
}