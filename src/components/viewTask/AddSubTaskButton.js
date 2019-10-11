import React from 'react';
import {
    TouchableOpacity
} from 'react-native';
import styles from '../styles/style';
import Icon from "react-native-vector-icons/Ionicons";

class AddSubTaskButton extends React.Component {
    render() {
        return (
            <TouchableOpacity 
            onPress={this.props.addSubTask}
            style={styles.addButton}>
                <Icon name="ios-add" size={30} color="#fff" />
            </TouchableOpacity>
        );
    }
}

export default AddSubTaskButton;