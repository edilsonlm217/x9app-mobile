import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { store } from './store/store';

import Dashboard from './pages/Dashboard/index';
import LoginScreen from './pages/LoginScreen/index';
import SearchScreen from './pages/SearchScreen/index';
import ClientDetails from './pages/ClientDetails/index';
import DefaultersScreen from './pages/DefaultersScreen/index';
import ClientInfoScreen from './pages/ClientInfoScreen/index';
import ClientAddressScreen from './pages/ClientAddressScreen/index';
import ClientEnrollmentScreen from './pages/ClientEnrollmentScreen/index';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#F43C08',
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: () => (
            <Icon name="home" size={22} color="#F43C08" />
          ),
        }}
      />

      <Tab.Screen
        name="Meus Alunos"
        component={SearchScreen}
        keyboard
        options={{
          tabBarIcon: () => (
            <Icon name="account-search" size={22} color="#F43C08" />
          ),

        }}
      />

      <Tab.Screen
        name="Inadiplentes"
        component={DefaultersScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="calendar-remove" size={22} color="#F43C08" />
          ),

        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SignedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AppTabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ClientInfoScreen"
        component={ClientInfoScreen}
        options={{
          title: 'Informações de contato',
          headerStyle: {
            backgroundColor: '#F43C08',
          },
          headerTintColor: '#F7F7F7',
          headerTransparent: false,
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: -20,
            fontFamily: 'Roboto-Bold',
          },
        }}
      />

      <Stack.Screen
        name="ClientAddressScreen"
        component={ClientAddressScreen}
        options={{
          title: 'Dados de endereço',
          headerStyle: {
            backgroundColor: '#F43C08',
          },
          headerTintColor: '#F7F7F7',
          headerTransparent: false,
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: -20,
            fontFamily: 'Roboto-Bold',
          },
        }}
      />

      <Stack.Screen
        name="ClientEnrollmentScreen"
        component={ClientEnrollmentScreen}
        options={{
          title: 'Dados de matrícula',
          headerStyle: {
            backgroundColor: '#F43C08',
          },
          headerTintColor: '#F7F7F7',
          headerTransparent: false,
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: -20,
            fontFamily: 'Roboto-Bold',
          },
        }}
      />

      <Stack.Screen
        name="ClientDetails"
        component={ClientDetails}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: '#F43C08',
          },
          headerTintColor: '#FFF',
          headerTransparent: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            marginLeft: -20,
          },
        })}
      />
    </Stack.Navigator>
  );
}

export default function MainStack() {
  const globalStore = useContext(store);

  return (
    <>
      { globalStore.state.userToken
        ? <SignedStack />
        : <AuthStack />
      }
    </>
  );
}
