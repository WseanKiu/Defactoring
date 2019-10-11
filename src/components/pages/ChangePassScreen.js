import React, { Component } from "react";
import {
    View,
    Alert,
    ScrollView,
    AsyncStorage,
} from "react-native";
import styles from '../styles/ChangePassStyle';
import { fetchData } from "../helpers/FetchData";
import TxtInputStyle3 from "../helpers/TxtInputStyle3";
import BtnStyle3 from "../helpers/BtnStyle3";

class ChangePassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip_server: "",
            user_id: "",
            user_code: "",
            password: "",
            password2: "",
        };
        this._getAsyncData();
    }

    static navigationOptions = {
        title: "Change password"
    };

    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        const server_ip = await AsyncStorage.getItem("server_ip");
        const user_code = await AsyncStorage.getItem("user_code");
        this.setState({
            ip_server: server_ip,
            user_id: user_id,
            user_code: user_code
        });
    };

    checkInputs = () => {

        if (this.state.password.length < 4) {
            Alert.alert(
                'Oops!',
                'Password must be atleast 4 characters.',
                [
                    { text: 'Okay' },
                ],
                { cancelable: false },
            );

            return;
        }

        if (this.state.password != this.state.password2) {
            Alert.alert(
                'Oops!',
                'Password does not match, please try again.',
                [
                    { text: 'Okay' },
                ],
                { cancelable: false },
            );

            return;
        }

        this.updateUser();
    }

    updateUser = () => {
        const url =
            "http://" + this.state.ip_server + "/dlgtd/controller/changePasswordController.php";

        let content = JSON.stringify({
            user_id: this.state.user_id,
            new_pass: this.state.password2
        });

        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    Alert.alert(
                        'Please try again',
                        'Something went wrong, please try again.',
                        [
                            { text: 'Okay' },
                        ],
                        { cancelable: false },
                    );
                } else {
                    this.props.navigation.navigate("Profile");
                }
            })
            .catch(error => {
                alert(error + url);
            });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <TxtInputStyle3
                        title={"New password: "}
                        placeholder={"Enter password"}
                        hideText={true}
                        updateVal={(val) => this.setState({ password: val })} />
                    
                    <TxtInputStyle3
                        title={"Confirm password: "}
                        placeholder={"Retype password"}
                        hideText={true}
                        updateVal={(val) => this.setState({ password2: val })} />

                    <BtnStyle3
                        text={"Save"}
                        btnPress={this.checkInputs}
                         />
                </View>
            </ScrollView>
        );
    }
}

export default ChangePassScreen;