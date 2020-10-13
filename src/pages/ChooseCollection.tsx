import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const ChooseCollection = ({ navigation }: any) => {
  return (
    <SafeAreaView style={myStyles.container}>
      <Text>
        Loads of collections here. Click to choose which collection to add item
        in.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("NewItem")}>
        <Text>Click here</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChooseCollection;
