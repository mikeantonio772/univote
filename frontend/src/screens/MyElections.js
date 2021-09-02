import React, { useState, useEffect } from 'react';
import { StyleSheet, LogBox, View, ImageBackground, Dimensions, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import moment from 'moment';
import Btn from "../components/Btn";
import Header from '../components/Header';
import Title from '../components/Title';
import background2 from "../../assets/background2.png"
import Card from '../components/Card';
import InvalidUser from './InvalidUser';
import api from '../services/api';

export default function MyElections({ navigation, route }) {

  const { user } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const renderItem = ({ item }) => (
    <>
      {item.requested_by == user.username ?
        <View style={styles.container}>
          <Card>
            <View alignItems='center'>
              <Text style={[styles.baseText, { fontWeight: 'bold', fontSize: 22 }]}>{item.title}</Text>
            </View>
            <Text style={[styles.baseText, { marginBottom: 20 }]}>{item.description}</Text>
            <Text style={[styles.baseText, {}]}>Início: {moment(item.date_start).format('DD/MM/YYYY')}</Text>
            <Text style={[styles.baseText, {}]}>Fim: {moment(item.date_finish).format('DD/MM/YYYY')}</Text>
            <Text style={[styles.baseText, { marginTop: 20 }]}>Candidatos Participantes:</Text>
            {item.candidates.map((candidate) =>
              <Text style={[styles.baseText, {}]}>{candidate.id}</Text>)}
          </Card>
        </View>
        : null}
    </>
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

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  if (user.token) {
    return (
      <ImageBackground style={styles.image} source={background2}>
        <Header />
        <Title text='Minhas Eleições' back={true} onPressBack={() => navigation.goBack()} />
        <View style={styles.container}>
          {data ?
            <>
              <ScrollView>
                <View style={styles.container}>
                  <Card>
                    <Text style={styles.baseText}>Crie sua própria eleição!
                      Clique no botão abaixo e preencha os campos solicitados. Lembre-se de inserir
                      todos os eleitores aptos a votar, pois apenas eles poderão participar da votação.
                      Boa eleição!</Text>
                    <View alignItems='center'>
                      <Btn title='Criar Eleição' width={256} margin={0} onPress={() => navigation.navigate('Create Voting', { user })} />
                    </View>
                  </Card>
                </View>
                <FlatList
                  data={data}
                  initialNumToRender={50}
                  renderItem={renderItem}
                  keyExtractor={item => item._id}
                />
              </ScrollView>
            </>
            :
            loading && <ActivityIndicator color='#878FFF' />}
        </View>
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