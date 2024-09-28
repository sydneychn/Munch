import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { auth } from "./src/service/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

const App = () => {
  const Tab = createBottomTabNavigator();
  const [user] = useAuthState(auth);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {user ? (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Tab.Screen name="Register" component={Register} />
            <Tab.Screen name="Login" component={Login} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
