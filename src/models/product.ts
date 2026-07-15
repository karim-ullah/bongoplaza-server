export interface Product {
    // id: number,
    sellerId : string,
    sellerName: string,
    title: string,
    imageUrl: string,
    description: string,
    category: string,
    price: number,

}

export let products: Product[] = []