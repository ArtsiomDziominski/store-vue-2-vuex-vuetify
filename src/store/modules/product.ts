import {Mutation, State, Getter, Action} from 'vuex-simple';
import data from "../../../public/data.json";
import names from "../../../public/names.json";

let instance: ProductModule | null = null;

// Использовал vuex-simple для удобного и упрощённого управления стором
export default class ProductModule {
    constructor() {
        if (instance) return instance;
        instance = this;
    }

    @State()
    public products: Interfaces.Product[] = [];

    @State()
    public names: Record<string, any> = [];

    @State()
    public exchangeRate: number = 100;

    @Mutation()
    private setProducts(products: Interfaces.Product[]): void {
        this.products = products;
    }

    @Mutation()
    private setNames(names: Record<string, any>): void {
        this.names = names;
    }

    @Getter()
    public get productsList(): Interfaces.ProductsList[] {
        return this.products.reduce((grouped, item) => {
            const group = this.names?.[item.G]?.G || 'Неизвестная группа';

            if (!grouped[item.G]) {
                grouped[item.G] = {
                    group,
                    totalQuantity: 0,
                    items: []
                };
            }

            grouped[item.G].totalQuantity += item.P;
            grouped[item.G].items.push({
                ...item,
                name: this.names[item.G]?.B?.[item.T]?.N || 'Неизвестный товар',
                group,
                price: item.C,
                quantity: item.P
            });

            return grouped;
        }, {} as Record<string, any>[]);
    }

    @Action()
    public fetchProducts(): void {
        this.setProducts(data?.Value?.Goods || []);
    }

    @Action()
    public fetchNames(): void {
        this.setNames(names);
    }

    @Action()
    public fetch(): void {
        this.fetchProducts();
        this.fetchNames();
    }
}