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
import DlgtdLogo from '../assets/logo/DlgtdLogo';
import styles from '../components/styles/style';
import LoadingScreen from '../components/LoadingScreen';
import Bar from 'react-native-progress/Bar';
import { fetchData, fetchData2 } from '../helpers/FetchData';
import FLoatingAddGroupTask from '../components/groupTask/FloatingAddGroupTask';
import { server_ip, getUserGroupTaskUrl } from '../constants';

class GroupTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskContainer: [],
            isLoading: true,
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
            user_id: '',
        });
    }

    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        this.setState({
            user_id: user_id
        });
        const url = server_ip + getUserGroupTaskUrl;

        const content = JSON.stringify({
            user_id: user_id
        });
        
        try {
            let response = await fetchData(url, content);
            let data = await response.json();
            this.setState({
                taskContainer: data.items,
                isLoading: false
            });
        } catch (error) {
            console.log("som ting wen wong" + error);
        }

        this.timer = setInterval(() => {
            this.db_check(url, content)
        }, 1000);
    };

    db_check = async (url, content) => {
        let response = await fetchData2(url, content, "post");
        let data = await response.json();
        this.setState({
            taskContainer: data.items,
            isLoading: false
        });
    }

    renderItem = ({ item }) => {
        const task_id = item.task_id;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate("ViewGroupTaskScreen", { task_id: task_id, server_ip: server_ip, task_creator: this.state.user_id == item.user_id ? true : false });
                }}
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
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        {item.task_status == 'prioritize' ? <Icon name="star" size={25} color="#f1c40f" /> : null}
                        <Text style={{ fontSize: 20, color: "#008a00", fontWeight: '600' }}>{item.title}</Text>
                    </View>
                    <Text style={{ color: "#8e8e93", paddingVertical: 5 }}>Members {item.total_members}</Text>
                </View>

                {
                    item.due_date ?
                        <View style={{ flexDirection: 'row' }}>
                            <Icon_2 name="calendar-clock" size={18} color="#e74c3c" />
                            <Text style={{ fontSize: 10, paddingLeft: 5, alignSelf: 'center', paddingBottom: 10, color: "#696969" }}>{item.due_date}</Text>
                        </View>
                        : null
                }

                {
                    item.total_progress > 0 ?
                        <Bar progress={item.progress / item.total_progress} width={null} />
                        : null
                }
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            <View style={{ height: 1 }} />
        );
    };

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
                    <FLoatingAddGroupTask navigation={this.props.navigation} />
                </View>
            );
    }
}

export default GroupTaskScreen;