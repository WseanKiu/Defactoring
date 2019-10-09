import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import style from "../styles/style";

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
    // this._setDataAsync();
  }

  _setDataAsync = async () => {
    // await AsyncStorage.setItem('server_ip', '192.168.254.108');
  };

  // Fetch the token from storage
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    await AsyncStorage.setItem("server_ip", "192.168.0.175");
    // await AsyncStorage.setItem("server_ip", "192.168.43.168");

    // This will switch to the App screen or Auth screen
    // this.props.navigation.navigate(userToken? 'App' : 'Auth');
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="tomato" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
