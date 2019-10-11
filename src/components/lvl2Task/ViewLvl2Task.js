import React from 'react';
import {
    TouchableOpacity,
    Alert,
    AsyncStorage,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Lvl2Task from './Lvl2Task';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import formsStyle from '../styles/formsStyle';
import modalStyle from '../styles/style';
import styles from '../styles/ViewLvl2TaskStyle';
import {
    server_ip,
    getSubtaskInfoUrl,
    getSubSubtaskUrl,
    addLvl2TaskUrl,
    checkLvl2TaskUrl,
    prioritizeTaskUrl,
    pokeUserUrl,
    deleteSubtaskUrl,
    deleteLvl2TaskUrl
} from '../../constants';
import { fetchData } from "../../helpers/FetchData";
import LoadingScreen from "../LoadingScreen";

class ViewLvl2Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isModalVisible: false,
            editLvl2task: false,
            creator: false,
            assigned: false,
            user_id: "",
            taskContainer: [],
            subtask_name: "Task_name",
            subtask_desc: "no description",
            date_update: "",
            status: "",
            due_date: "",
            progress: "",
            total_progress: "",
            assigned_to: "",
            full_name: "",
            task_name: "",
        }
    }

    componentWillMount() {
        this._getAsyncData();
    }

    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        this.setState({
            user_id: user_id,
        });
    };

    componentDidMount() {
        this.setState({
            creator: this.props.navigation.getParam('creator'),
            assigned: this.props.navigation.getParam('assigned'),
        });

        this.timer = setInterval(() => {
            const url = server_ip + getSubtaskInfoUrl;
            let content = JSON.stringify({
                user_id: this.state.user_id,
                subtask_id: this.props.navigation.getParam("subtask_id", "0")
            });

            fetchData(url, content)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        isLoading: false,
                        subtask_name: responseJson.items[0].subtask_name,
                        subtask_desc: responseJson.items[0].subtask_desc,
                        date_updated: responseJson.items[0].date_updated,
                        status: responseJson.items[0].status,
                        due_date: responseJson.items[0].due_date,
                        progress: responseJson.items[0].progress,
                        total_progress: responseJson.items[0].total_progress,
                        assigned_to: responseJson.items[0].assigned_to,
                        full_name: responseJson.items[0].full_name
                    });
                    responseJson = null;
                })
                .catch(error => {
                    alert(error + url);
                });

            const url2 = server_ip + getSubSubtaskUrl;

            let content2 = JSON.stringify({
                subtask_id: this.props.navigation.getParam("subtask_id", "0")
            });

            fetchData(url2, content2)
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        taskContainer: responseJson.items,
                    });
                    responseJson = null;
                })
                .catch(error => {
                    alert(error + url2);
                });
        }, 1000);
    }

    addTask() {
        this.setState({ isModalVisible: false });

        if (this.state.task_name.trim() != '') {
            const url = server_ip + addLvl2TaskUrl;

            let content = JSON.stringify({
                subtask_id: this.props.navigation.getParam("subtask_id", "0"),
                task_name: this.state.task_name,
            });

            fetchData(url, content)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error) {
                        alert(responseJson.response);
                    }
                })
                .catch(error => {
                    alert(error + url);
                });
        }
        else {
            Alert.alert(
                'Oops!',
                'Task name must be filled!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }

        this.setState({ task_name: "" });
    }


    checkSubTask = (id) => {
        const url = server_ip + checkLvl2TaskUrl;
        let content = JSON.stringify({
            id: id
        });
        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                alert(error + url);
            });
    }

    deleteLvl2Task = (id) => {
        const url = server_ip + deleteLvl2TaskUrl;
        let content = JSON.stringify({
            id: id
        });
        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                alert(error + url);
            });
    }

    prioritizeTask = () => {
        const url = server_ip + prioritizeTaskUrl;
        let content = JSON.stringify({
            subtask_id: this.props.navigation.getParam("subtask_id", "0"),
        });
        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
            });

    }

    pokeUser = () => {
        const url = server_ip + pokeUserUrl;
        let content = JSON.stringify({
            task_id: this.props.navigation.getParam("task_id", "0"),
            subtask_id: this.props.navigation.getParam("subtask_id", "0"),
            user_id: this.state.user_id
        });
        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
            });

        this.props.navigation.goBack();
    }

    confirmDeleteLvl1Task = () => {

        Alert.alert(
            'Confirm!',
            'Are you sure you want to delete this task?',
            [
                { text: 'Yes', onPress: () => this.deleteLvl1Task() },
                { text: 'No' },
            ],
            { cancelable: false },
        );
    }

    deleteLvl1Task = () => {
        const url = server_ip + deleteSubtaskUrl;
        let content = JSON.stringify({
            task_id: this.props.navigation.getParam("task_id", "0"),
            subtask_id: this.props.navigation.getParam("subtask_id", "0")
        });
        fetchData(url, content)        
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
            });

        this.props.navigation.goBack();
    }

    render() {
        let Lvl2Tasks = this.state.taskContainer.map((val, key) => {
            return <Lvl2Task key={key} keyval={key} val={val}
                creator={this.state.creator}
                assigned={this.state.assigned}
                checkSubtask={() => this.checkSubTask(val.id)}
                deleteLvl2Task={() => this.deleteLvl2Task(val.id)}
                editSubTask={() => this.setState({})} />
        });
        return this.state.isLoading ? (
            <LoadingScreen/>
        ) : (
                <ScrollView style={{ backgroundColor: "#ebf0f7" }}>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={modalStyle.modalContainer}>
                            <View style={modalStyle.modalHeader}>
                                <Text style={modalStyle.modalTitle}>Add task</Text>
                            </View>
                            <View style={modalStyle.modalBody}>
                                <TextInput
                                    onChangeText={(task_name) => this.setState({ task_name })}
                                    value={this.state.task_name}
                                    style={formsStyle.md_textInput_header}
                                    placeholder="Task name" />
                            </View>
                            <View style={modalStyle.modalTabs}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ isModalVisible: false })}
                                    style={{ flex: 0.5, alignItems: 'center' }}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.addTask.bind(this)}
                                    style={{ flex: 0.5, alignItems: 'center' }}>
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.formContainer}>
                        <Text style={styles.textHeader}>{this.state.subtask_name}</Text>
                        <Text style={styles.textSub}>{this.state.subtask_desc != '' ? this.state.subtask_desc : 'Add note'}</Text>
                        {
                            this.state.assigned_to != null ?
                                <View style={[formsStyle.row2style, { paddingTop: 10, alignItems: 'center' }]}>
                                    <Icon3 name="md-person" size={25} color="fff" />
                                    <Text style={styles.textSub}>{this.state.full_name} ({this.state.assigned_to})</Text>
                                </View> : null
                        }
                        {this.state.creator ?
                            <TouchableOpacity style={styles.deleteTaskButton}>
                                <Icon name="close" size={30} onPress={() => this.confirmDeleteLvl1Task()} />
                            </TouchableOpacity>
                            : null}
                        {this.state.creator && this.state.assigned_to != null ?
                            <TouchableOpacity style={styles.pokeButton} onPress={() => this.pokeUser()}>
                                <Icon2 name="hand-point-right" size={30} />
                            </TouchableOpacity>
                            : null}
                        {
                            this.state.creator ?
                                <TouchableOpacity
                                    onPress={() => this.setState({ isModalVisible: true })}
                                    style={styles.addButton}>
                                    <Icon3 name="ios-add" size={30} color="#fff" />
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                    {Lvl2Tasks}
                </ScrollView>
            )
    }
}

export default ViewLvl2Task;
