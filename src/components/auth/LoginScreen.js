import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    AsyncStorage,
    Image,
    Alert
} from 'react-native';
import styles from './../styles/loginStyle';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            user_id: '',
            ip_server: '',
            user_code: '',
        };
    }

    componentDidMount() {
        this._getAsyncData();
    }

    _getAsyncData = async () => {
        const server_ip = await AsyncStorage.getItem("server_ip");
        this.setState({
            ip_server: server_ip
        });
    };

    authLogin = () => {
        const { username } = this.state;
        const { password } = this.state;

        fetch('http://' + this.state.ip_server + '/dlgtd/controller/loginController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'applicantion/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === false) {
                    this.setState({
                        user_id: responseJson.user_id,
                        user_code: responseJson.user_code
                    });
                    this._setDataAsync();
                } else {
                    alert(responseJson.msg);
                }
            })
            .catch((error) => {
                alert(error + server_ip);
            });
    }

    _setDataAsync = async () => {
        await AsyncStorage.setItem('user_code', this.state.user_code);
        await AsyncStorage.setItem('user_id', this.state.user_id);
        await AsyncStorage.setItem('userToken', 'App');
        this.props.navigation.navigate("AuthScreen");
    };

    onClickListener = (viewId) => {
        Alert.alert("Alert", "button pressed" + viewId);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/logo/dlgtd_logo1.png')} />

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="username"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({ username })} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={this.authLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.props.navigation.navigate("Register")}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        );
    }
}