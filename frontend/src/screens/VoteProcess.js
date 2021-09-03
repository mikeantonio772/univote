import React, { useState, useEffect } from 'react';
import { StyleSheet, LogBox, View, ImageBackground, Dimensions, Text, ActivityIndicator, FlatList, Alert, ScrollView } from 'react-native';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import Btn from "../components/Btn";
import Header from '../components/Header';
import Title from '../components/Title';
import background2 from "../../assets/background2.png"
import InvalidUser from './InvalidUser';
import Card from '../components/Card';
import api from '../services/api';

export default function VoteProcess({ navigation, route }) {

  const { user } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState('');
  const [candidate, setCandidate] = useState("");

  let header = {
    headers: {
      "x-access-token": user.token,
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    setLoading(true);
    api.get(`/votings/${user.eleicao_id}`, header)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  }, []);

  let body = {
    _id: user.eleicao_id,
    candidate: {
      id: candidate
    },
    username: user.username
  };

  const sendVotingRequest = async () => {
    await api.post('/votings/vote', body, header)
      .then((response) => {
        const res = JSON.stringify(response.data)
        navigation.navigate('Vote', { user, res })
      })
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Card>
        <View flexDirection='row' alignItems='center'>
          <CheckBox
            style={{ marginHorizontal: 15 }}
            tintColors={{ true: 'white', false: 'white' }}
            value={checked.includes(item._id)}
            onValueChange={() => {
              if (checked.includes(item._id)) {
                setChecked('');
                setCandidate('');
              } else {
                setChecked(item._id);
                setCandidate(item.id);
              }
            }}
          />
          <Text style={[styles.baseText, { fontWeight: 'bold', fontSize: 22 }]}>{item.id}</Text>
        </View>
      </Card>
    </View>
  )

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  if (user.token) {
    return (
      <ImageBackground style={styles.image} source={background2}>
        <Header />
        <Title text='Votação' back={true} onPressBack={() => navigation.goBack()} />
        <View style={styles.container}>
          {data ?
            <>
              <ScrollView>
                <Card>
                  <View alignItems='center'>
                    <Text style={[styles.baseText, { fontWeight: 'bold', fontSize: 22 }]}>{data.title}</Text>
                  </View>
                  <Text style={[styles.baseText, {marginBottom: 20}]}>{data.description}</Text>
                  <Text style={[styles.baseText, {}]}>Início: {moment(data.date_start).format('DD/MM/YYYY')}</Text>
                  <Text style={[styles.baseText, {}]}>Fim: {moment(data.date_finish).format('DD/MM/YYYY')}</Text>
                  <Text style={[styles.baseText, { marginTop: 20 }]}>Escolha um(a) candidato(a):</Text>
                  <FlatList
                    data={data.candidates}
                    renderItem={renderItem}
                    extraData={checked}
                    keyExtractor={item => item._id}
                    scrollEnabled={false}
                  />
                  <View alignItems='center'>
                    <Btn title='CONFIRMAR' width={256} margin={16} onPress={() => sendVotingRequest()} />
                  </View>
                </Card>
              </ScrollView>
            </>
            :
            loading && <ActivityIndicator color='#878FFF' />}
        </View>
      </ImageBackground >
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
    marginBottom: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    width: 336,
    backgroundColor: '#878FFF66',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9154F8',
  },
  title: {
    fontFamily: 'Roboto',
    color: '#878FFF',
    fontSize: 20,
    textAlign: 'left',
    marginHorizontal: 24,
  },
});
