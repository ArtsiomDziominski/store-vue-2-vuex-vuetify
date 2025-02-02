export interface Product {
    B: boolean,
    C: number,
    CV: null,
    G: number,
    P: number,
    Pl: null,
    T: number
}

export interface Cart {
    B: boolean,
    C: number,
    CV: null,
    G: number,
    P: number,
    Pl: null,
    T: number,
    name: string,
    group: string,
    price: number,
    quantity: number
}


export interface ProductsList {
    [key: string]: {
        group: string,
        totalQuantity: number,
        items: Cart[]
    }
}


export as namespace Interfaces