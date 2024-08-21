import { Layout, Input, Text, Button } from '@ui-kitten/components';
import React, { useState } from 'react'
import { Alert, ScrollView, useWindowDimensions } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon';
import { MyRootStackParams } from '../../navigation/MyStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { useAuthStore } from '../store/auth/useAuthStore';


interface Props extends StackScreenProps<MyRootStackParams, 'RegisterScreen'> {

}


export const RegisterScreen = ({ navigation }: Props) => {

    const { width, height } = useWindowDimensions();
    const { register } = useAuthStore();

    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: ''
    });

    const onRegister = async () => {
        if (form.fullName.length === 0 || form.email.length === 0 || form.password.length === 0) { return }

        const wasRegistered = await register(form.email, form.password, form.fullName)
        if (wasRegistered) {
            Alert.alert('Correcto', 'Te creaste una cuenta correctamente')
            return
        }

    }
    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40, paddingTop: height * 0.30 }}>
                <Layout>
                    <Text category='h1'>Crear Cuenta</Text>
                    <Text category='p1'>Crea una cuenta, para continuar</Text>
                </Layout>
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder='Nombre Completo'
                        style={{ marginBottom: 10 }}
                        keyboardType='default'
                        autoCapitalize='none'
                        accessoryLeft={<MyIcon name='person-outline' style={{}} />}

                        value={form.fullName}
                        onChangeText={fullName => setForm({ ...form, fullName })}
                    />
                    <Input
                        placeholder='Correo Electronico'
                        style={{ marginBottom: 10 }}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        accessoryLeft={<MyIcon name='email-outline' style={{}} />}

                        value={form.email}
                        onChangeText={email => setForm({ ...form, email })}
                    />
                    <Input
                        placeholder='Contraseña'
                        style={{ marginBottom: 10 }}
                        secureTextEntry
                        accessoryLeft={<MyIcon name='lock-outline' style={{}} />}

                        value={form.password}
                        onChangeText={password => setForm({ ...form, password })}
                    />
                </Layout>

                <Layout style={{ height: 10 }} />
                <Button onPress={onRegister} accessoryRight={<MyIcon white name='arrow-forward-outline' style={{ height: 32, width: 32 }} />}
                >Registrarse</Button>
                <Layout style={{ height: 30 }} />

                <Layout style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text status='primary' category='s1' onPress={() => navigation.goBack()}> Ingresa</Text>
                </Layout>

            </ScrollView>
        </Layout>
    )
}
