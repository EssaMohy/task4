import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import COLORS from "./constants/colors";

const TodoPage = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todoText.trim() !== "") {
      setTodos([...todos, todoText]);
      setTodoText("");
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        placeholder="Add a new todo"
        value={todoText}
        onChangeText={setTodoText}
        style={styles.input}
      />
      <Button title="Add" onPress={addTodo} color={COLORS.primary} />
      {todos.map((todo, index) => (
        <View key={index} style={styles.todoItem}>
          <Text>{todo}</Text>
          <Button
            title="Remove"
            onPress={() => removeTodo(index)}
            color="red"
          />
        </View>
      ))}
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
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
});

export default TodoPage;
