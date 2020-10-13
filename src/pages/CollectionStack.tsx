import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Collections from "./Collections";
import Items from "./Items";
import Item from "./Item";

const Stack = createStackNavigator();

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
        options={{
          title: "Items",
        }}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        // options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default CollectionStack;
