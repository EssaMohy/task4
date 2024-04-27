import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { logout } from "./firebase/auth";
import { router } from "expo-router";
import { auth, db } from "./firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const Header = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userSnapshot = await getDocs(
          query(
            collection(db, "users"),
            where("uid", "!=", auth.currentUser.uid)
          )
        );
        const userData = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handlePress = async () => {
    try {
      await logout();
      router.replace("/account/login");
    } catch (error) {
      console.log("Logout Error:", error);
      setError(error.message);
    }
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push("/chat/chatRoom")}
      style={styles.messageContainer}
    >
      <Text style={styles.sender}>{item.name}</Text>
      {/* You can display other user information here */}
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>ChatApp</Text>
        <Button title="Logout" onPress={handlePress} color="red" />
      </View>
      <FlatList
        data={users}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#075E54",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#128C7E",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: "flex-end", // To show the latest message at the bottom
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
  },
});

export default Header;
