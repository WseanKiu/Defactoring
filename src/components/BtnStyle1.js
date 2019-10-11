import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

class BtnStyle1 extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={this.props.btnPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

export default BtnStyle1;

const styles = StyleSheet.create({
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 220,
        borderRadius: 30,
        backgroundColor: "#FF4500",
    },
    buttonText: {
        color: 'white',
    }
})