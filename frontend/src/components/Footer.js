import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Footer(props) {
  return (
    <View style={styles.footer}>
      <View >
        <Text style={styles.footerText}>Sobre</Text>
      </View>
      <View style={styles.footerLine}/>
      <View >
        <Text style={styles.footerText}>Código</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#878FFF",
    height: 75,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white',
    top: -5,
  },
  footerLine: {
    height: '75%', 
    width: 1, 
    backgroundColor: 'white'
  }
});