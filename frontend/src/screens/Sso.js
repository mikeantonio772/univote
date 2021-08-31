import * as React from 'react';
import { URLSearchParams } from 'react-native-url-polyfill';
import { WebView } from 'react-native-webview';

export default function Sso({ navigation }) {

  const onNavigationStateChange = (navigationState) => {
    const url = navigationState.url.replace("http://192.168.0.12:4001/login", "");
    const searchParams = new URLSearchParams(url);
    const token = searchParams.get('token');
    const username = searchParams.get('username');

    // console.log(token)
    if (token) {
      navigation.navigate('Home', {
        user: {
          token: token,
          username: username
        }
      });
    }
  };

  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: 'http://192.168.0.12:4001/login' }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
}