import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import Btn from "../components/Btn";
import background1 from "../../assets/background1.png"

export default function Login() {
  return (
    <>
      <ImageBackground style={styles.image} source={background1}>
        <View style={styles.container}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>UNIVOTE</Text>
          </View>
          <Btn title="ENTRAR" width={125} top={100} />
        </View>
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
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  titleBox: {
    backgroundColor: '#878FFF',
    width: 250,
    height: 120,
    top: -100,
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
