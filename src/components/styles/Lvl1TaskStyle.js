import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    note: {
        position: 'relative',
        padding: 10,
        paddingRight: 10,
        paddingLeft: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    noteHeader: {
        fontSize: 20,
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    noteText: {
        fontSize: 14,
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    taskDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 5,
        right: -10,
    },
    noteDeleteText: {
        color: 'white',
    },
    dueDateBadge: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        right: 10,
    },
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#eeeeee"
    },
    tasks: {
        flex: 1,
    },
    cardContent: {
        paddingTop: 5,
        marginRight: 10,
        marginLeft: 15,
        flex: 1
    },
    image: {
        width: 25,
        height: 25,
    },

    card: {
        alignItems: 'center',
        marginVertical: 5,
        paddingBottom: 15,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderLeftColor: '#e91e63',
        borderLeftWidth: 6,
    },

    title: {
        fontSize: 18,
        flex: 1,
        color: "#008080",
        fontWeight: 'bold',
    },

    description: {
        fontSize: 18,
    },
    date: {
        fontSize: 14,
        flex: 1,
        color: "#696969",
        marginTop: 5
    },
});
