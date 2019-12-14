import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Firebase from "../config/Firebase";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { getProvidesAudioData } from "expo/build/AR";
const Profile = props => {
  const registerForPushNotificationsAsync = async user => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      Firebase.database()
        .ref("/users/" + user + "/push_token")
        .set(token);
    } catch (error) {
      console.log(error);
    }
  };
  const getuserData = async () => {
    let user = Firebase.auth().currentUser.uid;
    try {
      let data = await Firebase.database()
        .ref("/users/" + user)
        .once("value");
      console.log("user info");

      console.log(data.val().push_token);
      console.log(data.val().MobileNumber);
    } catch (error) {
      console.log(error);
    }
  };
  const getPaidData = async () => {
    console.log("get Paid Data");
    let user = Firebase.auth().currentUser.uid;
    console.log(user);
    try {
      let data1 = await Firebase.database()
        .ref("/paid/" + user)
        .once("value");
      console.log("Paid details");

      console.log(data1.val());
    } catch (error) {
      console.log(error);
    }

    /* try {
      let dbref = await Firebase.database().ref("paid/");
      dbref
        .orderByChild("userid")
        .equalTo(user)
        .on("child_added", data => {
          console.log(data.val().userid);
        });
    } catch (error) {
      console.log(error);
    } */
  };

  useEffect(() => {
    let user = Firebase.auth().currentUser;
    console.log(user.uid);

    console.log(user.emailVerified);
    if (user.emailVerified === false) {
      console.log("email not verified");
      user.sendEmailVerification().then(() => {
        console.log("email sent through profile");
      });
      Alert.alert(
        "Message",
        "Please Verify your account through verification link sent to your email"
      );

      Firebase.auth()
        .signOut()
        .then(() => {
          console.log("signed out");
          props.navigation.navigate("Login");
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      // registerForPushNotificationsAsync(user.uid);
      getuserData();
      //getPaidData();
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Profile;
