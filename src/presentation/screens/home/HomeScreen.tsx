import { Button, Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useAuthStore } from '../store/auth/useAuthStore'
import { getProductsByPage } from '../../../actions/products/products'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '../../layouts/MainLayout'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { ProductList } from '../../components/products/ProductList'

export const HomeScreen = () => {

    const { logout } = useAuthStore();

    const { isLoading, data: products = [] } = useQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60, //hour
        queryFn: () => getProductsByPage(0)
    })

    getProductsByPage(0, 10)
    return (
        <MainLayout
            title='API Product'
            subtitle='Aplicacion Admin'
            rightAction={() => { }}
            rightActionIcon='plus-outline'
        >
            {
                isLoading ? (<FullScreenLoader />) : <ProductList products={products} />
            }
        </MainLayout>

    )
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        margin: 2,
    },
});
