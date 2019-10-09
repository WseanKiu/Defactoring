import React, { Component } from "react";
import {
    View,
    ActivityIndicator
} from 'react-native';

class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="tomato" animating />
            </View>
        )
    }
}

export default LoadingScreen;