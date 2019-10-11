import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
} from "react-native";
import DatePicker from "react-native-datepicker";
import styles from '../components/styles/AddDailyTaskStyle';
import { fetchData2 } from '../helpers/FetchData';
import LoadingScreen from '../components/LoadingScreen';
import TxtInputStyle2 from "../components/TxtInputStyle2";
import BtnStyle2 from "../components/BtnStyle2";
import { server_ip, addDailyTaskUrl } from "../constants";

class AddTaskScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const user_id = await AsyncStorage.getItem("user_id");
    this.setState({ user_id: user_id });
  };

  componentWillUnmount() {
    this.setState({
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

  addUserTask = async () => {
    const { task_name } = this.state;
    const { task_description } = this.state;
    const { due_date } = this.state;

    const url = server_ip + addDailyTaskUrl;

    let content = JSON.stringify({
      user_id: this.state.user_id,
      task_name: task_name,
      task_description: task_description,
      time: due_date,
    });

    try {
      await fetchData2(url, content, "post");
    } catch (error) {
      alert('Please check your internet connection!');
    }
    this.props.navigation.navigate("DailyTask");
  };


  render() {
    return this.state.isLoading ? (
      <LoadingScreen />
    ) : (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <TxtInputStyle2
                title={"Task name*"}
                placeholder={"Title"}
                parent={true}
                updateVal={(val) => this.setState({ task_name: val })} />

              <TxtInputStyle2
                title={"Description"}
                placeholder={"Description"}
                parent={false}
                style={this.props.textInputChildren}
                updateVal={(val) => this.setState({ task_description: val })} />

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

            <BtnStyle2
              text={"Save"}
              btnPress={this.checkInputs} />

          </View>
        </ScrollView>
      );
  }
}

export default AddTaskScreen;

