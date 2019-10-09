import React from 'react';
import {
    TouchableOpacity
} from 'react-native';
import styles from '../styles/style';
import Icon from "react-native-vector-icons/Ionicons";

class AddDailyTaskButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddDaily')}
                style={styles.addButton}>
                <Icon name="ios-add" size={30} color="#fff" />
            </TouchableOpacity>
        );
    }
}

export default AddDailyTaskButton;