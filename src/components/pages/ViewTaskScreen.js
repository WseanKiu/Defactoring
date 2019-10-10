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
import DlgtdLogo from "../../assets/logo/DlgtdLogo";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon_2 from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import DateCreatedLabel from "../helpers/viewTask/DateCreatedLabel";
import DueDateLabel from "../helpers/viewTask/DueDateLabel";
import TaskTitleLabel from "../helpers/viewTask/TaskTitleLabel";
import DescLabel from "../helpers/viewTask/DescLabel";
import AddSubTaskButton from "../helpers/viewTask/AddSubTaskButton";
import SubTask from "../helpers/viewTask/SubTask";
import formsStyle from "../styles/formsStyle";
import styles from "../styles/style";
import { fetchData } from "../helpers/FetchData";
import LoadingScreen from "../helpers/LoadingScreen";

class ViewTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      progress: 0,
      total_progress: 0,
      subTaskArray: [],
      subTaskName: "",
      subTaskDesc: "",
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
    this.setState({ present_date: temp });
  }

  componentDidMount() {
    const url =
      "http://" +
      this.props.navigation.getParam("server_ip", "") +
      "/dlgtd/controller/viewTaskController.php";

    let content = JSON.stringify({
      user_id: this.state.user_id,
      task_id: this.props.navigation.getParam("task_id", "0")
    });

    fetchData(url, content)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          taskContainer: responseJson.items[0],
          isLoading: false,
          task_name: responseJson.items[0].title,
          task_desc: responseJson.items[0].desc,
          task_dueDate: responseJson.items[0].due_date,
          task_status: responseJson.items[0].task_status,
          date_created: responseJson.items[0].date_created,
          progress: responseJson.items[0].progress,
          total_progress: responseJson.items[0].total_progress,
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

    let content2 = JSON.stringify({
      task_id: this.props.navigation.getParam("task_id", "0")
    });

    fetchData(url_2, content2)
      .then(response => response.json())
      .then(responseJson => {

        this.setState({
          subTaskArray: responseJson.items,
        });
        responseJson = null;
      })
      .catch(error => {
      });

    this.timer = setInterval(() => {
      const url_2 =
        "http://" +
        this.props.navigation.getParam("server_ip", "") +
        "/dlgtd/controller/getSubTaskController.php";

      fetchData(url_2, content2)
        .then(response => response.json())
        .then(responseJson => {
          JSON.stringify(this.state.subTaskArray) == JSON.stringify(responseJson.items) ?
            null :
            this.setState({
              subTaskArray: responseJson.items,
            });
          responseJson = null;
        })
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);

    var values = this.state.task_name === this.state.var_taskName ?
      '' : "task_name = '" + this.state.task_name + "'";
    values += this.state.task_desc === this.state.var_taskDesc ?
      '' : (values !== '' ? ', ' : "") + "task_description = '" + this.state.task_desc + "'";
    values += this.state.task_dueDate === this.state.var_dueDate ?
      '' : (values !== '' ? ', ' : "") + "due_date = " + (this.state.task_dueDate != '' ? "'" + this.state.task_dueDate + "'" : null) + " ";
    values += (values !== '' ? ', ' : "") + "task_status = '" + this.state.task_status + "'";

    if (values != '') {
      const url =
        "http://" +
        this.props.navigation.getParam("server_ip", "") +
        "/dlgtd/controller/updateTaskController.php";

      let content = JSON.stringify({
        user_id: this.state.user_id,
        task_id: this.props.navigation.getParam("task_id", "0"),
        values: values,
      });

      fetchData(url, content)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error === true) {
            alert("Something went wrong, please try again later." + values);
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
      "/dlgtd/controller/addSubTaskController.php";

    let content = JSON.stringify({
      task_id: this.props.navigation.getParam("task_id", "0"),
      user_id: this.state.user_id,
      subTask_name: this.state.subTaskName,
      subTask_desc: this.state.subTaskDesc,
      due_date: this.state.subTaskDue,
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

  updateSubTask = () => {
    const url =
      "http://" +
      this.state.ip_server +
      "/dlgtd/controller/updateSubtaskController.php";

    let content = JSON.stringify({
      subtask_id: this.state.subTaskID,
      subtask_name: this.state.subTaskName,
      subtask_desc: this.state.subTaskDesc,
      due_date: this.state.subTaskDue
    });

    fetchData(url, content)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
        }
      })
      .catch(error => {
      });
  }

  deleteTask = () => {
    const url =
      "http://" +
      this.state.ip_server +
      "/dlgtd/controller/deleteTaskController.php";

    let content = JSON.stringify({
      task_id: this.props.navigation.getParam("task_id", "0")
    });

    fetchData(url, content)
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
          <TouchableOpacity onPress={() => navigation.navigate("AddTask")}>
            <Icon style={styles.navItem} name="notifications" size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon style={styles.navItem} name="account-circle" size={25} />
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
      this.setState({ subTaskName: '', subTaskDesc: '', subTaskDue: '' });
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
      this.setState({ subTaskName: '', subTaskDesc: '', subTaskDue: '' });
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


  deleteSubTask = (id) => {
    const url =
      "http://" +
      this.state.ip_server +
      "/dlgtd/controller/deleteSubtaskController.php";

    let content = JSON.stringify({
      task_id: this.props.navigation.getParam("task_id", "0"),
      subtask_id: id
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

  checkSubTask = (id) => {
    const url =
      "http://" +
      this.state.ip_server +
      "/dlgtd/controller/checkSubtaskController.php";

    let content = JSON.stringify({
      subtask_id: id
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

  render() {
    const { navigation } = this.props;

    let SubTasks = this.state.subTaskArray.map((val, key) => {
      return <SubTask key={key} keyval={key} val={val}
        checkSubtask={() => this.checkSubTask(val.subtask_id)}
        deleteSubTask={() => this.deleteSubTask(val.subtask_id)}
        editSubTask={() => this.setState({
          editSubTask: true,
          subTaskID: val.subtask_id,
          subTaskName: val.subtask_name,
          subTaskDesc: val.subtask_desc,
          subTaskDue: val.due_date,
        })} />
    });

    return this.state.isLoading ? (
      <LoadingScreen/>
    ) : (
        <ScrollView style={{ backgroundColor: "#ebf0f7" }}>
          <Modal
            isVisible={this.state.isModalVisible}>
            <View style={styles.modalContainer}>

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Subtask</Text>
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
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

                <TouchableOpacity style={{ marginLeft: 7 }} onPress={() => this.setState({ subTaskDue: '' })}>
                  <Icon_2 name="calendar-remove" size={30} />
                </TouchableOpacity>
              </View>

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
            <DateCreatedLabel created_at={this.state.date_created} />
            <DueDateLabel editDue={this.state.editDue} task_dueDate={this.state.task_dueDate}
              present_date={this.state.present_date} editDue={this.state.editDue}
              updateEditDue={() => {
                this.setState({ editDue: false });
              }}
              setDueDate={task_dueDate => {
                this.setState({ task_dueDate: task_dueDate, editDue: false });
              }}
              removeDueDate={() => {
                this.setState({ task_dueDate: '', editDue: false })
              }}
              editDueDate={() => this.setState({ editDue: true })} />

            <TouchableOpacity style={styles.deleteTaskButton}
              onPress={this.confirmDeleteTask.bind(this)}>
              <Icon name="delete" size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.prioritizeButton} onPress={this.toggleTaskStatus}>
              <Icon name={this.state.task_status == 'prioritize' ? "star" : "star-border"} size={30} color={this.state.task_status == 'prioritize' ? "#f1c40f" : "#000"} />
            </TouchableOpacity>
            <AddSubTaskButton addSubTask={() => this.setState({ isModalVisible: true })} />
          </View>
          {SubTasks}
        </ScrollView>
      );
  }
}

export default ViewTaskScreen;