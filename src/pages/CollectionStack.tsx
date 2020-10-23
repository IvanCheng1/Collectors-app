import React, { Component, UIEventHandler } from "react";
// import { connect } from "react-redux";
import { myStyles, stackBackgroundColor } from "../utils/myStyles";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Collections from "./Collections";
import Items from "./Items";
import Item from "./Item";
import { Sort } from "../utils/types";
import EditCollection from "./EditCollection";
import EditItem from "./EditItem";
import { AntDesign } from "@expo/vector-icons";
import NewItem from "./NewItem";
import NewCollection from "./NewCollection";

export type CollectionStackParamList = {
  Collections: undefined;
  Items: { id: string; collection: string };
  Item: { id: string; title: string; collection: string; sort: Sort };
  EditCollection: { id: string };
  EditItem: { id: string };
  NewCollection: { id?: string };
  NewItem: { id?: string; collection: string };
};

const Stack = createStackNavigator<CollectionStackParamList>();

const CollectionStack = () => {
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
        name="Collections"
        component={Collections}
        options={({ navigation }) => ({
          title: "Collections",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("NewCollection")}
              style={{ paddingRight: 14 }}
            >
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Items"
        component={Items}
        options={({ route, navigation }) => ({
          title: route.params.collection,
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("NewItem", {
                  collection: route.params.collection,
                })
              }
              style={{ paddingRight: 14 }}
            >
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Item"
        component={Item}
        options={({ route, navigation }) => ({
          title: route.params.title,
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditItem", {
                  id: route.params.id,
                })
              }
              // color="#fff"
              style={{ paddingRight: 14 }}
            >
              <Text style={myStyles.btnText}>Edit</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="NewCollection"
        component={NewCollection}
        options={({ route }) => {
          const title = route.params ? "Edit Collection" : "New Collection";
          return {
            title,
          };
        }}
      />
      <Stack.Screen
        name="NewItem"
        component={NewItem}
        options={({ route }) => ({ title: route.params.collection })}
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
