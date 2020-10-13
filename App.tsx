import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Container } from "native-base";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import AddStack from "./src/pages/AddStack";

import CollectionStack from "./src/pages/CollectionStack";
import { myStyles } from "./src/utils/myStyles";

declare const global: { HermesInternal: null | {} };

const BottomTab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <>
        <NavigationContainer>
          {/* <StatusBar barStyle="dark-content" /> */}
          <BottomTab.Navigator>
            <BottomTab.Screen
              name="Collections"
              component={CollectionStack}
              options={{
                tabBarLabel: "Collections",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="home" color={color} size={24} />
                ),
              }}
            />
            <BottomTab.Screen
              name="Add"
              component={AddStack}
              options={{
                tabBarLabel: "Add",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="plussquareo" color={color} size={24} />
                ),
              }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
