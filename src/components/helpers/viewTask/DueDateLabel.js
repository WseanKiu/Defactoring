import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-datepicker";
import formsStyle from '../../styles/formsStyle';

class DueDateLabel extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.editDue ? (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.props.task_dueDate instanceof Date ? this.props.task_dueDate : this.props.present_date}
                            // date={this.props.task_dueDate instanceof Date ? this.props.task_dueDate : null}
                            mode="datetime"
                            placeholder="Pick a date"
                            format="YYYY-MM-DD HH:mm"
                            minDate={this.props.present_date}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: "absolute",
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            minuteInterval={10}
                            onCloseModal={this.props.updateEditDue}
                            onDateChange={this.props.setDueDate}
                        />
                        <TouchableOpacity style={{marginLeft: 7}} onPress={this.props.removeDueDate}>
                            <Icon name="calendar-remove" size={30} color="#fff"/>
                        </TouchableOpacity>
                        </View>
                    ) : (
                            <TouchableOpacity
                                onPress={this.props.editDueDate}
                                style={formsStyle.row2style}>
                                <Icon name="calendar-clock" size={25} color="#fff" />
                                <Text style={formsStyle.valContainer}>
                                    {
                                        moment(this.props.task_dueDate).isValid()
                                        ? 
                                        this.props.task_dueDate 
                                        : 
                                        'Pick a date'
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                }

            </View>
        );
    }
}

export default DueDateLabel;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    }
});