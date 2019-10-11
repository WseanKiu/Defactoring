import React from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage,
    Image,
} from 'react-native';
import TxtInputStyle1 from '../TxtInputStyle1';
import BtnStyle1 from '../BtnStyle1';
import { loginUrl, server_ip } from '../../constants';
import {fetchData} from "../../helpers/FetchData";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            user_id: '',
            user_code: '',
        };
    }

    authLogin = () => {
        const { username } = this.state;
        const { password } = this.state;
        const url = server_ip + loginUrl;
        let content = JSON.stringify({
            username: username,
            password: password,
        });

        fetchData(url, content)
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

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/logo/dlgtd_logo1.png')} />
                <View style={styles.inputContainer}>
                    <TxtInputStyle1
                        placeholder={"Username"}
                        hideText={false}
                        updateVal={(val) => this.setState({ username: val })} />
                </View>
                <View style={styles.inputContainer}>
                    <TxtInputStyle1
                        placeholder={"Password"}
                        hideText={true}
                        updateVal={(val) => this.setState({ password: val })} />
                </View>

                <BtnStyle1
                    btnPress={this.authLogin}
                    text={"Login"} />
                    
                <BtnStyle1
                    btnPress={() => this.props.navigation.navigate("Register")}
                    text={"Register"} />
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