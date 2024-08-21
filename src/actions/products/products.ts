import { tesloAPI } from "../../config/api/tesloAPI"
import { ProductResponse } from "../../infraestructure/interfaces/products.response"
import { ProductMapper } from "../../infraestructure/mappers/product.mapper"

export const getProductsByPage = async (page: number, limit: number = 20) => {
    try {
        //offset pagina *10

        const { data } = await tesloAPI.get<ProductResponse[]>(`/products?offset=${page * 10}&limit=${limit}`)
        const products = data.map(productresponse => ProductMapper.tesloAPIProductToEntity(productresponse))
        
        return products
    } catch (error) {
        console.log(error)
        throw new Error('Error getting products')
    }
}