import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";
import { router } from "expo-router";
import firebase from "firebase/app";
import "firebase/auth";
import { Reset } from "../firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      await Reset(email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button
        title="Reset Password"
        onPress={handleResetPassword}
        color={COLORS.primary}
      />
      <Pressable onPress={() => router.replace("/account/login")}>
        <Text style={styles.link}>Login</Text>
      </Pressable>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
  },
  link: {
    marginTop: 10,
    color: COLORS.primary,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  message: {
    color: "green",
    marginTop: 10,
  },
});

export default ForgotPassword;
