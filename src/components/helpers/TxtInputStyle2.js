import React from 'react';
import {
    TextInput,
    Text,
} from 'react-native';
import styles from '../styles/AddDailyTaskStyle';

class TxtInputStyle2 extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Text style={styles.textLabel}>{this.props.title}</Text>
                <TextInput
                    style={this.props.parent? styles.textInput : styles.textInputChildren}
                    placeholder={this.props.placeholder}
                    onChangeText={this.props.updateVal}
                />
            </React.Fragment>
        );
    }
}

export default TxtInputStyle2;