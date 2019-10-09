import React, { Component } from 'react';
import {
    Text,
    FlatList,
    View,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/TaskCalendarStyle';

export default class TaskCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            present_date: "",
            isLoading: true,
            user_id: "",
            ip_server: "",
        };
    }

    static navigationOptions = {
        title: "Calendar"
    };

    componentWillMount() {
        this._getAsyncData();

        var day = new Date();
        var temp =
            day.getFullYear() +
            "-" +
            (day.getMonth() + 1) +
            "-" +
            day.getDate() +
            " " +
            day.getHours() +
            ":" +
            day.getMinutes();
        this.setState({ present_date: temp });
    }

    _getAsyncData = async () => {
        const server_ip = await AsyncStorage.getItem("server_ip");
        const user_id = await AsyncStorage.getItem("user_id");
        this.setState({
            ip_server: server_ip,
            user_id: user_id,
        });

        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/viewTaskDatesController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0")
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    items: responseJson.items,
                    isLoading: false
                });
            })
            .catch(error => {
                alert(error + url);
            });
    };

    componentDidMount() {
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.eventBox}>
                <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>{item.day}</Text>
                    <Text style={styles.eventMonth}>{item.month}</Text>
                </View>
                <View style={styles.eventContent}>
                    <Text style={styles.eventTime}>{item.time}</Text>
                    <Text style={styles.taskTitle}>{item.task_name}</Text>

                    {
                        item.assigned_to != "" || item.assigned_to != "Pending"?
                        <Text style={styles.userName}>{item.assigned_to}</Text> : null
                    }
                </View>
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={styles.eventList}
            />
        );
    };

    render() {
        return this.state.isLoading ?(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#000000" animating />
            </View>
        ) :(
            <View style={styles.container}>
                <FlatList
                    data={this.state.items}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}