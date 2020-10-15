import React, { Component, UIEventHandler } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Collections from "./Collections";
import Items from "./Items";
import Item from "./Item";
import { Sort } from "../utils/types";
import EditCollection from "./EditCollection";
import EditItem from "./EditItem";

export type CollectionStackParamList = {
  Collections: undefined;
  Items: { id: string; collection: string };
  Item: { id: string; title: string; collection: string; sort: Sort };
  EditCollection: { id: string };
  EditItem: { id: string, };
};

const Stack = createStackNavigator<CollectionStackParamList>();

const CollectionStack = () => {
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
      <Stack.Screen
        name="EditCollection"
        component={EditCollection}
        // options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
        // options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

export default CollectionStack;
