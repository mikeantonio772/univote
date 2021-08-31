import React from 'react';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import Btn from '../components/Btn';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/Title';
import VoteIcon from 'react-native-vector-icons/FontAwesome5';
import background2 from '../../assets/background2.png';

export default function Home({ navigation, route }) {

  const { user } = route.params;
  const welcomeText = "Boas-vindas, " + JSON.stringify(user.username).replace(/\"/g, "") + "!";

  if (user.token) {
    return (
      <ImageBackground style={styles.image} source={background2}>
        <Header />
        <Title text={welcomeText} back={false} />
        <View style={styles.container}>
          <VoteIcon style={{ margin: 24, top: -24 }} name="vote-yea" size={100} color="#878FFF" />
          <Btn title="Eleições Disponíveis" width={256} margin={16} onPress={() => navigation.navigate('Available Elections', { user })} />
          <Btn title="Meus Votos" width={256} margin={16} onPress={() => navigation.navigate('My Votes', { user })} />
          <Btn title="Eleições Anteriores" width={256} margin={16} onPress={() => navigation.navigate('Previous Elections', { user })} />
          <Btn title="Minhas Eleições" width={256} margin={16} onPress={() => navigation.navigate('My Elections', { user })} />
        </View>
        <Footer backgroundColor="#878FFF" onPressAbout={() => navigation.navigate('About')} />
      </ImageBackground>
    );
  }
  else {
    return (navigation.navigate('Login'));
  }
}

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
});
