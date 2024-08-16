import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { MyStackNavigator } from './presentation/navigation/MyStackNavigator'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
export const ProductsApp = () => {

    const colorMovil = useColorScheme();

    const theme = colorMovil === 'light' ? eva.light : eva.dark

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={theme}>
                <NavigationContainer>
                    <MyStackNavigator />
                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
}
