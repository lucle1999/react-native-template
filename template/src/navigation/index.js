import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

const Home = () => (
  <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
    <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}>
      Welcome to LucLe's React Native Boilerplate!
    </Text>
  </View>
);

const Notifications = () => (
  <View>
    <Text>Notifications</Text>
  </View>
);

const Profile = () => (
  <View>
    <Text>Profile</Text>
  </View>
);

const Settings = () => (
  <View>
    <Text>Settings</Text>
  </View>
);

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
