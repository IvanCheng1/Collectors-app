import React, { Component, UIEventHandler } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Collections from "./Collections";
import Items from "./Items";
import Item from "./Item";

export type RootStackParamList = {
  Collections: undefined;
  Items: { id: string; collection: string };
  Item: { title: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const CollectionStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Collections"
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
        name="Collections"
        component={Collections}
        options={{
          title: "Collections",
        }}
      />
      <Stack.Screen
        name="Items"
        component={Items}
        options={({ route }) => ({ title: route.params.collection })}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

export default CollectionStack;
