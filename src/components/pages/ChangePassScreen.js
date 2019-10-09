import React, { Component } from "react";
import {
    View,
    Text,
    Alert,
    TextInput,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import styles from '../styles/ChangePassStyle';

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
    };

    checkInputs = () => {

        if(this.state.password.length < 4) {
            Alert.alert(
                'Oops!',
                'Password must be atleast 4 characters.',
                [
                    { text: 'Okay' },
                ],
                { cancelable: false },
            );

            return ;
        }

        if(this.state.password != this.state.password2) {
            Alert.alert(
                'Oops!',
                'Password does not match, please try again.',
                [
                    { text: 'Okay' },
                ],
                { cancelable: false },
            );

            return ;
        }

        this.updateUser();
    }

    updateUser = () => {
        const url =
        "http://" + this.state.ip_server + "/dlgtd/controller/changePasswordController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                new_pass: this.state.password2
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            if(responseJson.error) {
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
                    <View style={styles.inputContainer}>
                        <Text>New password: </Text>
                        <TextInput style={styles.inputs}
                        placeholder="Enter here"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text>Confirm password: </Text>
                        <TextInput style={styles.inputs}
                        placeholder="retype password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password2) => this.setState({ password2 })} />
                    </View>

                    <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={this.checkInputs}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default ChangePassScreen;