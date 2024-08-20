import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PropsWithChildren, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MyRootStackParams } from '../navigation/MyStackNavigator';
import { useAuthStore } from '../screens/store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<MyRootStackParams>>();
    const { checkStatus, status } = useAuthStore();
    useEffect(() => {
        checkStatus();
    }, [])


    useEffect(() => {
        if (status != 'cheking') {
            if (status === 'authenticated') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                })
            }
            else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                })
            }
        }
    }, [status])


    return (
        <>{children}</>
    )
}
