import { StyleSheet } from "react-native";

export default StyleSheet.create({
  formContainer: {
    flex: 1,
    alignContent: "center",
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 20,
    paddingRight: 20,
    // backgroundColor: "#1B811B",
    backgroundColor: "#1D77D4",
  },
  textHeader: {
    fontSize: 31,
    color: "#ffffff"
  },
  textSub: {
    fontSize: 18,
    marginBottom: 10,
    color: "#ffffff"
  },
  textLabel: {
    fontSize: 14,
    color: "#ffffff"
  },
  row2style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#ffffff"
  },
  textInput: {
    borderColor: "#ffffff",
    color: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 25,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  textInputChildren: {
    borderColor: "#ffffff",
    color: "#ffffff",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#007bff",
    borderRadius: 50,
    padding: 15,
    marginTop: 15
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center"
  },

  // Modal add subtask style
  
  md_textInput_header: {
    borderColor: "#000",
    color: "#000",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  md_textInput_children: {
    borderColor: "#000",
    color: "#000",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
});
