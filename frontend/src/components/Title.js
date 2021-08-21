import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import BackIcon from 'react-native-vector-icons/AntDesign';

export default function Title(props) {
  if (props.back) {
    return (
      <View style={styles.view}>
        <TouchableHighlight
          underlayColor="#9154F8"
          onPress={props.onPressBack}
          style={styles.icons}
        >
          <BackIcon name="arrowleft" size={32} color='#878FFF' />
        </TouchableHighlight>
        <Text style={styles.title}>{props.text}</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.view}>
        <Text style={styles.title}>{props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto',
    color: '#878FFF',
    fontSize: 25,
    textAlign: 'left',
    marginHorizontal: 8,
  },
  view: {
    flexDirection: 'row',
    margin: 32,
    marginBottom: 8,
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    borderRadius: 40,
  },
});