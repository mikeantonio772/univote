import * as React from 'react';
import { URLSearchParams } from 'react-native-url-polyfill';
import { WebView } from 'react-native-webview';


export default class Sso extends React.Component {
  render(){
    const {navigation} = this.props;
    const onNavigationStateChange = (navigationState) => {
      const url = navigationState.url.replace("http://192.168.15.6:4001/login","");
      const searchParams = new URLSearchParams(url);
      const token = searchParams.get('token');
      const username = searchParams.get('username');
      
      if (token) {
        navigation.navigate('Home',{ user: {
            token: token,
            username: username
          }
        });
      }
    };
    return (
     <WebView
          originWhitelist={['*']}
          source={{ uri: 'http://192.168.15.6:4001/login' }}  
          onNavigationStateChange={onNavigationStateChange}
        />
    );
  }
}