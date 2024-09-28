import React, { useState } from "react";
import { Text, TextInput, Button, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("Registered user:", user);
      })
      .catch((error) => {
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
      });
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
