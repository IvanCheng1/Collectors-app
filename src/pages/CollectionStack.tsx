import React, { Component, UIEventHandler } from "react";
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
import { Sort, Sort2 } from "../utils/types";
import { AntDesign } from "@expo/vector-icons";
import NewItem from "./NewItem";
import NewCollection from "./NewCollection";

export type CollectionStackParamList = {
  Collections: undefined;
  Items: { id: string; collection: string };
  Item: { id: string; title: string; collection: string; sort: Sort2 };
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
                navigation.navigate("NewItem", {
                  id: route.params.id,
                  collection: route.params.collection,
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
          const title = route.params?.id ? "Edit Collection" : "New Collection";
          return {
            title,
          };
        }}
      />
      <Stack.Screen
        name="NewItem"
        component={NewItem}
        options={({ route }) => {
          const title = route.params.id ? "Edit Item" : "New Item";
          return {
            title,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default CollectionStack;
