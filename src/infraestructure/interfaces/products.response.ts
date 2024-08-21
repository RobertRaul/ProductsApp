export interface ProductResponse {
    id: string;
    title: string;
    price: number;
    description: string;
    slug: string;
    stock: number;
    sizes: Size[];
    gender: Gender;
    tags: string[];
    images: string[];
    user: User;
}

export enum Gender {
    Men = "men",
    Women = "women",
    Kid = "kid",
    Unisex = "unisex",
}

export enum Size {
    L = "L",
    M = "M",
    S = "S",
    Xl = "XL",
    Xs = "XS",
    Xxl = "XXL",
}

// export enum Tag {
//     Hoodie = "hoodie",
//     Shirt = "shirt",
// }

export interface User {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
}
