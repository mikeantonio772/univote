import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import background1 from "../../assets/background1.png"
import Btn from '../components/Btn';
import Card from '../components/Card';

export default function About({ navigation }) {
  return (
    <ImageBackground style={styles.image} source={background1}>
      <ScrollView style={{marginVertical: '25%'}} contentContainerStyle={styles.container}>
        <Card>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <View alignItems='center'>
            <Btn title="Fechar" width={128} onPress={() => navigation.goBack()} />
          </View>
        </Card>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'justify',
    color: 'white',
    // margin: 24,
  },
});
