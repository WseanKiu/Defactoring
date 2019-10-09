import React, { Component } from 'react';
import {
    Image, TouchableOpacity
} from 'react-native';


class DlgtdLogo extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (     
            <Image
            source={require('./dlgtd_logo1.png')}
            style={{ width: 60, height: 45 }}/>
      );
    }
}

export default DlgtdLogo