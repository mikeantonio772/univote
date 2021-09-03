import React from 'react';
import background2 from '../../assets/background2.png';
import Header from '../components/Header';
import Btn from '../components/Btn';
import VoteIcon from 'react-native-vector-icons/FontAwesome5';
import { View, ImageBackground, Dimensions , Text, Clipboard, StyleSheet, Alert } from 'react-native'

export default function Vote({ navigation, route }) {
  const { user } = route.params;
  const privateKey = route.params.res;
  
  const copyToClipboard = () => {
    Clipboard.setString(privateKey)
    Alert.alert(
      "Chave Privada Copiada",
      "Guarde-a para autenticar seu voto\n",
      [{ text: "OK", onPress: () => navigation.navigate('Home', { user }) }]
    );
  }
  
  return (
    <ImageBackground style={styles.image} source={background2}>
        <Header />
        <View style={styles.container}>
          <VoteIcon style={{ margin: 24, top: -24 }} name="vote-yea" size={100} color="#878FFF" />
          <Text style={styles.text}>Seu voto foi finalizado! Clique no botão para copiar sua chave privada</Text>
          <Btn title="Copiar chave privada" width={256} margin={16} onPress={() => copyToClipboard()} /> 
        </View>
      </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
