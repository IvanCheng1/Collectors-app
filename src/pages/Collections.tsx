import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { collectionInitialState } from "../store/initialStates/collectionInitialState";
// import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Collections = ({ navigation }: any) => {
  const collections = collectionInitialState;
  return (
    <SafeAreaView style={myStyles.container}>
      <Text>Spaceholder for Searchbar</Text>
      <Text>Collections here</Text>
      {collections &&
        collections.map((c) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Items")}
            key={c.name}
          >
            <Text>{c.name}</Text>
          </TouchableOpacity>
        ))}
    </SafeAreaView>
  );
};

export default Collections;
