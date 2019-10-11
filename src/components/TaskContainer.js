import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './styles/style';

class TaskContainer extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.viewMethod}
                style={styles.taskContainer}>
                <Text style={styles.taskHeader}>{this.props.val.title}</Text>
                <Text style={styles.taskBody}>{this.props.val.desc}</Text>
            </TouchableOpacity>
        );
    }
}

export default TaskContainer;