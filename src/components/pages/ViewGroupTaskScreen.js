import React from "react";
import {
    Alert,
    View,
    Text,
    AsyncStorage,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from "react-native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import DlgtdLogo from "../../assets/logo/DlgtdLogo";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import DateCreatedLabel from "../helpers/viewTask/DateCreatedLabel";
import DueDateLabel from "../helpers/viewTask/DueDateLabel";
import TaskTitleLabel from "../helpers/viewTask/TaskTitleLabel";
import DescLabel from "../helpers/viewTask/DescLabel";
import AddSubTaskButton from "../helpers/viewTask/AddSubTaskButton";
import Lvl1Task from "../helpers/lvl2Task/Lvl1Task";
import formsStyle from "../styles/formsStyle";
import styles from "../styles/style";

class ViewGroupTaskScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creator: false, // if the user is the creator, it'll be true...
            isLoading: true,
            isModalVisible: false,
            editSubTask: false,
            ip_server: "",
            user_id: "",
            taskContainer: [],
            task_status: "",
            task_name: "",
            var_taskName: "",
            editTitle: false,
            task_desc: "",
            var_taskDesc: "",
            editDesc: false,
            task_dueDate: "",
            var_dueDate: "",
            editDue: false,
            present_date: "",
            date_created: "",
            subTaskArray: [],
            subTaskName: "",
            subTaskDesc: "",
            subTaskAssign: "",
            subTaskDue: "",
        };
    }

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
        this.setState({ present_date: temp, creator: this.props.navigation.getParam("task_creator") });
    }

    componentDidMount() {
        const url =
            "http://" +
            this.props.navigation.getParam("server_ip", "") +
            "/dlgtd/controller/viewTaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                task_id: this.props.navigation.getParam("task_id", "0")
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    taskContainer: responseJson.items[0],
                    isLoading: false,
                    task_name: responseJson.items[0].title,
                    task_desc: responseJson.items[0].desc,
                    task_dueDate: responseJson.items[0].due_date,
                    date_created: responseJson.items[0].date_created,
                    task_status: responseJson.items[0].task_status,
                    var_taskName: responseJson.items[0].title,
                    var_taskDesc: responseJson.items[0].desc,
                    var_dueDate: responseJson.items[0].due_date,
                });
            })
            .catch(error => {
                alert(error + url);
            });


        const url_2 =
            "http://" +
            this.props.navigation.getParam("server_ip", "") +
            "/dlgtd/controller/getSubTaskController.php";
        fetch(url_2, {
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
                    subTaskArray: responseJson.items,
                });
                responseJson = null;
            })
            .catch(error => {
                alert(error + url);
            });
        this.timer = setInterval(() => {
            const url_2 =
                "http://" +
                this.props.navigation.getParam("server_ip", "") +
                "/dlgtd/controller/getSubTaskController.php";
            fetch(url_2, {
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
                    JSON.stringify(this.state.subTaskArray) == JSON.stringify(responseJson.items) ?
                        null :
                        this.setState({
                            subTaskArray: responseJson.items,
                        });
                    responseJson = null;
                })
                .catch(error => {
                    alert(error + url);
                });
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);

        var values = this.state.task_name === this.state.var_taskName ?
            '' : "task_name = '" + this.state.task_name + "'";
        values += this.state.task_desc === this.state.var_taskDesc ?
            '' : (values !== '' ? ', ' : "") + "task_description = '" + this.state.task_desc + "'";
        values += this.state.task_dueDate === this.state.var_dueDate ?
            '' : (values !== '' ? ', ' : "") + "due_date = '" + this.state.task_dueDate + "' ";
        values += (values !== '' ? ', ' : "") + "task_status = '" + this.state.task_status + "'";

        if (values != '') {
            const url =
                "http://" +
                this.props.navigation.getParam("server_ip", "") +
                "/dlgtd/controller/updateTaskController.php";
            fetch(url, {
                method: "post",
                header: {
                    Accept: "application/json",
                    "Content-type": "applicantion/json"
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    task_id: this.props.navigation.getParam("task_id", "0"),
                    values: values,
                })
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error === true) {
                        alert("Something went wrong, please try again later.");
                    }
                })
                .catch(error => {
                    alert("Please check your internet connection!");
                });
        }

        this.setState({
            isLoading: true,
            isModalVisible: false,
            ip_server: "",
            user_id: "",
            taskContainer: [],
            task_name: "",
            var_taskName: "",
            editTitle: false,
            task_desc: "",
            var_taskDesc: "",
            editDesc: false,
            task_dueDate: "",
            var_dueDate: "",
            editDue: false,
            present_date: "",
            date_created: "",
            subTaskArray: [],
            subTaskID: "",
            subTaskName: "",
            subTaskDesc: "",
            subTaskDue: "",
        });
    }

    putSubTask = () => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/addGroupSubtaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0"),
                user_id: this.state.user_id,
                subTask_name: this.state.subTaskName,
                subTask_desc: this.state.subTaskDesc,
                due_date: this.state.subTaskDue,
                invite: this.state.subTaskAssign,
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
            });
    }

    updateSubTask = () => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/updateGroupSubtaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                task_id: this.props.navigation.getParam("task_id", "0"),
                subtask_id: this.state.subTaskID,
                subtask_name: this.state.subTaskName,
                subtask_desc: this.state.subTaskDesc,
                due_date: this.state.subTaskDue,
                invite: this.state.subTaskAssign
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                alert(error + "Please check your internet connection!");
            });
    }

    deleteTask = () => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/deleteTaskController.php";
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
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                alert(error + "Please check your internet connection!");
            });

        this.props.navigation.goBack();
    }

    static navigationOptions = ({ navigation }) => {
        return {
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
                    <TouchableOpacity onPress={() => navigation.navigate("Notification", { last_screen: "GroupTaskScreen" })}>
                        <Icon style={styles.navItem} name="notifications" size={25} />
                    </TouchableOpacity>
                </View>
            )
        };
    };

    _getAsyncData = async () => {
        const server_ip = await AsyncStorage.getItem("server_ip");
        const user_id = await AsyncStorage.getItem("user_id");
        this.setState({
            ip_server: server_ip,
            user_id: user_id,
        });
    };

    toggleModal = () => {
        this.setState({
            isModalVisible: false,
            editSubTask: false,
            subTaskID: '',
            subTaskName: '',
            subTaskDesc: '',
            subTaskDue: ''
        });
    };

    toggleTaskStatus = () => {
        var temp = this.state.task_status == 'prioritize' ? "active" : "prioritize";
        this.setState({
            task_status: temp
        });
    };

    addSubTask() {

        if (this.state.subTaskName !== '') {
            this.putSubTask();
            this.setState({
                subTaskName: '',
                subTaskDesc: '',
                subTaskDue: '',
                subTaskAssign: ''
            });
        } else {
            Alert.alert(
                'Oops!',
                'Subtask name must be filled!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
        this.setState({ isModalVisible: false });
    }

    editSubTask() {

        if (this.state.subTaskName !== '') {
            this.updateSubTask();
            this.setState({
                subTaskName: '',
                subTaskDesc: '',
                subTaskDue: '',
                subTaskAssign: ''
            });
        } else {
            Alert.alert(
                'Oops!',
                'Subtask name must be filled!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
        this.setState({ editSubTask: false });
    }

    confirmDeleteTask() {
        Alert.alert(
            'Alert!',
            'Are you sure you want to delete this task?',
            [
                { text: 'Yes', onPress: () => this.deleteTask() },
                { text: 'No' },
            ],
            { cancelable: false },
        );
    }

    confirmArchive() {
        Alert.alert(
            'Archive!',
            'Are you sure you want to move this task to archive?',
            [
                { text: 'Yes', onPress: () => this.putArchive() },
                { text: 'No' },
            ],
            { cancelable: false },
        );
    }

    putArchive = () => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/putTaskArchiveController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0"),
            })
        })
            .then(response => response.json())
            .then(responseJson => {
            })
            .catch(error => {
                alert(error + url);
            });

        this.setState({ task_status: 'archive' })
    }

    confirmDeleteSubtask = (id, subtask_name) => {
        Alert.alert(
            'Remove subtask!?',
            'Are you sure you want to remove ' + subtask_name + '?',
            [
                { text: 'Yes', onPress: () => this.deleteSubTask(id) },
                { text: 'No' },
            ],
            { cancelable: false },
        );
    }

    deleteSubTask = (id) => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/deleteSubtaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0"),
                subtask_id: id
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
            });
    }

    subTaskProgress = (id, progress) => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/updateSubtaskProgressController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0"),
                subtask_id: id,
                progress: progress
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
            });
    }

    confirmLeaveTask = (id, subtask_name) => {
        Alert.alert(
            'Leave ' + subtask_name + '!?',
            'Are you sure you want to leave this task?',
            [
                { text: 'Yes', onPress: () => this.leaveTask(id) },
                { text: 'No' },
            ],
            { cancelable: false },
        );
    }

    leaveTask = (id) => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/leaveTaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0"),
                subtask_id: id,
                user_id: this.state.user_id
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
            });
    }

    checkLvl1Task = (subtask_id) => {
        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/checkSubtaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                subtask_id: subtask_id
            })
        })
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

    render() {
        const { navigation } = this.props;

        let Lvl1Tasks = this.state.subTaskArray.map((val, key) => {
            return <Lvl1Task key={key} keyval={key} val={val}
                navigation={this.props.navigation}
                checkTask={() => this.checkLvl1Task(val.subtask_id)}
                task_id={this.props.navigation.getParam("task_id", "0")}
                creator={this.state.creator}
                user_id={this.state.user_id}
                deleteSubTask={() => this.confirmDeleteSubtask(val.subtask_id, val.subtask_name)}
                leaveTask={() => this.confirmLeaveTask(val.subtask_id, val.subtask_name)}
                updateProgress={value => this.subTaskProgress(val.subtask_id, value)}
                editSubTask={() => this.setState({
                    editSubTask: true,
                    subTaskID: val.subtask_id,
                    subTaskName: val.subtask_name,
                    subTaskDesc: val.subtask_desc,
                    subTaskDue: val.due_date,
                    subTaskAssign: val.assigned_to,
                })} />
        });

        return this.state.isLoading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="tomato" animating />
            </View>
        ) : (
                <ScrollView style={{ backgroundColor: "#ebf0f7" }}>
                    <Modal
                        isVisible={this.state.isModalVisible}>
                        <View style={styles.modalContainer}>

                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Add task</Text>
                            </View>
                            <View style={styles.modalBody}>
                                <TextInput
                                    autoFocus
                                    onChangeText={(subTaskName) => this.setState({ subTaskName })}
                                    value={this.state.subTaskName}
                                    style={formsStyle.md_textInput_header}
                                    placeholder="Task name" />
                                <TextInput
                                    onChangeText={(subTaskDesc) => this.setState({ subTaskDesc })}
                                    value={this.state.subTaskDesc}
                                    style={formsStyle.md_textInput_children}
                                    placeholder="Note" />
                                <TextInput
                                    onChangeText={(subTaskAssign) => this.setState({ subTaskAssign })}
                                    value={this.state.subTaskAssign}
                                    style={formsStyle.md_textInput_children}
                                    placeholder="User code" />
                            </View>

                            <DatePicker
                                style={{ width: 200 }}
                                mode="datetime"
                                date={this.state.subTaskDue}
                                placeholder="Pick a date"
                                format="YYYY-MM-DD HH:mm"
                                minDate={this.state.present_date}
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
                                onDateChange={subTaskDue => {
                                    this.setState({ subTaskDue: subTaskDue });
                                }}
                            />

                            <View style={styles.modalTabs}>
                                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }} onPress={this.toggleModal}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }} onPress={this.addSubTask.bind(this)}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        isVisible={this.state.editSubTask}>
                        <View style={styles.modalContainer}>

                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Edit Subtask</Text>
                            </View>
                            <View style={styles.modalBody}>
                                <TextInput
                                    autoFocus
                                    onChangeText={(subTaskName) => this.setState({ subTaskName })}
                                    value={this.state.subTaskName}
                                    style={formsStyle.md_textInput_header}
                                    placeholder="Subtask name" />
                                <TextInput
                                    onChangeText={(subTaskDesc) => this.setState({ subTaskDesc })}
                                    value={this.state.subTaskDesc}
                                    style={formsStyle.md_textInput_children}
                                    placeholder="Description" />
                                <TextInput
                                    onChangeText={(subTaskAssign) => this.setState({ subTaskAssign })}
                                    value={this.state.subTaskAssign}
                                    style={formsStyle.md_textInput_children}
                                    placeholder="User code" />
                            </View>

                            <DatePicker
                                style={{ width: 200 }}
                                mode="datetime"
                                date={this.state.subTaskDue}
                                placeholder="Pick a date"
                                format="YYYY-MM-DD HH:mm"
                                minDate={this.state.present_date}
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
                                onDateChange={subTaskDue => {
                                    this.setState({ subTaskDue: subTaskDue });
                                }}
                            />

                            <View style={styles.modalTabs}>
                                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }} onPress={this.toggleModal}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }} onPress={this.editSubTask.bind(this)}>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={formsStyle.formContainer}>
                        {this.state.creator ?
                            <TouchableOpacity style={styles.prioritizeButton} onPress={this.toggleTaskStatus}>
                                <Icon name={this.state.task_status == 'prioritize' ? "star" : "star-border"} size={30} color={this.state.task_status == 'prioritize' ? "#f1c40f" : "#000"} />
                            </TouchableOpacity>
                            :
                            this.state.task_status == 'prioritize' ?
                                <Icon name={this.state.task_status == 'prioritize' ? "star" : "star-border"} size={30} color={this.state.task_status == 'prioritize' ? "#f1c40f" : "#000"} />
                                : null
                        }
                        {this.state.creator ?
                            <TaskTitleLabel
                                editTitle={this.state.editTitle}
                                task_name={this.state.task_name}
                                onChangeTaskName={(task_name) => {
                                    this.setState({ task_name });
                                }}
                                onBack={() => {
                                    this.setState({ editTitle: false });
                                }}
                                onClick={() => {
                                    this.setState({ editTitle: true });
                                }}
                            />
                            :
                            <Text
                                style={formsStyle.textHeader}>
                                {this.state.task_name}
                            </Text>}

                        {this.state.creator ?
                            <DescLabel
                                editDesc={this.state.editDesc}
                                description={this.state.task_desc}
                                onChangeDesc={(task_desc) => {
                                    this.setState({ task_desc });
                                }}
                                onBackDesc={() => {
                                    this.setState({ editDesc: false });
                                }}
                                onClickDesc={() => {
                                    this.setState({ editDesc: true });
                                }}
                            />
                            :
                            <Text
                                style={formsStyle.textSub}>
                                {this.state.task_desc != ""
                                    ? this.state.task_desc
                                    : "no description"}
                            </Text>}
                        <DateCreatedLabel created_at={this.state.date_created} />
                        {this.state.creator ?
                            <DueDateLabel editDue={this.state.editDue} task_dueDate={this.state.task_dueDate}
                                present_date={this.state.present_date} editDue={this.state.editDue}
                                updateEditDue={() => {
                                    this.setState({ editDue: false });
                                }}
                                setDueDate={task_dueDate => {
                                    this.setState({ task_dueDate: task_dueDate, editDue: false });
                                }}
                                editDueDate={() => this.setState({ editDue: true })} />
                            :
                            <View>
                                {
                                    (moment(this.state.task_dueDate).isValid()) ?
                                        <View
                                            style={[formsStyle.row2style, { marginVertical: 10 }]}>
                                            <Icon2 name="calendar-clock" size={25} color="#fff" />
                                            <Text style={formsStyle.valContainer}>
                                                {this.state.task_dueDate}
                                            </Text>
                                        </View>
                                        : null
                                }
                            </View>
                        }

                        {
                            (moment(this.state.task_dueDate).isValid()) ?

                                <TouchableOpacity
                                    style={formsStyle.row2style}
                                    onPress={() => this.props.navigation.navigate("TaskCalendarScreen", { task_id: this.props.navigation.getParam("task_id", "0") })}>
                                    <Icon2 name="calendar-multiselect" size={25} color="#fff" />
                                    <Text style={formsStyle.valContainer}>
                                        View calendar
                                    </Text>
                                </TouchableOpacity> : null
                        }

                        {this.state.creator ?
                            <TouchableOpacity style={styles.deleteTaskButton}
                                onPress={this.confirmDeleteTask.bind(this)}>
                                <Icon name="close" size={30} />
                            </TouchableOpacity>
                            : null}
                        {this.state.creator ?
                            <AddSubTaskButton addSubTask={() => this.setState({ isModalVisible: true })} />
                            : null}


                        {this.state.creator ?
                            <TouchableOpacity
                                onPress={() => this.confirmArchive()}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 50,
                                }}>
                                <Icon name="archive" size={30} />
                            </TouchableOpacity>
                            : null}
                    </View>
                    {Lvl1Tasks}
                </ScrollView>
            );
    }
}

export default ViewGroupTaskScreen;
