import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

class BtnStyle2 extends React.Component {
    render() {
        return (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.props.btnPress}
            >
                <Text style={styles.saveButtonText}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

export default BtnStyle2;

const styles = StyleSheet.create({
    saveButton: {
      borderWidth: 1,
      borderColor: "white",
      backgroundColor: "#007bff",
      borderRadius: 50,
      padding: 15,
      marginTop: 15
    },
    saveButtonText: {
      color: "#ffffff",
      fontSize: 20,
      textAlign: "center"
    },
})