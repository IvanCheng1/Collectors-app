import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, View } from "react-native";

const NewCollection = () => {
  return (
    <SafeAreaView style={myStyles.container}>
      <Text>New Collection page</Text>
    </SafeAreaView>
  );
};

export default NewCollection;
