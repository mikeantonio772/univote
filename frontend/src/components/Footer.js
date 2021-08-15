import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableHighlight } from 'react-native';
import GithubIcon from 'react-native-vector-icons/AntDesign';
import InfoIcon from 'react-native-vector-icons/Entypo';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <TouchableHighlight
        underlayColor="#9154F8"
        onPress={() => console.log("ok")}
      >
        <View style={styles.footerIcons}>
          <InfoIcon name="info" size={24} color='white' />
          <Text style={styles.footerText}>Sobre</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.footerLine} />
      <TouchableHighlight
        underlayColor="#9154F8"
        onPress={() => Linking.openURL('https://github.com/mikeantonio772/univote')}
      >
        <View style={styles.footerIcons}>
          <GithubIcon name="github" size={24} color='white' />
          <Text style={styles.footerText}>Código</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#878FFF",
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  footerText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'white',
    marginHorizontal: 8,
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLine: {
    height: 64,
    width: 1,
    backgroundColor: 'white'
  }
});