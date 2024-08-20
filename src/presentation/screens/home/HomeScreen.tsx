import { Button, Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useAuthStore } from '../store/auth/useAuthStore'

export const HomeScreen = () => {

    const {logout} = useAuthStore();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                style={styles.text}
                category='h1'
            >
                HomeScreen
            </Text>
            <Button onPress={logout} accessoryLeft={<Icon name='log-out-outline' />} >Cerrar Sesion</Button>
        </View>
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
