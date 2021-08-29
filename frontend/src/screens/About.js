import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import background1 from "../../assets/background1.png"
import Btn from '../components/Btn';
import Card from '../components/Card';

export default function About({ navigation }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://192.168.15.6:3000/sobre")
      .then((res) => res.json())
      .then((data) => setData(data.texto));
  }, []);
  return (
    <ImageBackground style={styles.image} source={background1}>
      <ScrollView style={{marginVertical: '25%'}} contentContainerStyle={styles.container}>
        <Card>
          <Text style={styles.text}>
            {!data ? "Texto indisponivel" : data}
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
