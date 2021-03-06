import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles, stackBackgroundColor } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsPage from "./SettingsPage";

export type SettingsStackParamList = {
  SettingsPage: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Collections"
      screenOptions={{
        headerStyle: {
          backgroundColor: stackBackgroundColor,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="SettingsPage"
        component={SettingsPage}
        options={{
          title: "Settings",
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
