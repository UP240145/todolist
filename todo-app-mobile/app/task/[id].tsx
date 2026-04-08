import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function TaskDetail() {
  const { id } = useLocalSearchParams();

  const [task, setTask] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (id) {
      getTask();
    }
  }, [id]);

  const getTask = async () => {
    try {
      const response = await fetch(`http:${/*ip de la computadora*/}:3000/tasks/${id}`);
      const data = await response.json();

      setTask(data);

      // llenar form automáticamente
      setTitle(data.title);
      setDescription(data.description);
      setCompleted(data.completed === 1);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    await fetch(`http://${/*ip de la computadora*/}:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        completed,
      }),
    });

    alert("Tarea actualizada");
    router.back();
  };

  const deleteTask = async () => {
    await fetch(`${/*ip de la computadora*/}:3000/tasks/${id}`, {
      method: "DELETE",
    });
    alert("Tarea eliminada");
    router.back();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Descripcion de la tarea</Text>
        <Text>Puedes editar la tarea desde esta pantalla</Text>

        {task && (
          <>
            {/* FORMULARIO */}
            <Text>Titulo:</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Título"
              style={styles.input}
            />

            <Text>Descripcion:</Text>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Descripción"
              style={styles.input}
            />

            <Text style={{ marginTop: 10 }}>Completada</Text>
            <Switch value={completed} onValueChange={setCompleted} />

            {/* BOTÓN ACTUALIZAR */}
            <Pressable style={styles.updateButton} onPress={updateTask}>
              <Text style={styles.buttonText}>Actualizar</Text>
            </Pressable>

            {/* BOTÓN ELIMINAR */}
            <Pressable style={styles.deleteButton} onPress={deleteTask}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
