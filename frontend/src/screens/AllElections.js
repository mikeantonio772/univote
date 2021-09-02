import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Text, FlatList, ActivityIndicator } from 'react-native';
import moment from 'moment';
import Btn from "../components/Btn";
import Header from '../components/Header';
import Title from '../components/Title';
import background2 from "../../assets/background2.png"
import Card from '../components/Card';
import InvalidUser from './InvalidUser';
import api from '../services/api';

export default function AllElections({ navigation, route }) {

  const { user } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const detailsFunc = (eleicao_id) => {
    user.eleicao_id = eleicao_id;
    navigation.navigate('All Elections Details', { user })
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Card>
        <View alignItems='center'>
          <Text style={[styles.baseText, { fontWeight: 'bold', fontSize: 22 }]}>{item.title}</Text>
          {!item.is_active && <Text style={[styles.baseText, { marginBottom: 10 }]}>Eleição encerrada</Text>}
        </View>
        <Text style={[styles.baseText, { marginBottom: 20 }]}>{item.description}</Text>
        <Text style={[styles.baseText, {}]}>Início: {moment(item.date_start).format('DD/MM/YYYY')}</Text>
        <Text style={[styles.baseText, {}]}>Fim: {moment(item.date_finish).format('DD/MM/YYYY')}</Text>
        <View alignItems='center'>
          <Btn title='Mais Detalhes' width={256} margin={12} onPress={() => detailsFunc(item._id)} />
        </View>
      </Card>
    </View>
  )

  let header = {
    headers: {
      "x-access-token": user.token,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    setLoading(true);
    api.get('/votings/all', header)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  }, []);

  if (user.token) {
    return (
      <ImageBackground style={styles.image} source={background2}>
        <Header />
        <Title text='Todas Eleições' back={true} onPressBack={() => navigation.goBack()} />
        {loading && <ActivityIndicator color='#878FFF' />}
        <FlatList
          data={data}
          initialNumToRender={50}
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