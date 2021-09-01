import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Sso from './src/screens/Sso';
import Home from './src/screens/Home';
import About from './src/screens/About';
import AvailableElections from './src/screens/AvailableElections'
import MyVotes from './src/screens/MyVotes';
import PreviousElections from './src/screens/PreviousElections';
import MyElections from './src/screens/MyElections';
import CreateVoting from './src/screens/CreateVoting';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} initialParams={{ user: {token: null, username: ''}}}/>
        <Stack.Screen name="Sso" component={Sso}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="About" component={About}/>
        <Stack.Screen name="Available Elections" component={AvailableElections}/>
        <Stack.Screen name="My Votes" component={MyVotes}/>
        <Stack.Screen name="Previous Elections" component={PreviousElections}/>
        <Stack.Screen name="My Elections" component={MyElections}/>
        <Stack.Screen name="Create Voting" component={CreateVoting}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

