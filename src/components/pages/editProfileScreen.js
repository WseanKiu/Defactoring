import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import styles from '../styles/EditProfileStyle';
import DatePicker from "react-native-datepicker";
import { getTasks, updateUserInfo, fetchData } from '../helpers/FetchData';
import TxtInputStyle3 from "../helpers/TxtInputStyle3";
import BtnStyle3 from "../helpers/BtnStyle3";

class SubscriptionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip_server: "",
            user_id: "",
            user_code: "",
            isLoading: false,
            f_name: "",
            l_name: "",
            user_code: "",
            email: "",
            contact: "",
            birthdate: "",
            present_date: "",
        };
        this._getAsyncData();
    }

    static navigationOptions = {
        title: "Edit info"
    };

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

    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        const server_ip = await AsyncStorage.getItem("server_ip");
        const user_code = await AsyncStorage.getItem("user_code");
        this.setState({
            ip_server: server_ip,
            user_id: user_id,
            user_code: user_code
        });

        const url =
            "http://" + this.state.ip_server + "/dlgtd/controller/getUserInfoController.php";

        let content = JSON.stringify({
            user_id: user_id
        });

        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    email: responseJson.items[0].user_email,
                    f_name: responseJson.items[0].user_fname,
                    l_name: responseJson.items[0].user_lname,
                    contact: responseJson.items[0].user_contacts,
                    birthdate: responseJson.items[0].user_bdate,
                    isLoading: false
                });
            })
            .catch(error => {
                alert(error + url);
            });
    };

    checkInputs = () => {
        if (this.state.f_name.trim().length > 0 &&
            this.state.l_name.trim().length > 0 &&
            this.state.email.trim().length > 0 &&
            this.state.contact.trim().length > 0 &&
            this.state.birthdate.trim().length > 0) {
            this.updateUser();
        } else {
            Alert.alert(
                'Oops!',
                'Please check your inputs, and try again.',
                [
                    { text: 'Okay' },
                ],
                { cancelable: false },
            );
        }
    }

    updateUser = () => {
        const { f_name } = this.state;
        const { l_name } = this.state;
        const { email } = this.state;
        const { contact } = this.state;
        const { birthdate } = this.state;

        const url = 'http://' + this.state.ip_server + '/dlgtd/controller/updateUserInfoController.php';

        let content = JSON.stringify({
            user_id: this.state.user_id,
            fname: f_name,
            lname: l_name,
            email: email,
            contact: contact,
            birthdate: birthdate
        });

        fetchData(url, content)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    alert(responseJson.msg);
                } else {
                    this.props.navigation.navigate("Profile");
                }
            })
            .catch((error) => {
                alert(error + server_ip);
            });
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TxtInputStyle3
                        title={"Firstname: "}
                        placeholder={"Firstname"}
                        hideText={false}
                        updateVal={(val) => this.setState({ f_name: val })} />

                    <TxtInputStyle3
                        title={"Lastname: "}
                        placeholder={"Lastname"}
                        hideText={false}
                        updateVal={(val) => this.setState({ l_name: val })} />

                    <TxtInputStyle3
                        title={"Email: "}
                        placeholder={"Email"}
                        hideText={false}
                        updateVal={(val) => this.setState({ email: val })} />

                    <TxtInputStyle3
                        title={"Contact#: "}
                        placeholder={"Contact number"}
                        hideText={false}
                        updateVal={(val) => this.setState({ contact: val })} />


                    <View style={[styles.inputContainer,]}>
                        <Text>Birthdate: </Text>
                        <DatePicker
                            style={{ width: 100, }}
                            date={this.state.birthdate}
                            mode="date"
                            placeholder="Birthdate"
                            format="YYYY-MM-DD"
                            androidMode="spinner"
                            showIcon={false}
                            maxDate={this.state.present_date}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    marginLeft: 18,
                                    borderColor: '#fff'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ birthdate: date }) }}
                        />
                    </View>

                    <BtnStyle3
                        text={"Save"}
                        btnPress={this.checkInputs} />
                </View>
            </ScrollView>
        );
    }
}

export default SubscriptionScreen;

