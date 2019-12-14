import React from "react";
import Firebase from "../config/Firebase";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Alert,
  TouchableHighlight
} from "react-native";

import uuid from "uuid/v1";
class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  componentDidMount() {
    console.log(uuid());
  }
  handleLogin = () => {
    const { email, password } = this.state;
    if (email === "" || password === "") {
      Alert.alert(
        "Message",
        "One or more Fields is blank. Please fill all fields"
      );
    } else {
      Firebase.auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then(user => {
          //console.log(user.user.uid);
          console.log(user);

          this.props.navigation.navigate("Profile");
        })
        .catch(error => {
          let { code } = error;
          if (code === "auth/wrong-password") {
            Alert.alert("Error", "Wrong Password");
          }
          if (code === "auth/user-not-found") {
            Alert.alert("Alert", "This user does not exist.");
          }
          if (code === "auth/user-disabled") {
            Alert.alert(
              "Info",
              "Your account has been suspended .Please email at hyperinfinite2019@gmail.com for more information"
            );
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Signup")}
        >
          <Text>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Forgot")}
        >
          <Text>Forgot your password?</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCDCDC"
  },
  inputBox: {
    width: 250,
    height: 45,
    margin: 10,
    padding: 15,
    fontSize: 16,

    flexDirection: "row",
    textAlign: "center",
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF"
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  buttonSignup: {
    fontSize: 12
  },
  forgotpassword: {
    marginTop: 20
  }
});

export default Login;
