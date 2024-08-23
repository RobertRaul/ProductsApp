import { tesloAPI } from "../../config/api/tesloAPI";
import { Gender, Product } from "../../domain/entities/product";
import { ProductResponse } from "../../infraestructure/interfaces/products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";


const emptyProduct: Product = {
    id: '',
    title: 'Nuevo Producto',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Unisex,
    sizes: [],
    stock: 0,
    tags: [],
}


export const getProductsById = async (id: string): Promise<Product> => {
    if (id==='new')
        return emptyProduct;

    try {
        const { data } = await tesloAPI.get<ProductResponse>(`/products/${id}`)
        return ProductMapper.tesloAPIProductToEntity(data);
    } catch (error) {
        console.log(error)
        throw new Error(`Error getting products by id: ${id}`)
    }
}