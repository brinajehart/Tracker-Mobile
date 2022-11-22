import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { actions } from './store/currency';

import AuthNavigator from './navigators/AuthNavigator';
import AppNavigator from './navigators/AppNavigator';
import GroupNavigator from './navigators/GroupNavigator';

import Landing from './screens/Landing';
import InvoiceEdit from './screens/InvoiceEdit';
import GroupEdit from './screens/GroupEdit';

import { colors } from './assets/style';

const headerOptions = {
    headerStyle: {
        backgroundColor: colors.primary,
    },
    headerTintColor: colors.dark,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

const Stack = createNativeStackNavigator();

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.loadCurrencyFromStorage());
        StatusBar.setBackgroundColor(colors.primary);
    }, []);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
                    <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
                    <Stack.Screen options={{ headerShown: false }} name="App" component={AppNavigator} />
                    <Stack.Screen options={{ headerShown: false }} name="Group" component={GroupNavigator} />
                    <Stack.Screen options={{...headerOptions, title: 'Invoice edit'}}  name="InvoiceEdit" component={InvoiceEdit} />
                    <Stack.Screen options={{...headerOptions, title: 'Group edit'}}  name="GroupEdit" component={GroupEdit} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;