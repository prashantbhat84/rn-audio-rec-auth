import React, { useState, useRef } from "react";
import Firebase from "../config/Firebase";

import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";

const ForgotPassword = props => {
  const [email, setEmail] = useState("");

  emailSend = email => {
    Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch(error => {
        Alert.alert(
          "Caution!!!",
          "This E-mail account does not exist Please Signup"
        );

        props.navigation.navigate("Signup");
      });
  };
  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.inputBox}
        onChangeText={email => setEmail(email)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TouchableOpacity style={Styles.button} onPress={() => emailSend(email)}>
        <Text style={Styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCDCDC"
  },
  button: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  inputBox: {
    width: 250,
    height: 45,
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderRadius: 30,
    flexDirection: "row",
    textAlign: "center",
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    marginTop: 20
  }
});
export default ForgotPassword;
