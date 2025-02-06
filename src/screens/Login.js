import React, { useState } from "react";
import { Text, TextInput, Button, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, Firestore } from "firebase/firestore";
import { auth } from "../service/firebase";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firestore = getFirestore();
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        const user = userCredential.user;

        const userId = user.uid;//userid of logged in user

        const userDocRef = doc(firestore, 'users', userId);
        console.log('User logged in!');
        try {
          // Create a user document in Firestore (if it doesn't already exist)
          await setDoc(userDocRef, {
            email: user.email,
            name: user.displayName || 'Default Name', // You can collect name during sign-up or update later
            createdAt: new Date(),
          }, { merge: true }); // merge: true will update the document if it already exists

          console.log('User logged in and document created/updated!');
        } catch (error) {
          console.error('Error creating user document:', error);
        }
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
