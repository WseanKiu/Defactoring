import React, { Component } from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    Text,
    View,
    Modal,
    WebView,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import DlgtdLogo from "../assets/logo/DlgtdLogo";
import styles from '../components/styles/ProfileStyle';
import styles2 from "../components/styles/style";
import formsStyle from '../components/styles/formsStyle';
import { Avatar } from "react-native-elements";
import { fetchData } from '../helpers/FetchData';
import BtnStyle4 from '../components/BtnStyle4';
import { getUserInfoUrl, server_ip, sendFeedbackUrl } from '../constants';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            user_id: "",
            user_code: "",
            user_fname: "",
            user_lname: "",
            user_email: "",
            user_contacts: "",
            user_address: "",
            user_bdate: "",
            user_premium: false,
            exp_date: "",
            showModal: false,
            status: "Pending",
            showFeedback: false,
            content: "",
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon style={styles2.navLeftItem} name="menu" size={25} />
                </TouchableOpacity>
            ),
            headerTitle: (
                <TouchableOpacity
                    onPress={() => navigation.navigate("AuthScreen")}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <DlgtdLogo />
                    <Text>DLGTD</Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={styles2.rightNav}>
                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                        <Icon style={styles2.navItem} name="notifications" size={25} />
                    </TouchableOpacity>
                </View>
            )
        };
    };

    componentWillMount() {
        this._getAsyncData();
    }

    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        const user_code = await AsyncStorage.getItem("user_code");
        this.setState({
            user_id: user_id,
            user_code: user_code
        });

        const url = server_ip + getUserInfoUrl;

        let content = JSON.stringify({
            user_id: this.state.user_id
        });

        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    user_fname: responseJson.items[0].user_fname,
                    user_lname: responseJson.items[0].user_lname,
                    user_email: responseJson.items[0].user_email,
                    user_contacts: responseJson.items[0].user_contacts,
                    user_bdate: responseJson.items[0].user_bdate,
                    user_premium: responseJson.items[0].premium,
                    isLoading: false
                });
            })
            .catch(error => {
                alert(error + url);
            });
    };

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
            this.subscribeUser();
            this.props.navigation.navigate('ThankYou');
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    sendFeedBack() {
        const url = server_ip + sendFeedbackUrl;

        let content = JSON.stringify({
            user_id: this.state.user_id,
            content: this.state.content
        });

        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
            })
            .catch(error => {
                alert(error + url);
            });

        this.setState({
            showFeedback: false
        });

    }

    subscribeUser() {
        const url = server_ip + getUserInfoUrl;

        let content = JSON.stringify({ user_id: this.state.user_id });
        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
            })
            .catch(error => {
                alert(error + url);
            });
    }

    render() {
        return (this.state.isLoading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000000" animating />
            </View>
            :
            <ScrollView>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        source={{ uri: server_ip + ":3000" }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={`document.getElementById('price').value="123";document.f1.submit()`}
                    />
                </Modal>
                <Modal
                    visible={this.state.showFeedback}
                    onRequestClose={() => this.setState({ showFeedback: false })}
                >
                    <View style={styles2.modalContainer}>
                        <View style={styles2.modalHeader}>
                            <Text style={styles2.modalTitle}>Create feedback</Text>
                        </View>
                        <View style={styles2.modalBody}>
                            <TextInput
                                onChangeText={(content) => this.setState({ content })}
                                value={this.state.content}
                                style={formsStyle.md_textInput_header}
                                placeholder="Message..." />
                        </View>
                        <View style={styles2.modalTabs}>
                            <TouchableOpacity
                                onPress={() => this.setState({ showFeedback: false })}
                                style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.sendFeedBack.bind(this)}
                                style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Avatar
                                rounded
                                size={130}
                                title={this.state.user_fname.charAt(0)}
                                onPress={() => console.log("Works!")}
                                containerStyle={{
                                    width: 130,
                                    height: 130,
                                    borderRadius: 63,
                                    borderWidth: 4,
                                    borderColor: "white",
                                    marginBottom: 10,
                                }}
                                showEditButton
                            />
                            <Text style={styles.name}>
                                {this.state.user_fname} {this.state.user_lname}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.info}>Usercode: {this.state.user_code}</Text>
                            <Text style={styles.description}>Email: {this.state.user_email}</Text>
                            <Text style={styles.description}>Contact number: {this.state.user_contacts}</Text>
                            <Text style={styles.description}>Birthdate: {this.state.user_bdate}</Text>

                            <BtnStyle4
                                text={"Edit profile"}
                                btnPress={() => this.props.navigation.navigate('EditProfile')}
                            />
                            <BtnStyle4
                                text={"Chance password"}
                                btnPress={() => this.props.navigation.navigate('ChangePassword')}
                            />
                            {
                                !this.state.user_premium ?
                                    <BtnStyle4
                                        text={"Subscribe to premium!"}
                                        btnPress={() => this.props.navigation.navigate('Subscription')}
                                    />
                                    : null
                            }
                            <BtnStyle4
                                text={"Create feedback"}
                                btnPress={() => this.setState({ showFeedback: true })}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}