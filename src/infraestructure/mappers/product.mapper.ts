
import { API_URL, localIPURL } from "../../config/api/tesloAPI";
import { Product } from "../../domain/entities/product";
import { ProductResponse } from "../interfaces/products.response";

export class ProductMapper {
    static tesloAPIProductToEntity(product: ProductResponse): Product {
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            slug: product.slug,
            stock: product.stock,
            sizes: product.sizes,
            gender: product.gender,
            tags: product.tags,
            images: product.images.map(img => `${localIPURL}/files/product/${img}`),
        }
    }
}