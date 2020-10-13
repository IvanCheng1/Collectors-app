import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const AddQuestion = ({ navigation }: any) => {
  return (
    <SafeAreaView style={myStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("NewCollection")}>
        <Text>New Collection</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ChooseCollection")}>
        <Text>Add to Collection</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddQuestion;
