import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import AuthNavigator from './navigators/AuthNavigator';
import AppNavigator from './navigators/AppNavigator';
import Landing from './navigators/Landing';
import { colors } from './assets/style';

const Stack = createNativeStackNavigator();

function App() {
    React.useEffect(() => {
        StatusBar.setBackgroundColor(colors.primary);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
                <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
                <Stack.Screen options={{ headerShown: false }} name="App" component={AppNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;