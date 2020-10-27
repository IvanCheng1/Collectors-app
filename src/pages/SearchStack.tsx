import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles, stackBackgroundColor } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchPage from "./SearchPage";

export type SearchStackParamList = {
  SearchPage: undefined;
};

const Stack = createStackNavigator<SearchStackParamList>();

const SearchStack = () => {
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
        name="SearchPage"
        component={SearchPage}
        options={{
          title: "Search",
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
