import React from 'react';
import {
    TextInput,
    View,
} from 'react-native';
import styles from './styles/RegisterStyle';

class TxtInputStyle4 extends React.Component {
    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder={this.props.placeholder}
                    underlineColorAndroid='transparent'
                    secureTextEntry={this.props.hideText}
                    onChangeText={this.props.updateVal} />
            </View>
        );
    }
}

export default TxtInputStyle4;