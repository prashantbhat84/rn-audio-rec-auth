import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Profile from "../screens/Profile";
import ForgotPassword from "../screens/ForgotPassword";
import Screen1 from "../screens/Screen1";
import Screen2 from "../screens/Screen2";
import Screen3 from "../screens/Screen3";
import Screen4 from "../screens/Screen4";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

//tab navigator code
const tabs = createMaterialTopTabNavigator(
  {
    tab1: {
      screen: Screen1,
      navigationOptions: {
        swipeEnabled: true,

        tabBarIcon: tabInfo => {
          return (
            <FontAwesome name="home" size={25} color={tabInfo.tintColor} />
          );
        }
      }
    },
    tab2: {
      screen: Screen2,
      navigationOptions: {
        swipeEnabled: true,
        tabBarIcon: tabInfo => {
          return (
            <MaterialCommunityIcons
              name="account-group"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        }
      }
    },
    tab3: {
      screen: Screen3,
      navigationOptions: {
        swipeEnabled: true,
        tabBarIcon: tabInfo => {
          return (
            <MaterialCommunityIcons
              name="account-circle"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        }
      }
    },
    tab4: {
      screen: Screen4,
      navigationOptions: {
        swipeEnabled: true,
        tabBarIcon: tabInfo => {
          return (
            <Ionicons
              name="md-notifications"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "rgb(0,255,0)",
      showIcon: true,
      showLabel: false
    }
  }
);

const switchNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: Signup
  },
  Forgot: {
    screen: ForgotPassword
  },

  Profile: {
    screen: tabs // replace profile with tabs
  }
});
export default createAppContainer(switchNavigator);
