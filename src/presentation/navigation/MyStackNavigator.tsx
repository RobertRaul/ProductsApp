import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import {
  LoginScreen,
  LoadingScreen,
  RegisterScreen,
  HomeScreen,
  ProductScreen,
  ProfileScren,
  CitaScreen,
} from "../screens/index";
import MyDrawerNavigator from "./MyDrawerNavigator";

export type MyRootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;

  LoadingScreen: undefined;
  HomeScreen: undefined;

  ProfileScren: undefined;
  ProductScreen: { productId: string };

  CitaScreen: undefined;
};

const Stack = createStackNavigator<MyRootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const MyStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // cardStyleInterpolator: fadeAnimation
      }}
      initialRouteName="ProfileScren"
    >
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="LoadingScreen"
        component={LoadingScreen}
      />

      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="ProfileScren"
        component={ProfileScren}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="CitaScreen" component={CitaScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />      
    </Stack.Navigator>
  );
};
