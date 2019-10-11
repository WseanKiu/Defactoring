import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
} from "react-native";
import DatePicker from "react-native-datepicker";
import styles from '../components/styles/AddGroupTaskStyle';
import { fetchData, fetchData2 } from "../helpers/FetchData";
import LoadingScreen from "../components/LoadingScreen";
import TxtInputStyle2 from "../components/TxtInputStyle2";
import BtnStyle2 from "../components/BtnStyle2";
import { addTaskUrl, server_ip } from "../constants";

class AddGrouptaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    title: "Add group task"
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

    const url = server_ip + addTaskUrl;

    let content = JSON.stringify({
      user_id: this.state.user_id,
      task_name: task_name,
      task_description: task_description,
      task_dueDate: due_date,
      task_type: 'group'
    });

    this.addTask(url, content);
  };

  addTask = async (url, content) => {
    try {
      let response = await fetchData2(url, content, "post");
      let data = await response.json();
      if (data.error === false) {
        this.props.navigation.navigate("GroupTaskScreen");
      } else {
        alert(data.msg + 'AddGroupTask ni!');
      }
    } catch (error) {

    }
  }

  _getAsyncData = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    this.setState({ user_id: user_id });
  };

  render() {
    return this.state.isLoading ? (
      <LoadingScreen />
    ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <TxtInputStyle2
                title={"Project title ni"}
                placeholder="Title"
                parent={true}
                updateVal={(val) => this.setState({ task_name: val })} />
              <TxtInputStyle2
                title={"Description"}
                placeholder={"Description"}
                parent={false}
                updateVal={(val) => this.setState({ task_description: val })} />

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

            <BtnStyle2
              text={"Save"}
              btnPress={this.checkInputs} />

          </View>
        </ScrollView>
      );
  }
}

export default AddGrouptaskScreen;