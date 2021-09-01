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
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Eleição X',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Eleição Y',
  },
  {
    _id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Eleição Z',
  },
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
    title: 'Eleição X',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    title: 'Eleição Y',
  },
  {
    _id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Eleição Z',
  },
];

const renderItem = ({ item }) => (
  <View style={styles.container}>
    <Card>
      <Text style={[styles.baseText, { fontWeight: 'bold' }]}>{item.title}</Text>
      <Text style={[styles.baseText, { fontWeight: 'bold' }]}>{item.dateStart}</Text>
      <Text style={[styles.baseText, { fontWeight: 'bold' }]}>{item.dateFinish}</Text>
      <View alignItems='center'>
        <Btn title='VOTAR' width={256} margin={0} />
      </View>
    </Card>
  </View>
)

export default function AvailableElections({ navigation, route }) {

  const { user } = route.params;
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://192.168.0.12:3000/all_elections")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

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