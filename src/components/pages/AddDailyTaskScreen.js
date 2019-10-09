import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";
import styles from '../styles/AddDailyTaskStyle';
import { addUserTask } from '../helpers/FetchData';
import LoadingScreen from '../helpers/LoadingScreen';

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
      dateText: "Pick a time",

    };
    this._getAsyncData();
  }

  static navigationOptions = {
    title: "Add daily task"
  };

  _getAsyncData = async () => {
    const server_ip = await AsyncStorage.getItem("server_ip");
    const user_id = await AsyncStorage.getItem("user_id");
    this.setState({ server_ip: server_ip, user_id: user_id });
  };

  componentWillUnmount() {
    this.setState({
      server_ip: "",
      user_id: "",
      task_name: "",
      task_description: "",
      isLoading: false,
      due_date: "",
      dateText: "Pick a time",

    });
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
      "/dlgtd/controller/addDailyTaskController.php";

    addUserTask(url, this.state.user_id, task_name, task_description, due_date)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          alert('Please check your internet connection!');
        }
      })
      .catch(error => {
      });
    this.props.navigation.navigate("DailyTask");
  };


  render() {
    return this.state.isLoading ? (
      <LoadingScreen/>
    ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.textLabel}>Task name*</Text>
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
              <Text style={styles.textLabel}>Add time</Text>

              <DatePicker
                style={{ width: 200 }}
                mode="time"
                date={this.state.due_date != '' ? this.state.due_date : null}
                format="HH:mm"
                is24Hour={true}
                placeholder="Select time"
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

