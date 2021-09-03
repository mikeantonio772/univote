import React, { useState, useEffect } from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import background1 from "../../assets/background1.png"
import Btn from '../components/Btn';
import Card from '../components/Card';
import api from '../services/api';

export default function About({ navigation }) {
  return (
    <ImageBackground style={styles.image} source={background1}>
      <ScrollView style={{ marginVertical: '25%' }} contentContainerStyle={styles.container}>
        <Card>
          <Text style={styles.text}>
            O univote é uma aplicação desenvolvida em node.js e react-native, que busca ser uma alternativa para
            eleições em instituições acadêmicas. O univote utiliza conexão com serviço de autenticação que utiliza SAML 2.0
          </Text>
          <View alignItems='center'>
            <Btn title="Fechar" width={128} margin={8} onPress={() => navigation.goBack()} />
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
  },
});
