import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from '../styles/Lvl1TaskStyle';
import Bar from "react-native-progress/Bar";
import Icon from "react-native-vector-icons/Ionicons";

export default class Lvl1Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            value: ""
        }
    }

    render() {
        return (
            <TouchableOpacity key={this.props.keyval} style={styles.card}
                onPress={() => this.props.navigation.navigate('ViewLvl2Task', { subtask_id: this.props.val.subtask_id, creator: this.props.creator, task_id: this.props.task_id, assigned: this.props.val.user_id == this.props.user_id? true: false })}
                onLongPress={this.props.creator ? this.props.editSubTask : null} activeOpacity={0.6}>
                {
                    this.props.val.total_progress == 0 && this.props.val.user_id == this.props.user_id ?
                        <TouchableOpacity
                            onPress={this.props.checkTask}
                            style={{ paddingTop: 5, paddingLeft: 10 }}>
                            <Icon name={this.props.val.status == 'finished' ?
                                "md-checkmark-circle-outline"
                                : "md-radio-button-off"} size={25} />
                        </TouchableOpacity> : null
                }
                <View style={styles.cardContent}>

                    <Text style={[styles.description, this.props.val.status == 'finished' ? { textDecorationLine: "line-through", color: 'green' } : { color: '#646464' }]}>{this.props.val.subtask_name}</Text>
                    
                    {
                        this.props.val.due_date ?
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ marginRight: 5 }} name="md-calendar" size={20} />
                                <Text style={{ fontSize: 12 }}>{this.props.val.due_date}</Text>
                            </View>
                            : null
                    }

                    {
                        this.props.val.assigned_to ?
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ marginRight: 5 }} name="md-person" size={16} />
                                <Text style={{ fontSize: 14 }}>{this.props.val.assigned_to}</Text>
                            </View>
                            : null
                    }

                    {
                        this.props.val.total_progress > 0 ?
                            <Bar style={{ marginTop: 10 }} progress={this.props.val.progress / this.props.val.total_progress} width={null} />
                            : null
                    }

                    {this.props.creator ?
                        <TouchableOpacity style={styles.taskDelete} onPress={this.props.deleteSubTask}>
                            <Icon style={{ marginRight: 10 }} name="md-close" size={25} />
                        </TouchableOpacity>
                        :
                        this.props.val.user_id == this.props.user_id ?
                            <TouchableOpacity style={styles.taskDelete} onPress={this.props.leaveTask}>
                                <Icon style={{ marginRight: 10 }} name="ios-log-out" size={25} />
                            </TouchableOpacity> : <View />
                    }
                </View>
            </TouchableOpacity>
        );
    }
}