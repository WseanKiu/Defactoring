import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    WebView,
    FlatList,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import { fetchData } from "../helpers/FetchData";
import LoadingScreen from "../components/LoadingScreen";
import { server_ip, getPaymentTypeUrl, paypalFormUrl } from "../constants";

class SubscriptionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: "",
            isLoading: true,
            showModal: false,
            status: "Pending",
            payments: [],
            price: "",
            payment_id: "",
        };
        this._getAsyncData();
    }

    static navigationOptions = {
        title: "Subscription type(s)"
    };

    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        this.setState({ user_id: user_id });

        const url = server_ip + getPaymentTypeUrl;

        let content = JSON.stringify({});

        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    payments: responseJson.items,
                    isLoading: false
                });
            })
            .catch(error => { });
    };

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
            this.addPayment();
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    addPayment = () => {
        const url =
            "/dlgtd/controller/addPaymentController.php";

        let content = JSON.stringify({
            id: this.state.payment_id,
            user_id: this.state.user_id
        });

        fetchData(url, content)
            .then(response => response.json())
            .then(responseJson => {
            })
            .catch(error => {
            });

        this.props.navigation.navigate('ThankYou');
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        price: item.subscription_price,
                        showModal: true,
                        payment_id: item.id
                    })
                }}
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10
                }}>

                <View style={{ flex: 1, alignContent: "center" }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 20, color: "#d35400" }}>{item.subs_type}</Text>
                            <Text style={{ fontSize: 18, color: "#008a00" }}>Months {item.subs_duration}</Text>
                        </View>
                        <Text style={{ fontSize: 25, color: "#586e75", textAlign: 'right', flex: 1 }}>USD {item.subscription_price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: '#95a5a6' }} />
        );
    };

    render() {
        return this.state.isLoading ? (
            <LoadingScreen />
        ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <Modal
                            visible={this.state.showModal}
                            onRequestClose={() => this.setState({ showModal: false })}
                        >
                            <WebView
                                source={{ uri: server_ip + paypalFormUrl }}
                                onNavigationStateChange={data =>
                                    this.handleResponse(data)
                                }
                                injectedJavaScript={`document.getElementById('price').value="` + this.state.price + `";document.f1.submit()`}
                            />
                        </Modal>
                        <FlatList
                            data={this.state.payments}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                    </View>
                </ScrollView>
            );
    }
}

export default SubscriptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }
});