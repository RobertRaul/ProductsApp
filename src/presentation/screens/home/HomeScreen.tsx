import React from 'react'
import { useAuthStore } from '../store/auth/useAuthStore'
import { getProductsByPage } from '../../../actions/products/getProducts-bypage'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { MainLayout } from '../../layouts/MainLayout'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { ProductList } from '../../components/products/ProductList'
import { FloatingActionButton } from '../../components/ui/FloatingActionButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MyRootStackParams } from '../../navigation/MyStackNavigator'




export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<MyRootStackParams>>();

    const { logout } = useAuthStore();

    // const { isLoading, data: products = [] } = useQuery({
    //     queryKey: ['products', 'infinite'],
    //     staleTime: 1000 * 60 * 60, //hour
    //     queryFn: () => getProductsByPage(0)
    // })

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60, //hour
        initialPageParam: 0,

        queryFn: async (params) => {
            console.log({ params })
            const products = await getProductsByPage(params.pageParam)
            return products
        },
        getNextPageParam: (lastpage, allPages) => allPages.length,
    })




    getProductsByPage(0, 10)
    return (
        <>
            <MainLayout
                title='API Product'
                subtitle='Aplicacion Admin'
                rightAction={() => { }}
                rightActionIcon='plus-outline'
            >
                {
                    isLoading ? (<FullScreenLoader />) : <ProductList products={data?.pages.flat() ?? []} fetchNextPage={fetchNextPage} />
                }
            </MainLayout>
            <FloatingActionButton iconame='plus-outline'
                onPress={() => navigation.navigate('ProductScreen', { productId: 'new' })}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20
                }} />
        </>

    )
}

