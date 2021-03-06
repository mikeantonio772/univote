import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import Btn from '../components/Btn';
import background1 from '../../assets/background1.png';
import Footer from '../components/Footer';

export default function Login({ navigation, route }) {

  const { user } = route.params;

  return (
    <ImageBackground style={styles.image} source={background1}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>UNIVOTE</Text>
        </View>
        <Btn title="ENTRAR" width={128} top={104} onPress={() => navigation.navigate(!user.token ? 'Sso' : ('Home', user))} />
      </View>
      <Footer backgroundColor="#878FFF77" onPressAbout={() => navigation.navigate('About')} />
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  titleBox: {
    backgroundColor: '#878FFF',
    width: 256,
    height: 128,
    top: -104,
    borderWidth: 1,
    borderColor: '#9154F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'sans-serif-condensed',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
});
