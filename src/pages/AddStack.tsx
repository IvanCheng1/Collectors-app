import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AddQuestion from "./AddQuestion";
import NewCollection from "./NewCollection";
import ChooseCollection from "./ChooseCollection";
import NewItem from "./NewItem";

export type AddStackParamList = {
  AddQuestion: undefined;
  NewCollection: undefined;
  ChooseCollection: undefined;
  NewItem: { id: string; collection: string };
};

const Stack = createStackNavigator<AddStackParamList>();

const AddStack = () => {
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
        name="AddQuestion"
        component={AddQuestion}
        options={{
          title: "Add",
        }}
      />
      <Stack.Screen
        name="NewCollection"
        component={NewCollection}
        options={{
          title: "New Collection",
        }}
      />
      <Stack.Screen
        name="ChooseCollection"
        component={ChooseCollection}
        options={{
          title: "Choose Collection",
        }}
      />
      <Stack.Screen
        name="NewItem"
        component={NewItem}
        options={{
          title: "New Item",
        }}
      />
    </Stack.Navigator>
  );
};

export default AddStack;
