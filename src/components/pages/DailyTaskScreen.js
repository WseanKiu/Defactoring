import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_2 from "react-native-vector-icons/MaterialCommunityIcons";
import DlgtdLogo from '../../assets/logo/DlgtdLogo';
import styles from '../styles/style';
import LoadingScreen from '../helpers/LoadingScreen';
import moment from 'moment';
import AddDailyTaskButton from '../helpers/AddDailyTaskButton';
import { fetchData } from '../helpers/FetchData';

class DailyTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskContainer: [],
            isLoading: true,
            ip_server: '',
            user_id: '',
        }
    }

    componentWillMount() {
        this._getAsyncData();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({
            taskContainer: [],
            isLoading: true,
            ip_server: '',
            user_id: '',
        });
    }

    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        const server_ip = await AsyncStorage.getItem("server_ip");
        this.setState({
            ip_server: server_ip,
            user_id: user_id
        });

        let content = JSON.stringify({
            user_id: this.state.user_id
        });

        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/getDailyTaskController.php";

        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    taskContainer: responseJson.items,
                    isLoading: false
                });
            })

        this.handleResponse();
    };

    handleResponse = () => {
        let content = JSON.stringify({
            user_id: this.state.user_id
        });
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/getDailyTaskController.php";

        this.timer = setInterval(() => {
            fetchData(url, content)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        taskContainer: responseJson.items,
                        isLoading: false
                    });
                })

        }, 1000);
    }

    checkDailyTask = (id) => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/checkDailyTaskController.php";
        
            let content = JSON.stringify({id: id});

        fetchData(url, content)
    }


    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon style={styles.navLeftItem} name="menu" size={25} />
                </TouchableOpacity>
            ),
            headerTitle: (
                <TouchableOpacity
                    onPress={() => navigation.navigate("AuthScreen")}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <DlgtdLogo />
                    <Text>DLGTD</Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={styles.rightNav}>
                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                        <Icon style={styles.navItem} name="notifications" size={25} />
                    </TouchableOpacity>
                </View>
            ),
        };
    };

    renderItem = ({ item }) => {
        const task_id = item.task_id;

        let date = moment()
            .utcOffset(item.wut_time)
            .format('HH:mm a');
        return (
            <TouchableOpacity
                style={{
                    paddingTop: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginVertical: 5,
                    backgroundColor: "white",
                    borderRadius: 10,
                }}>

                <View style={{ flex: 1, alignContent: "center" }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => { this.checkDailyTask(item.id) }}>
                            <Icon_2 name={item.status == 'done' ?
                                "checkbox-marked-outline"
                                : "checkbox-blank-outline"} size={30} style={{ paddingRight: 10 }} />

                        </TouchableOpacity>
                        <View>
                            {
                                item.wut_time ?
                                    <Text style={{ fontWeight: '600', fontSize: 18, color: "#d35400" }}>{date}</Text>
                                    : null
                            }
                            <Text style={{ fontSize: 20, color: "#008a00", fontWeight: '500', textDecorationLine: item.status == 'done' ? 'line-through' : 'none' }}>{item.task_name}</Text>
                        </View>
                    </View>
                    {item.description != '' ?
                        <Text style={{ color: "#8e8e93", paddingVertical: 5 }}>{item.description}</Text>
                        : null}
                </View>
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            <View style={{ height: 1 }} />
        );
    };

    render() {
        return this.state.isLoading ? (
            <LoadingScreen />
        ) : (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.taskContainer}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                    <AddDailyTaskButton navigation={this.props.navigation} />
                </View>
            );
    }
}

export default DailyTaskScreen;