import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState("");
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState("");

  function handleAddNewSkill() {
    const data: SkillData = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills([...mySkills, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting("Good afternoon");
    } else {
      setGretting("Good night");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text testID="welcome" style={styles.title}>
        Welcome, Ednan
      </Text>

      <Text style={styles.greetings}>{gretting}</Text>

      <TextInput
        testID="input-new"
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button
        testID="button-add"
        title="Add"
        onPress={handleAddNewSkill}
        activeOpacity={0.7}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      {mySkills && (
        <FlatList
          testID="flat-list-skills"
          data={mySkills}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="never"
          renderItem={({ item }) => (
            <SkillCard
              skill={item.name}
              onPress={() => handleRemoveSkill(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1f1e25",
    color: "#fff",
    fontSize: 18,
    padding: Platform.OS === "ios" ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: "#fff",
  },
});
