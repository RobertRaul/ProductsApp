import { tesloAPI } from "../../config/api/tesloAPI";
import { Product } from "../../domain/entities/product";
import { ProductResponse } from "../../infraestructure/interfaces/products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";


export const getProductsById = async (id: string): Promise<Product> => {
    try {
        const { data } = await tesloAPI.get<ProductResponse>(`/products/${id}`)
        return ProductMapper.tesloAPIProductToEntity(data);
    } catch (error) {
        console.log(error)
        throw new Error(`Error getting products by id: ${id}`)
    }
}