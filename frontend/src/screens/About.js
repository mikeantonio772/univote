import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import background2 from "../../assets/background2.png"
import Btn from '../components/Btn';

export default function About({ navigation }) {
  return (
      <ImageBackground style={styles.image} source={background2}>
        <View style={styles.container}>
          <Text 
            style={styles.text}
          >
            O UNIVOTE é um aplicativo criado para facilitar as eleições remotas 
            de entidades estudantis. Foi desenvolvido a partir da disciplina 
            Laboratório multidisciplinar do curso de Engenharia de Sistemas da UFMG, no ano de 2021. ...
          </Text>
          <Btn title="Fechar" width={128} onPress={() => navigation.goBack()}/>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#878FFF66',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9154F8',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 40,
    padding: 32,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'justify',
    color: 'white',
  },
});
