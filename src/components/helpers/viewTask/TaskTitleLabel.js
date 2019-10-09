import React from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
import formsStyle from '../../styles/formsStyle';

class TaskTitleLabel extends React.Component {
    render() {
        return (
            <View>
                {
                    this.props.editTitle ? (
                        <TextInput
                            style={formsStyle.textInput}
                            placeholder="Title"
                            autoFocus
                            onChangeText={this.props.onChangeTaskName}
                            value={this.props.task_name}
                            onBlur={this.props.onBack}
                        />
                    ) : (
                            <Text
                                onPress={this.props.onClick}
                                style={formsStyle.textHeader}>
                                {this.props.task_name}
                            </Text>
                        )
                }
            </View>
        );
    }
}

export default TaskTitleLabel;