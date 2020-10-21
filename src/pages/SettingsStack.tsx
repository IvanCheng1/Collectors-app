import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AddQuestion from "./AddQuestion";
import NewCollection from "./NewCollection";
import ChooseCollection from "./ChooseCollection";
import NewItem from "./NewItem";
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
          backgroundColor: "#f4511e",
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
