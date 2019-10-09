import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";
import styles from '../styles/AddTaskStyle';

class AddTaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server_ip: "",
      user_id: "",
      task_name: "",
      task_description: "",
      isLoading: false,
      due_date: "",
      dateText: "Pick a date",
      present_date: ""
    };
    this._getAsyncData();
  }

  static navigationOptions = {
    title: "add task"
  };

  componentDidMount() {
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

  checkInputs = () => {
    this.setState({ isLoading: true });
    if (this.state.task_name == "") {
      alert("Title must be filled!");
      this.setState({ isLoading: false });
    } else {
      this.addUserTask();
    }
  };

  addUserTask = () => {
    const { task_name } = this.state;
    const { task_description } = this.state;
    const { due_date } = this.state;

    const url =
      "http://" +
      this.state.server_ip +
      "/dlgtd/controller/addTaskController.php";

    fetch(url, {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "applicantion/json"
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        task_name: task_name,
        task_description: task_description,
        task_dueDate: due_date,
        task_type: 'solo'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error === false) {
          this.props.navigation.navigate("Main");
        } else {
          alert(responseJson.msg + 'AddtaskScreen!');
        }
      })
      .catch(error => {
        alert(error + 'error: catch! AddtaskScreen!');
      });
  };

  _getAsyncData = async () => {
    const server_ip = await AsyncStorage.getItem("server_ip");
    const user_id = await AsyncStorage.getItem("user_id");
    this.setState({ server_ip: server_ip, user_id: user_id });
  };

  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000000" animating />
      </View>
    ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.textLabel}>Title*</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Title"
                onChangeText={task_name => this.setState({ task_name })}
              />

              <Text style={styles.textLabel}>Description</Text>
              <TextInput
                style={styles.textInputChildren}
                placeholder="Description"
                onChangeText={task_description =>
                  this.setState({ task_description })
                }
              />
              <Text style={styles.textLabel}>Due date</Text>

              <DatePicker
                style={{ width: 200 }}
                date={this.state.due_date}
                mode="datetime"
                placeholder={this.state.dateText}
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
                onDateChange={due_date => {
                  this.setState({ due_date: due_date });
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.checkInputs}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
  }
}

export default AddTaskScreen;