import React, { useState } from 'react'

import { Product } from '../../../domain/entities/product';
import { Layout, List, Text } from '@ui-kitten/components';
import { ProductCard } from './ProductCard';
import { RefreshControl } from 'react-native-gesture-handler';
import { QueryClient, useQueryClient } from '@tanstack/react-query';


interface Props {
    products: Product[];
    //todo fetch de mas productos
    fetchNextPage: () => void;
}

export const ProductList = ({ products, fetchNextPage }: Props) => {

    const [isRefreshing, setIsRefreshing] = useState(false)
    const queryCliente = useQueryClient();


    const onPullToRefresh = async () => {
        setIsRefreshing(true)
        queryCliente.invalidateQueries({ queryKey: ['products', 'infinite'] })
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsRefreshing(false);
    }

    return (
        <List
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id}+${item.price}`}
            renderItem={
                ({ item }) => <ProductCard product={item} />
            }
            ListFooterComponent={() =>
                <Layout style={{ height: 150 }} />
            }


            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.8}

            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />}
        />

    )
}
