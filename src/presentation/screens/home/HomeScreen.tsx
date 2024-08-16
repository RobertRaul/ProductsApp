import { Button, Icon, Text } from '@ui-kitten/components'
import React from 'react'
import { View, StyleSheet } from 'react-native'

export const HomeScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                style={styles.text}
                category='h1'
            >
                HOLA MUNDO
            </Text>
            <Button accessoryLeft={<Icon name='facebook' />} > Cerrar</Button>
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
