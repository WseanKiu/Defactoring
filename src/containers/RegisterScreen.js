import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    Image,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from "react-native-datepicker";
import styles from '../components/styles/RegisterStyle';
import { fetchData } from '../helpers/FetchData';
import TxtInputStyle4 from '../components/TxtInputStyle4';
import BtnStyle3 from '../components/BtnStyle3';
import { registerUserUrl, server_ip } from '../constants';

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            username: '',
            password: '',
            email: '',
            contact: '',
            user_id: '',
            present_date: '',
            birthdate: '',
        };
    }

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
        if (this.state.fname.trim().length > 0 &&
            this.state.lname.trim().length > 0 &&
            this.state.username.trim().length > 0 &&
            this.state.password.trim().length > 0 &&
            this.state.email.trim().length > 0 &&
            this.state.contact.trim().length > 0 &&
            this.state.birthdate.trim().length > 0) {
            this.Register();
        } else {
            Alert.alert(
                'Oops!',
                'Please check your inputs, all fields are required.',
                [
                    { text: 'Okay' },
                ],
                { cancelable: false },
            );
        }
    }

    Register = () => {
        const { fname } = this.state;
        const { lname } = this.state;
        const { username } = this.state;
        const { password } = this.state;
        const { email } = this.state;
        const { contact } = this.state;
        const { birthdate } = this.state;

        const url = server_ip + registerUserUrl;

        let content = JSON.stringify({
            fname: fname,
            lname: lname,
            username: username,
            password: password,
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
                    this.props.navigation.navigate("Login");
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
            <ScrollView>
                <View style={[styles.container]}>

                    <Image style={styles.logo} source={require('../assets/logo/dlgtd_logo1.png')} />

                    <TxtInputStyle4
                        placeholder={"Firstname"}
                        hideText={false}
                        updateVal={(val) => this.setState({ fname: val })} />

                    <TxtInputStyle4
                        placeholder={"Lastname"}
                        hideText={false}
                        updateVal={(val) => this.setState({ lname: val })} />

                    <TxtInputStyle4
                        placeholder={"Username"}
                        hideText={false}
                        updateVal={(val) => this.setState({ username: val })} />
                        
                    <TxtInputStyle4
                        placeholder={"Password"}
                        hideText={true}
                        updateVal={(val) => this.setState({ password: val })} />
                        
                    <TxtInputStyle4
                        placeholder={"Email"}
                        hideText={false}
                        updateVal={(val) => this.setState({ email: val })} />
                        
                    <TxtInputStyle4
                        placeholder={"Phone number"}
                        hideText={false}
                        updateVal={(val) => this.setState({ contact: val })} />

                    <View style={[styles.inputContainer,]}>
                        <DatePicker
                            style={{ width: 230, }}
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
                        text={"Register"}
                        btnPress={this.checkInputs}
                    />

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ fontSize: 12, alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="ios-arrow-back" size={18} color="#e74c3c" />
                        <Text style={{ padding: 8 }}>Back</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}