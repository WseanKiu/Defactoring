import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';
import styles from '../components/styles/ThankYouSubsStyle';
import { thumbsUpUrl } from '../constants';

export default class ThankU4SubsScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={{uri: thumbsUpUrl}} />
        <Text style={styles.title}>Thank you for subscribing!</Text>
        <Text style={styles.description}></Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableHighlight>
      </View>
    )
  }
}