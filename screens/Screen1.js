import React, { useEffect, useState } from "react";
import Firebase from "../config/Firebase";

import { View, StyleSheet, Alert, Text } from "react-native";
import { Avatar, Button, ListItem, Card } from "react-native-elements";
import { Entypo, AntDesign } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import uuid from "uuid/v1";

import { Audio } from "expo-av";

const screen1 = props => {
  const [isRecording, setIsRecording] = useState(false);
  const [param, setParam] = useState({ volume: 1.0, rate: 1.0 });

  const getuserData = async () => {
    let user = Firebase.auth().currentUser.uid;
    try {
      let data = await Firebase.database()
        .ref("/users/" + user)
        .once("value");
      console.log("user info");
      return data.val();

      /* console.log(data.val());
      console.log(user); */
    } catch (error) {
      console.log(error);
    }
  };
  const recordAudio = async () => {
    if (isRecording) {
      //permissions
      const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      if (response.status !== "granted") return;
      const recordingOptions = {
        // android not currently in use, but parameters are required
        android: {
          extension: ".m4a",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000
        },
        ios: {
          extension: ".wav",
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false
        }
      };
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
        staysActiveInBackground: true
      });
      const recording = new Audio.Recording();
      try {
        await recording.prepareToRecordAsync(recordingOptions);
        await recording.startAsync();
        setTimeout(() => {
          console.log("closing rec");
          Alert.alert("Info", "record complete");
          setIsRecording(prevState => !prevState);
          recording.stopAndUnloadAsync();
          FileSystem.getInfoAsync(recording.getURI()).then(info => {
            console.log(`FILE INFO: ${JSON.stringify(info)}`);

            let user = Firebase.auth().currentUser.uid;
            let rec = info.uri;
            let no = uuid();
            Firebase.database()
              .ref("/audio_rec/" + user + "/" + no)
              .set({
                UserID: user,
                record: rec
              });
          });
        }, 5000);
        getuserData();
      } catch (error) {
        console.log(error);
        recording.stopAndUnloadAsync();
        return;
      }
    }
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
  useEffect(() => {
    recordAudio();
  }, [isRecording]);
  return (
    <View style={styles.screen}>
      <View style={styles.row1}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: "https://mumbaimirror.indiatimes.com/thumb/65825616.cms"
          }}
        />
        <Button
          icon={<Entypo name="mic" size={15} />}
          title="Record Audio"
          onPress={() => {
            setIsRecording(prevState => !prevState);
            //recordAudio();

            // Alert.alert("Info", "Audio recorded");
          }}
        />
        <Text style={{ color: "red" }}>{isRecording ? "LIVE" : ""}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  row1: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginLeft: -30
  }
});

export default screen1;
