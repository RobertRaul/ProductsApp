import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, LoadingScreen, RegisterScreen, HomeScreen, ProductScreen } from '../screens/index';

export type MyRootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
    ProductScreen: { productId: string };
}

const Stack = createStackNavigator<MyRootStackParams>();

export const MyStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='HomeScreen'
        >
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    );
}