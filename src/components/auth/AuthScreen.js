import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }


  // Fetch the token from storage
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    await AsyncStorage.setItem("server_ip", "192.168.0.175");
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
