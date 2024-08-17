import { Layout, Input, Text, Button } from '@ui-kitten/components';
import React from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon';
import { MyRootStackParams } from '../../navigation/MyStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<MyRootStackParams, 'RegisterScreen'> {

}


export const RegisterScreen = ({ navigation }: Props) => {

    const { width, height } = useWindowDimensions();

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
                        keyboardType='email-address'
                        autoCapitalize='none'
                        accessoryLeft={<MyIcon name='person-outline' style={{}} />}
                    />
                    <Input
                        placeholder='Correo Electronico'
                        style={{ marginBottom: 10 }}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        accessoryLeft={<MyIcon name='email-outline' style={{}} />}
                    />
                    <Input
                        placeholder='Contraseña'
                        style={{ marginBottom: 10 }}
                        secureTextEntry
                        accessoryLeft={<MyIcon name='lock-outline' style={{}} />}
                    />
                </Layout>

                <Layout style={{ height: 10 }} />
                <Button onPress={() => { }} accessoryRight={<MyIcon white name='arrow-forward-outline' style={{ height: 32, width: 32 }} />}
                >Ingresar</Button>
                <Layout style={{ height: 30 }} />

                <Layout style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text status='primary' category='s1' onPress={() => navigation.goBack()}> Ingresa</Text>
                </Layout>

            </ScrollView>
        </Layout>
    )
}
