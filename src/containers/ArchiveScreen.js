import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DlgtdLogo from '../assets/logo/DlgtdLogo';
import styles from '../components/styles/style';
import LoadingScreen from '../components/LoadingScreen';
import { fetchData } from '../helpers/FetchData';
import { getArchiveTaskUrl, server_ip } from '../constants';

class ArchiveScreen extends Component {
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

        const url = server_ip + getArchiveTaskUrl;

        let content = JSON.stringify({
            user_id: user_id
        });

        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    taskContainer: responseJson.items,
                    isLoading: false
                });
            })
            .catch(error => {
            });

        this.handleResponse();
    };

    handleResponse = () => {
        this.timer = setInterval(() => {

            const url = server_ip + getArchiveTaskUrl;

            let content = JSON.stringify({
                user_id: this.state.user_id
            });

            fetchData(url, content)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        taskContainer: responseJson.items,
                        isLoading: false
                    });
                })
                .catch(error => {
                });
        }, 1000);
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
                    onPress={() => navigation.navigate("ArchiveScreen")}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <DlgtdLogo />
                    <Text>Archive</Text>
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
        return (
            <TouchableOpacity
                onPress={() => {
                    alert('task_id: ' + item.task_id);
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
                    <Text style={{ color: '#95a5a6', fontSize: 18, fontWeight: '500' }}>{item.task_name}</Text>
                    <Text style={{ color: '#bdc3c7', fontSize: 16 }}>{item.task_description}</Text>
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
                </View>
            );
    }
}

export default ArchiveScreen;