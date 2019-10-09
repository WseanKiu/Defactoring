import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    // HEADER
    navLeftItem: {
        marginLeft: 15
    },
    rightNav: {
        flexDirection: 'row'
    },
    navItem: {
        marginRight: 15
    },

    //BODY
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1",
        // alignItems: 'center',
        // alignContent: 'center',
    },    
    scrollContainer: {
        flex: 1,
    },

    // NOTIFICATION
    notifBackground: {
        backgroundColor: '#DCDCDC',
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    notifContainer: {
        padding:10,
        marginTop: 5,
        paddingTop: 18,
        marginBottom:5,
        backgroundColor: '#FFFFFF',
        borderRadius:10,
    },
    notifTabs: {
        paddingTop: 5,
        flexDirection: 'row',
        paddingBottom: 5
    },

    notifText: {
        color: '#2c3e50',
        fontSize: 15,
        maxWidth: 280
    },

    notifBtnAccept: {
        borderRadius: 10,
        backgroundColor: '#007aff',
        // borderWidth: 2,
        // borderColor: '#34aadc',
        padding: 10,
        margin: 5,
    },
    notifBtnDecline: {
        borderRadius: 10,
        backgroundColor: '#7f8c8d',
        padding: 10,
        margin: 5,
        // borderWidth: 2,
        // borderColor: '#ff5722'
    },

    // TASK
    taskContainer: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
    },
    taskHeader: {
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    taskBody: {
        fontSize: 13,
    },
    // ADDBUTTON
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#e91e63',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: '200',
    },

    //MODAL
    modalContainer: {
        alignContent: "center",
        backgroundColor: "#fff",
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        borderRadius: 10,
    },
    modalHeader: {
        alignItems: "center",
    },
    modalBody: {
        paddingTop: 20,
    },
    modalTitle: {
        color: "#000",
        fontSize: 20,
        alignItems: 'center'
    },
    modalTabs: {
        paddingTop: 20,
        flexDirection: 'row',
    },
    modalTextInput: {
        borderColor: "#000",
        color: "#000",
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 23,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },

    // task list
    dueDateBadge: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        right: 10,
    },

    noteContainer: {
        flex: 1,
        // width: '1%',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#ecf0f1',
    },
    cont_box1: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 50
    },
    cont_textbox: {
        flex: 5,
        // width: 100,
        alignSelf: 'stretch'
    },
    cont_box2: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1
        // width: 50
    },
    noteHeader: {
        fontSize: 20,
        // textDecorationLine: 'line-through'
    },
    noteText: {
        fontSize: 14,
    },
    dueDateBadge: {
        alignSelf: 'flex-start',
    },
    dueDateStyle: {
        backgroundColor: '#e67e22',
        color: '#fff',
        fontSize: 11,
        borderRadius: 40,
        paddingLeft: 4,
        paddingRight: 4,
        marginTop:3,
        marginBottom: 3,
    },


    note: {
        position: 'relative',
        padding: 10,
        paddingRight: 10,
        paddingLeft: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },

    // delete
    deleteTaskButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

    // prioritize button: 
    prioritizeButton: {
        position: 'absolute',
        top: 10,
        left: 20,   
    }
});