import React from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Text, FlatList } from 'react-native';
import Btn from "../components/Btn";
import Header from '../components/Header';
import Title from '../components/Title';
import background2 from "../../assets/background2.png"
import Card from '../components/Card';
import InvalidUser from './InvalidUser';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Eleição X',
    candidatos: {
      opcao1: 'Carlos - 212 votos - 45.9%',
      opcao2: 'Maria - 197 votos - 42.6%',
      opcao3: 'Branco - 53 votos - 11.5%',
    }
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Eleição Y',
    candidatos: {
      opcao1: 'Carlos - 212 votos - 45.9%',
      opcao2: 'Maria - 197 votos - 42.6%',
      opcao3: 'Branco - 53 votos - 11.5%',
    }
  },
];

const renderItem = ({ item }) => (
  <View style={styles.container}>
    <Card>
      <Text style={[styles.baseText, { fontWeight: 'bold' }]}>{item.title}</Text>
      <Text style={styles.baseText}>Vencedor(a):</Text>
      <Text style={[styles.baseText, { fontWeight: 'bold' }]}>{item.candidatos.opcao1}</Text>
      <Text style={styles.baseText}>{item.candidatos.opcao2}</Text>
      <Text style={styles.baseText}>{item.candidatos.opcao3}</Text>
      <View alignItems='center'>
        <Btn title='Mais Detalhes' width={256} margin={0} />
      </View>
    </Card>
  </View>
)

export default function AvailableElections({ navigation, route }) {

  const { user } = route.params;

  if (user.token) {
    return (
      <ImageBackground style={styles.image} source={background2}>
        <Header />
        <Title text='Eleições Anteriores' back={true} onPressBack={() => navigation.goBack()} />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
    );
  }
  else {
    return (
      <InvalidUser onPress={() => navigation.navigate('Login')}></InvalidUser>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 16,
  },
  image: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  baseText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white',
    marginBottom: 16
  },
});