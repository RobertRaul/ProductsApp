import { Button, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { MyRootStackParams } from "../../navigation/MyStackNavigator";
import { useAuthStore } from "../store/auth/useAuthStore";

interface Props extends StackScreenProps<MyRootStackParams, "LoginScreen"> {}
const Logo = require("../../../assets/LogoZooloMascotas.png");

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    const wasSuccessFull = await login(form.email, form.password);
    if (wasSuccessFull) {
      return;
    }
    // console.log(form.email, form.password)
    Alert.alert("Error", "Usuario o contraseña incorrectos");
  };

  const { width, height } = useWindowDimensions();
  // console.log(API_URL)
  // console.log(TEST)

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ paddingTop: height * 0.25, marginHorizontal: 40 }}>
        <Layout style={styles.imageContainer}>
          <Image source={Logo} style={styles.imgLogo} />
        </Layout>

        <Layout>
          <Text category="h1">Ingresar</Text>
          <Text category="p1">Porfavor, ingrese para continuar</Text>
        </Layout>
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Correo Electronico"
            style={{ marginBottom: 10 }}
            keyboardType="email-address"
            autoCapitalize="none"
            accessoryLeft={<MyIcon name="email-outline" style={{}} />}
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
          />

          <Input
            placeholder="Contraseña"
            style={{ marginBottom: 10 }}
            secureTextEntry
            accessoryLeft={<MyIcon name="lock-outline" style={{}} />}
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
          />
        </Layout>

        <Layout style={{ height: 10 }} />
        <Button
          onPress={onLogin}
          accessoryRight={
            <MyIcon
              white
              name="arrow-forward-outline"
              style={{ height: 32, width: 32 }}
            />
          }
        >
          Ingresar
        </Button>
        <Layout style={{ height: 30 }} />

        <Layout
          style={{
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>¿No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            {" "}
            Crear una cuenta
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imgLogo: {
    width: 300,
    height: 125,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom:15
  },
});
