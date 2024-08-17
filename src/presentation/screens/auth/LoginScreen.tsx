import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { MyRootStackParams } from '../../navigation/MyStackNavigator'
import { API_URL, TEST } from "@env"

interface Props extends StackScreenProps<MyRootStackParams, 'LoginScreen'> {

}

export const LoginScreen = ({ navigation }: Props) => {

  const { width, height } = useWindowDimensions();
  console.log(API_URL)
  console.log(TEST)

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ paddingTop: height * 0.35, marginHorizontal: 40 }}>
        <Layout>
          <Text category='h1'>Ingresar</Text>
          <Text category='p1'>Porfavor, ingrese para continuar</Text>
        </Layout>
        <Layout style={{ marginTop: 20 }}>
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
          <Text>¿No tienes cuenta?</Text>
          <Text status='primary' category='s1' onPress={() => navigation.navigate('RegisterScreen')}> Crear una cuenta</Text>
        </Layout>

      </ScrollView>
    </Layout >
  )
}
