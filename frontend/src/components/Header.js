import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header(props) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>UNIVOTE</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    header: {
      backgroundColor: "#878FFF",
      height: 110,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontFamily: 'Roboto',
      fontSize: 25,
      color: 'white',
      top: 10,
    }
  });