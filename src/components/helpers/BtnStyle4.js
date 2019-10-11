import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

class BtnStyle4 extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.props.btnPress}
            >
                <Text>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

export default BtnStyle4;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    buttonText: {
        color: 'white',
    }
})