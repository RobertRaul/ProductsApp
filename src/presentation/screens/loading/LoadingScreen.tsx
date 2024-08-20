import { Layout, Spinner, Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet } from 'react-native'

export const LoadingScreen = () => {
    return (
        <Layout style={styles.container}>
            <Spinner status='primary' size='large' />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    }
})

