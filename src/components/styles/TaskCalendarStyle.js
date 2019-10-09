import {StyleSheet} from 'react-native';

export default StyleSheet.create({
container: {
    backgroundColor: "#DCDCDC",
    flex: 1
},
eventList: {
    marginTop: 0,
},
eventBox: {
    padding: 10,
    marginTop: 5,
    marginBottom: 0,
    flexDirection: 'row',
},
eventDate: {
    flexDirection: 'column',
},
eventDay: {
    fontSize: 50,
    color: "#0099FF",
    fontWeight: "600",
},
eventMonth: {
    fontSize: 16,
    color: "#0099FF",
    fontWeight: "600",
},
eventContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10
},
description: {
    fontSize: 15,
    color: "#646464",
},
eventTime: {
    fontSize: 18,
    color: "#151515",
},
userName: {
    fontSize: 16,
    color: "#646464",
},
taskTitle: {
    fontSize: 23,
    color: "#646464",
}
});