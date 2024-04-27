import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), text: inputText },
    ]);
    setInputText("");
  };

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat Room</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messageList}
        inverted // To display messages from bottom to top
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#075E54",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  messageContainer: {
    backgroundColor: "#DCF8C6",
    borderRadius: 8,
    maxWidth: "70%",
    padding: 10,
    marginVertical: 5,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  messageList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#128C7E",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatRoom;
