import React, { useEffect, useRef } from 'react'

import { MainLayout } from '../../layouts/MainLayout'
import { Button, ButtonGroup, Input, Layout, useTheme } from '@ui-kitten/components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StackScreenProps } from '@react-navigation/stack'
import { MyRootStackParams } from '../../navigation/MyStackNavigator'
import { ScrollView } from 'react-native'
import { Gender, Product, Size } from '../../../domain/entities/product'
import { MyIcon } from '../../components/ui/MyIcon'
import { Formik } from 'formik'

import { getProductsById, UpdateAndCreateProduct } from '../../../actions/products'
import { ProductImages } from '../../components/products/ProductImages'
import { MyCameraAdapter } from '../../../config/adapters/camera-adapter'

interface Props extends StackScreenProps<MyRootStackParams, 'ProductScreen'> { }

const sizes: Size[] = [Size.L, Size.M, Size.S, Size.Xl, Size.Xs, Size.Xxl]
const genders: Gender[] = [Gender.Men, Gender.Women, Gender.Kid, Gender.Unisex]

export const ProductScreen = ({ route }: Props) => {

  const theme = useTheme();
  const productIdRef = useRef(route.params.productId)
  const queryClient = useQueryClient();
  const { productId } = route.params;

  const { data: product, error } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductsById(productIdRef.current)
  })

  const mutation = useMutation({
    mutationFn: (data: Product) => UpdateAndCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product) {

      productIdRef.current = data.id;
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });


      console.log('success');
      console.log(data);
    },
  })

  useEffect(() => {
    console.log(error)
  }, [error])


  if (!product) {
    return (<MainLayout title='Cargando....' />)
  }

  return (

    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}
    >
      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <MainLayout
            title={values.title}
            subtitle={`Precio: ${values.price}`}
            rightAction={async () => {
              //const photos = await MyCameraAdapter.takePicture();
              const photos = await MyCameraAdapter.getPicturesFromLibrary()
              setFieldValue('images', [...values.images, ...photos])
            }}
            rightActionIcon='camera-outline'
          >
            <ScrollView style={{ flex: 1 }}>
              {/*Imagenes de Productos */}
              <Layout style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                {/*//TODO: considerar cuando no hay imagenes*/}

                <ProductImages images={values.images} />
              </Layout>
              {/*Titulo */}
              <Layout style={{ marginHorizontal: 10 }}>
                <Input label="Titulo" value={values.title} style={{ marginVertical: 10 }} onChangeText={handleChange('title')} />
                <Input label="Slug" value={values.slug} style={{ marginVertical: 10 }} onChangeText={handleChange('slug')} />
                <Input label="Descripciobn" value={values.description} style={{ marginVertical: 5 }} multiline numberOfLines={5} onChangeText={handleChange('description')} />
              </Layout>
              {/*Inventario */}
              <Layout style={{ marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                <Input label="Precio" value={values.price.toString()} style={{ flex: 1 }} onChangeText={handleChange('price')} keyboardType='numeric' />
                <Input label="Inventario" value={values.stock.toString()} style={{ flex: 1 }} onChangeText={handleChange('stock')} keyboardType='numeric' />
              </Layout>
              <Layout style={{ height: 5 }} />

              <ButtonGroup style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
                appearance='outline'>
                {
                  sizes.map((size) => (
                    <Button
                      onPress={() => setFieldValue(
                        'sizes',
                        values.sizes.includes(size) ? values.sizes.filter(s => s != size) : [...values.sizes, size]
                      )}
                      key={size} style={{
                        flex: 1,
                        backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined
                      }}>{size}</Button>
                  ))
                }
              </ButtonGroup>

              <ButtonGroup style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
                appearance='outline'>
                {
                  genders.map((gender) => (
                    <Button
                      onPress={() => setFieldValue('gender', gender)}
                      key={gender} style={{
                        flex: 1,
                        backgroundColor: values.gender.startsWith(gender) ? theme['color-primary-200'] : undefined
                      }}>{gender}</Button>
                  ))
                }
              </ButtonGroup>

              {/*Boton para guardar */}
              <Button
                onPress={() => handleSubmit()}
                style={{ margin: 15 }}
                disabled={mutation.isPending}
                accessoryLeft={<MyIcon name="save-outline" white style={{ width: 30, height: 20 }} />}
              >Guardar</Button>
              {/* <Text>{JSON.stringify(values, null, 4)} </Text> */}

              <Layout style={{ height: 200 }} />
            </ScrollView>
          </MainLayout>
        )
      }


    </Formik >
  )
}
