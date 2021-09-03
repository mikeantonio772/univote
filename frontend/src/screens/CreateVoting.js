import React, { useState } from 'react';
import { StyleSheet, TextInput, ImageBackground,View, Dimensions, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import Btn from "../components/Btn";
import Header from '../components/Header';
import Title from '../components/Title';
import background2 from "../../assets/background2.png"
import InvalidUser from './InvalidUser';
import api from '../services/api';
import VoteProcess from './VoteProcess';

export default function CreateVoting({ navigation, route }) {

  const { user } = route.params;

  const [candidatos, onChangeTextCandidatos] = useState("");
  const [dataInit, onChangeTextDataInit] = useState("");
  const [dataFim, onChangeTextDataFim] = useState("");
  const [titulo, onChangeTextTitulo] = useState("");
  const [descricao, onChangeTextDescricao] = useState("");
  const [podemVotar, onChangeTextPodemVotar] = useState("");
  
  let header = {
    headers: {
      "x-access-token": user.token,
      'Content-Type': 'application/json',
    },
  };

  const successAlert = () =>
    Alert.alert(
      "Sucesso",
      "Eleição Cadastrada",
      [{ text: "OK", onPress: () => navigation.navigate('Home', { user }) }]
    );

  const sendCreateVotingRequest = async () => {
    var arr_candidatos = [];
    var new_candidatos = candidatos.split(",");
    new_candidatos.forEach(element => {
      var item = {
        id: element
      }
      arr_candidatos.push(item);
    });

    var arr_voters = [];
    var new_voters = podemVotar.split(",");
    new_voters.forEach(element => {
      var item = {
        id: element
      }
      arr_voters.push(item);
    });

    let body = {
      candidates: arr_candidatos,
      requested_by: user.username,
      date_start: dataInit,
      date_finish: dataFim,
      title: titulo,
      description: descricao,
      users_able_to_vote: arr_voters,
    };

    return api.post('/votings/create', body, header)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .then(() => successAlert())
      .catch((error) => {
        console.error(error);
      });
  }

  if (true || user.token) {
    return (
      <ImageBackground style={styles.image} source={background2}>
        <Header />
        <Title text='Criar Eleição' back={true} onPressBack={() => navigation.goBack()} />
        <ScrollView>
          <View style={styles.container}>
          <Text style={styles.baseText}>
            Lembre-se de inserir todos os eleitores aptos a votar, pois apenas eles poderão participar da votação.
          </Text>
          </View>
          <Text style={styles.title}>1 - Insira os candidatos:</Text>
          <SafeAreaView alignItems='center' marginBottom={12}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTextCandidatos}
              value={candidatos}
              placeholder="Ex: Opção 1, Opção 2, Opção 3, Branco"
              placeholderTextColor="#FFFFFF88"
            />
          </SafeAreaView>
          <Text style={styles.title}>2 - Data de Início:</Text>
          <SafeAreaView alignItems='center' marginBottom={12}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTextDataInit}
              value={dataInit}
              placeholder="YYYY-MM-dd"
              placeholderTextColor="#FFFFFF88"
            />
          </SafeAreaView>
          <Text style={styles.title}>3 - Data de Término:</Text>
          <SafeAreaView alignItems='center' marginBottom={12}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTextDataFim}
              value={dataFim}
              placeholder="YYYY-MM-dd"
              placeholderTextColor="#FFFFFF88"
            />
          </SafeAreaView>
          <Text style={styles.title}>4 - Título da Eleição:</Text>
          <SafeAreaView alignItems='center' marginBottom={12}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTextTitulo}
              value={titulo}
              placeholder="Ex: Eleições X 2021"
              placeholderTextColor="#FFFFFF88"
            />
          </SafeAreaView>
          <Text style={styles.title}>5 - Descrição:</Text>
          <SafeAreaView alignItems='center' marginBottom={12}>
            <TextInput
              style={[styles.input, {height: 140, textAlignVertical: 'top'}]}
              onChangeText={onChangeTextDescricao}
              value={descricao}
              placeholder="Ex: Eleições para a..."
              placeholderTextColor="#FFFFFF88"
              multiline={true}
            />
          </SafeAreaView>
          <Text style={styles.title}>6 - Eleitores Permitidos:</Text>
          <SafeAreaView alignItems='center' marginBottom={12}>
            <TextInput
              style={[styles.input, {height: 90, textAlignVertical: 'top'}]}
              onChangeText={onChangeTextPodemVotar}
              value={podemVotar}
              placeholder="Ex: arielfrancois, mikeantonio772"
              placeholderTextColor="#FFFFFF88"
              multiline={true}
            />
          </SafeAreaView>
          <SafeAreaView alignItems='center' marginBottom={32}>
            <Btn title="Confirmar" width={256} margin={16} onPress={() => sendCreateVotingRequest()} />
          </SafeAreaView>
        </ScrollView>
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
