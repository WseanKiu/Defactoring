import React from "react";
import {AsyncStorage} from "react-native";
import LoadingScreen from '../LoadingScreen';

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }


  // Fetch the token from storage
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  // Render any loading content that you like here
  render() {
    return (
      <LoadingScreen/>
    );
  }
}
