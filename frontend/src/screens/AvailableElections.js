import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Text, FlatList } from 'react-native';
import Btn from "../components/Btn";
import Header from '../components/Header';
import Title from '../components/Title';
import background2 from "../../assets/background2.png"
import Card from '../components/Card';
import InvalidUser from './InvalidUser';
import api from '../services/api';

const renderItem = ({ item }) => (
  <>
    {item.is_active == true ?
      <View style={styles.container}>
        <Card>
          <View alignItems='center'>
            <Text style={[styles.baseText, { fontWeight: 'bold', fontSize: 22 }]}>{item.title}</Text>
          </View>
          <Text style={[styles.baseText, {}]}>{item.description}</Text>
          <Text style={[styles.baseText, { fontWeight: 'bold' }]}>Início: {item.date_start}</Text>
          <Text style={[styles.baseText, { fontWeight: 'bold' }]}>Fim: {item.date_finish}</Text>
          <View alignItems='center'>
            <Btn title='VOTAR' width={256} margin={0} />
          </View>
        </Card>
      </View>
      : null}
  </>
)

export default function AvailableElections({ navigation, route }) {

  const { user } = route.params;
  const [data, setData] = useState(null)

  let header = {
    headers: {
      "x-access-token": user.token,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
  api.post('/votings/my', { username: user.username }, header)
    .then((response) => {
      setData(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
  });

  if (user.token) {
    return (
      <ImageBackground style={styles.image} source={background2}>
        <Header />
        <Title text='Eleições Disponíveis' back={true} onPressBack={() => navigation.goBack()} />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      </ImageBackground>
    );
  } else {
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