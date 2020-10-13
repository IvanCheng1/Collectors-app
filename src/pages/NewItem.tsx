import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";


const NewItem = () => {
  return (
    <SafeAreaView style={myStyles.container}>
      <Text>New Item Page</Text>
    </SafeAreaView>
  );
};

export default NewItem;
