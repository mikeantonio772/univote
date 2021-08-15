import React from 'react';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import Btn from "../components/Btn";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/Title';
import VoteIcon from 'react-native-vector-icons/FontAwesome5';
import background2 from "../../assets/background2.png"

export default function Home() {
  return (
    <>
      <ImageBackground style={styles.image} source={background2}>
        <Header />
        <Title text="Boas-vindas, <matrícula>!" />
        <View style={styles.container}>
          <VoteIcon style={{margin: 30, top: -30}} name="vote-yea" size={100} color="#878FFF"/>
          <Btn title="Eleições Disponíveis" width={256} />
          <Btn title="Meus Votos" width={256} />
          <Btn title="Eleições Anteriores" width={256} />
          <Btn title="Minhas Eleições" width={256} />
        </View>
        <Footer />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32,
    top: -8,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});
