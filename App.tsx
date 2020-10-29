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
  Settings,
} from "react-native";
import { Provider } from "react-redux";

import CollectionStack from "./src/pages/CollectionStack";
import SettingsStack from "./src/pages/SettingsStack";
import { store } from "./src/store";
import {
  fifthColor,
  mainColor,
  myStyles,
  paleColor,
  secondColor,
  stackBackgroundColor,
  thirdColor,
} from "./src/utils/myStyles";
import SearchStack from "./src/pages/SearchStack";

// declare const global: { HermesInternal: null | {} };

export type BottomTabParamList = {
  Collections: undefined;
  Search: undefined;
  Settings: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {/* <StatusBar barStyle="dark-content" /> */}
          <BottomTab.Navigator
            tabBarOptions={{
              activeTintColor: paleColor,
              inactiveTintColor: fifthColor,
            }}
          >
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
              name="Search"
              component={SearchStack}
              options={{
                tabBarLabel: "Search",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="search1" color={color} size={24} />
                ),
              }}
            />
            {/* <BottomTab.Screen
              name="Settings"
              component={SettingsStack}
              options={{
                tabBarLabel: "Settings",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="setting" color={color} size={24} />
                ),
              }}
            /> */}
          </BottomTab.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
