import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Container } from "native-base";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import { myStyles } from "../utils/myStyles";

export default class Item extends React.Component {
  render() {
    return (
      <SafeAreaView style={myStyles.container}>
        <Text>Item Page</Text>
      </SafeAreaView>
    );
  }
}
