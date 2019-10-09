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
import Icon from 'react-native-vector-icons/MaterialIcons';

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

        // alert(this.state.ip_server);

        fetch('http://' + this.state.ip_server + '/dlgtd/controller/loginController.php', {
            // fetch('http://192.168.254.108/dlgtd/controller/loginController.php', {
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
                // console.error(error);
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
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} /> */}
                    <TextInput style={styles.inputs}
                        placeholder="username"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({ username })} />
                </View>

                <View style={styles.inputContainer}>
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} /> */}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        borderBottomColor: '#657b83',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 220,
        borderRadius: 30,
    },
    sendButton: {
        backgroundColor: "#FF4500",
    },
    buttonText: {
        color: 'white',
    }
});