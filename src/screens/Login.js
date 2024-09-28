import React, { useState } from "react";
import { Text, TextInput, Button, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/firebase";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User logged in!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default Login;
