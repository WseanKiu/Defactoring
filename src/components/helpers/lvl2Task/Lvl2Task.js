import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import styles from '../../styles/Lvl2TaskStyle';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Lvl2Task extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.noteContainer}>

                {
                    this.props.assigned || this.props.creator ?
                        <TouchableOpacity
                            onPress={this.props.checkSubtask}
                            style={styles.cont_box1}>
                            <Icon name={this.props.val.status == 'finished' ?
                                'md-checkbox-outline' : 'md-square-outline'} size={25} />
                        </TouchableOpacity>
                        : null
                }
                <View style={styles.cont_textbox}>
                    <Text style={[styles.noteHeader, this.props.val.status == 'finished' ? { textDecorationLine: "line-through" } : null]}>{this.props.val.sst_name}</Text>
                </View>
                {
                    this.props.creator ?
                        <View style={styles.cont_box2}>
                            <TouchableOpacity onPress={this.props.deleteLvl2Task}>
                                <Icon style={{ marginRight: 10 }} name="md-close" size={25} />
                            </TouchableOpacity>
                        </View>
                        : null
                }
            </TouchableOpacity>
        )
    }
}