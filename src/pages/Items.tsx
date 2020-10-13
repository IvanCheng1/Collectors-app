import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";


const Items = ({ navigation }: any) => {
  return (
    <SafeAreaView style={myStyles.container}>
      <Text>Items here</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Item")}>
        <Text>Click</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Items;
