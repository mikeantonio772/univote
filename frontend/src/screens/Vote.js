import React, { useState } from 'react';
import background2 from '../../assets/background2.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Btn from '../components/Btn';
import VoteIcon from 'react-native-vector-icons/FontAwesome5';
import Title from '../components/Title';
import {SafeAreaView, View, ImageBackground, Dimensions , Text, TouchableOpacity, Clipboard, StyleSheet } from 'react-native'

export default function Vote({ navigation, route }) {
  const { user } = route.params;
  const privateKey = route.params.data;
  
  const [copiedText, setCopiedText] = useState('')
  
  const copyToClipboard = () => {
    Clipboard.setString(privateKey)
  }
  
  return (
    <ImageBackground style={styles.image} source={background2}>
        <Header />
        <View style={styles.container}>
          <VoteIcon style={{ margin: 24, top: -24 }} name="vote-yea" size={100} color="#878FFF" />
          <Text style={styles.text}>Seu voto foi finalizado! Clique no botão para copiar sua chave privada</Text>
          <Btn title="Copiar chave privada" width={256} margin={16} onPress={() => copyToClipboard()} /> 
          <Btn title="Home" width={256} margin={16} onPress={() => navigation.navigate('Home', { user })} />
        </View>
        <Footer backgroundColor="#878FFF" onPressAbout={() => navigation.navigate('About')} />
      </ImageBackground>
  )
}
/**
  const fetchCopiedText = async () => {
    const text = await Clipboard.getString()
    setCopiedText(text)
  }
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => copyToClipboard()}>
          <Text>Click here to copy to Clipboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => fetchCopiedText()}>
          <Text>View copied text</Text>
        </TouchableOpacity>

        <Text style={styles.copiedText}>{copiedText}</Text>
      </View>

    </SafeAreaView> */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 32,
    bottom: 24,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  text: {
    fontFamily: 'sans-serif-condensed',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
