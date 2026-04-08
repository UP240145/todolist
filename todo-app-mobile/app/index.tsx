import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: number;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const getTasks = async () => {
    try {
      const res = await axios.get("http://${/*ip de la computadora*/}:3000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTasks();
    }, []),
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      {/* BOTÓN AGREGAR */}
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/create")}
      >
        <Text style={styles.addButtonText}>+ Nueva tarea</Text>
      </Pressable>

      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "black",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
