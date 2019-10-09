import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
        paddingTop: 50,
    },
    icon: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 22,
        color: "#5F6D7A"
    },
    description: {
        marginTop: 20,
        textAlign: 'center',
        color: "#A9A9A9",
        fontSize: 16,
        margin: 40,
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#3498db",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 20,
    }
});