import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { MyStackNavigator } from './presentation/navigation/MyStackNavigator'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/providers/AuthProvider';
export const ProductsApp = () => {

    const colorMovil = useColorScheme();

    const theme = colorMovil === 'dark' ? eva.dark : eva.light;
    const backGroundColor = (colorMovil === 'dark')
        ? theme['color-basic-800']
        : theme['color-basic-100'];

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={theme}>
                <NavigationContainer theme={{
                    dark: colorMovil === 'dark',
                    colors: {
                        primary: theme['color-primary-500'],
                        background: backGroundColor,
                        card: theme['color-basic-100'],
                        text: theme['text-basic-color'],
                        border: theme['color-basic-800'],
                        notification: theme['color-primary-500'],
                    }
                }}>
                    <AuthProvider>
                        <MyStackNavigator />
                    </AuthProvider>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
}
