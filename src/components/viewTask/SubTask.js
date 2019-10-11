import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import styles from '../styles/SubTaskStyle';

export default class SubTask extends Component {

    render() {
        return (
            <TouchableOpacity key={this.props.keyval} style={styles.noteContainer}
                onLongPress={this.props.editSubTask} activeOpacity={0.6}>

                <TouchableOpacity style={styles.cont_box1} onPress={this.props.checkSubtask}>
                    <Icon name={this.props.val.status == 'unfinished' ?
                        "md-square-outline" : "md-checkbox-outline"} size={25} />
                </TouchableOpacity>

                <View style={styles.cont_textbox}>
                    <Text style={[styles.noteHeader, this.props.val.status == 'unfinished' ? null : { textDecorationLine: "line-through" }]}>{this.props.val.subtask_name}</Text>
                    {
                        this.props.val.subtask_desc != "" ?
                            <Text style={[styles.noteText, this.props.val.status == 'unfinished' ? null : { textDecorationLine: "line-through" }]}>{this.props.val.subtask_desc}</Text>
                            : null
                    }

                    {
                        this.props.val.due_date && this.props.val.status == 'unfinished' ?
                            <View style={styles.dueDateBadge}>
                                <Text style={styles.dueDateStyle}>{this.props.val.due_date}</Text>
                            </View>
                            : null
                    }
                </View>

                <View style={styles.cont_box2}>
                    <TouchableOpacity onPress={this.props.deleteSubTask}>
                        <Icon style={{ marginRight: 10 }} name="md-close" size={25} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }
}