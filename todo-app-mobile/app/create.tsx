import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const isValid = title.trim() && description.trim();

  const createTask = async () => {
    if (!isValid) {
      Alert.alert("Error", "Debes llenar título y descripción");
      return;
    }

    await fetch("http://192.168.1.67:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        completed: false,
      }),
    });

    router.back(); // 🔥 regresa y se actualiza solo
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Agrega una tarea
      </Text>
      <Text>Titulo:</Text>
      <TextInput
        placeholder="Título"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text>Descripcion:</Text>
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable
        style={[styles.button, { backgroundColor: isValid ? "green" : "red" }]}
        onPress={createTask}
        disabled={!isValid}
      >
        <Text style={{ color: "white" }}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
