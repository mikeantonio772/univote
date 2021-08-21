import React from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Text, FlatList } from 'react-native';
import Btn from "../components/Btn";
import Header from '../components/Header';
import Title from '../components/Title';
import background2 from "../../assets/background2.png"
import Card from '../components/Card';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Nenhuma eleição cadastrada',
  },
];

const renderItem = ({ item }) => (
  <View style={styles.container}>
    <Card>
      <Text style={styles.baseText}>{item.title}</Text>
      <View alignItems='center'>
        <Btn title='Criar Eleição' width={256} margin={0} />
      </View>
    </Card>
  </View>
)

export default function AvailableElections({ navigation }) {
  return (
    <ImageBackground style={styles.image} source={background2}>
      <Header />
      <Title text='Minhas Eleições' back={true} onPressBack={() => navigation.goBack()} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ImageBackground>
  );
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