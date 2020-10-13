import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Collections = ({navigation}:any) => {
  return (
    <SafeAreaView style={myStyles.container}>
      <Text>Spaceholder for Searchbar</Text>
      <Text>Collections here</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Items")}>
        <Text>Click to go to items page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Collections;
