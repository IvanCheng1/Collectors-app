import React, { Component } from "react";
// import { connect } from "react-redux";
import { myStyles } from "../utils/myStyles";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const SearchPage = ({ navigation }: any) => {
  return (
    <SafeAreaView style={myStyles.container}>
      <TouchableOpacity
        style={myStyles.btn}
        onPress={() =>
          navigation.navigate("Items", {
            id: "_95scyqx24rb",
            collection: "Pins",
          })
        }
      >
        <Text style={myStyles.btnText}>Pins</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchPage;
