import { isAxiosError } from "axios";
import { tesloAPI } from "../../config/api/tesloAPI";
import { Product } from "../../domain/entities/product";


export const UpdateAndCreateProduct = (product: Partial<Product>) => {
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id) {
        return updateProduct(product)
    }
    throw new Error('Crear no esta implentado')

}

//TODO revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
    console.log({ product })
    const { id, images = [], ...restoProducto } = product;

    try {
        const checkImages = prepareImage(images)
        console.log({ checkImages });

        const { data } = await tesloAPI.patch(`/products/${id}`, {
            images: checkImages,
            ...restoProducto
        })
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error.response?.data)
        }

        throw new Error('Error al actualizar producto');
    }
}

const prepareImage = (images: string[]) => {
    //TODO revisar los FILES
    return images.map(
        image => image.split('/').pop()
    )
}