import React from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import { MyRootStackParams } from "../../navigation/MyStackNavigator";
import { MyIcon } from "../../components/ui/MyIcon";
import { useAuthStore } from "../store/auth/useAuthStore";

export const ProfileScren = () => {
  const { top } = useSafeAreaInsets();
  const { logout } = useAuthStore();
  const navigation = useNavigation<NavigationProp<MyRootStackParams>>();
  return (
    <ScrollView style={styles.container}>
      <Button style={styles.button} appearance='outline' status="info"  size="giant"  accessoryLeft={<MyIcon name="person-add"  />} onPress={()=>{navigation.navigate('CitaScreen') }}   >Citas</Button>
      <Button style={styles.button} appearance='outline' status="info"  size="giant"  accessoryLeft={<MyIcon name="list"  />} onPress={()=>{ Alert.alert('En proceso','Desarrollando') }}   >Recetas</Button>
      <Button style={styles.button} appearance='outline' status="info"  size="giant"  accessoryLeft={<MyIcon name="calendar"  />} onPress={()=>{ Alert.alert('En proceso','Desarrollando') }}   >Atenciones</Button>
      <Button style={styles.button} appearance='outline' status="info"  size="giant"  accessoryLeft={<MyIcon name="twitter"  />} onPress={()=>{ Alert.alert('En proceso','Desarrollando') }}   >Mis Mascotas</Button>      
      <Button style={styles.button} appearance='outline' status="danger"  size="giant"  accessoryLeft={<MyIcon name="twitter"  />} onPress={logout}   >Cerrar </Button>      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    //backgroundColor: "grey",
  },
  button:{
    borderRadius:18,
    marginBottom:20
  }
});
