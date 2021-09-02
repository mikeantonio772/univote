import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Sso from './src/screens/Sso';
import Vote from './src/screens/Vote';
import Home from './src/screens/Home';
import About from './src/screens/About';
import AvailableElections from './src/screens/AvailableElections'
import MyVotes from './src/screens/MyVotes';
import AllElections from './src/screens/AllElections';
import MyElections from './src/screens/MyElections';
import CreateVoting from './src/screens/CreateVoting';
import VoteProcess from './src/screens/VoteProcess';
import MyVotesDetails from './src/screens/MyVotesDetails';
import AllElectionsDetails from './src/screens/AllElectionsDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} initialParams={{ user: {token: null, username: ''}}}/>
        <Stack.Screen name="Sso" component={Sso}/>
        <Stack.Screen name="Vote" component={Vote}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="About" component={About}/>
        <Stack.Screen name="Available Elections" component={AvailableElections}/>
        <Stack.Screen name="My Votes" component={MyVotes}/>
        <Stack.Screen name="All Elections" component={AllElections}/>
        <Stack.Screen name="My Elections" component={MyElections}/>
        <Stack.Screen name="Create Voting" component={CreateVoting}/>
        <Stack.Screen name="Vote Process" component={VoteProcess}/>
        <Stack.Screen name="My Votes Details" component={MyVotesDetails}/>
        <Stack.Screen name="All Elections Details" component={AllElectionsDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

