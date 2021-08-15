import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Title(props) {
	return (
		<Text style={styles.title}>{props.text}</Text>
	)
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto',
    color: '#878FFF',
    fontSize: 25,
    textAlign: 'left',
		margin: 32,
  },
});