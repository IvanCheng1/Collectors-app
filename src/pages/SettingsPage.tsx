import React from "react";
import { Text, View } from "react-native";
import { myStyles } from "../utils/myStyles";

const SettingsPage = () => {
  return (
    <View style={myStyles.container}>
      <Text>Settings page</Text>
      <Text>collections sort</Text>
      <Text>items sort</Text>
      <Text>default collection???</Text>
    </View>
  );
};

export default SettingsPage;
