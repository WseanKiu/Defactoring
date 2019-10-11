import React from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';

class TxtInputStyle1 extends React.Component {
    render() {
        return (
            <TextInput style={styles.inputs}
                placeholder={this.props.placeholder}
                underlineColorAndroid='transparent'
                secureTextEntry={this.props.hideText}
                onChangeText={this.props.updateVal} />
        );
    }
}

export default TxtInputStyle1;

const styles = StyleSheet.create({
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
})