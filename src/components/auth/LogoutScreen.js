import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";

export default class LogoutScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
    // this._setDataAsync();
  }
  // Fetch the token from storage
  _bootstrapAsync = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("user_id");
    } catch (exception) {
      this.props.navigation.navigate("AuthScreen");
    }
    this.props.navigation.navigate("AuthScreen");
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
