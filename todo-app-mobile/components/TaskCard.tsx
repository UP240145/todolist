import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

interface TaskCardProps {
  id: number;
  title: string;
  description?: string;
  completed: number;
}

export default function TaskCard({
  id,
  title,
  description,
  completed,
}: TaskCardProps) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/task/[id]",
          params: { id: id.toString() },
        })
      }
      style={{
        width: "42%",
        padding: 15,
        borderWidth: 1,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#f8d7da",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16, color: "black" }}>
        {title}
      </Text>
      {description && <Text>{description}</Text>}
      <Text>Estado: {completed ? "Completada" : "Pendiente"}</Text>
    </Pressable>
  );
}
