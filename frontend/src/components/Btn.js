import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';


export default function Btn(props) {
  return (
    <TouchableHighlight
      style={[styles.button, { width: props.width, top: props.top }]}
      onPress={() => console.log("ok")}
      underlayColor="#9154F8"
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#878FFF",
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#9154F8',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white',
  }
});
