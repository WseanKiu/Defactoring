import React from 'react';
import {
    TextInput,
    Text,
    View,
    StyleSheet
} from 'react-native';

class TxtInputStyle3 extends React.Component {
    render() {
        return (
            <View style={styles.inputContainer}>
                <Text>{this.props.title}</Text>
                <TextInput style={styles.inputs}
                    placeholder={this.props.placeholder}
                    underlineColorAndroid='transparent'
                    secureTextEntry={this.props.hideText}
                    onChangeText={this.props.updateVal} />
            </View>
        );
    }
}

export default TxtInputStyle3;

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: '#657b83',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 0,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
})
