import { Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet } from 'react-native'

export const LoadingScreen = () => {
    return (
        <View>
            <Text
                style={styles.text}
                category='h1'
            >
                HOLA MUNDO
            </Text>
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
