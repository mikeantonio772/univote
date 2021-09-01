import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import background1 from "../../assets/background1.png"
import Btn from '../components/Btn';
import Card from '../components/Card';

export default function InvalidUser(props) {

    return (
        <ImageBackground style={styles.image} source={background1}>
            <Card>
                <View alignItems='center'>
                    <Text style={styles.text}>Usuário Inválido</Text>
                    <Btn title="Fechar" width={128} margin={8} onPress={props.onPress} />
                </View>
            </Card>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 30,
        textAlign: 'justify',
        alignItems: 'center',
        color: 'white',
        marginVertical: 20,
    },
});