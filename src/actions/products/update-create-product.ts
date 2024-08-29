import { isAxiosError } from "axios";
import { tesloAPI } from "../../config/api/tesloAPI";
import { Product } from "../../domain/entities/product";


export const UpdateAndCreateProduct = (product: Partial<Product>) => {
    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

    if (product.id && product.id != 'new') {
        return updateProduct(product)
    }
    return createProduct(product);

}


//TODO revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
    const { id, images = [], ...restoProducto } = product;

    try {
        const checkImages = await prepareImage(images)
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

const createProduct = async (product: Partial<Product>) => {
    const { id, images = [], ...restoProducto } = product;

    try {
        const checkImages = await prepareImage(images)
        const { data } = await tesloAPI.post(`/products/`, {
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

const prepareImage = async (images: string[]) => {
    //TODO revisar los FILES}
    const filesImages = images.filter(img => img.includes('file://'))
    const currentImages = images.filter(img => !img.includes('file://'))

    if (filesImages.length > 0) {
        const uploadPromises = filesImages.map(uploadImages);
        const uploadedImages = await Promise.all(uploadPromises)

        currentImages.push(...uploadedImages);
    }



    return currentImages.map(
        image => image.split('/').pop()
    )
}

const uploadImages = async (img: string) => {
    const formData = new FormData();
    formData.append('file', {
        uri: img,
        type: 'image/jpeg',
        name: img.split('/').pop()
    });

    const { data } = await tesloAPI.post<{ image: string }>('/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data.image;
}