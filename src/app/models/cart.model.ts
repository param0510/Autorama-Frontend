export interface CartItem{
    productId: string;
    brand: string;
    name: string;
    category: string;
    subCategory: string;
    price: number;
    size: string;
    cartQty: number;
    imageUrl?: string;
}

export interface Cart{
    items: CartItem[];
}