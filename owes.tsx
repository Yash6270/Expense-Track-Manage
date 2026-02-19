import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { youOwe, otherOwe } from "./expenses";

export default function Owes() {
  const router = useRouter();
  const { type, id } = useLocalSearchParams();

  const [youNameTitle, setYouNameTitle] = useState("");
  const [youOweAmount, setYouOweAmount] = useState("");
  const [otherNameTitle, setOtherNameTitle] = useState("");
  const [otherOweAmount, setOtherOweAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!type || !id) return;

    const itemId = Number(id);

    if (type === "youOwe") {
      const item = youOwe.find((e) => e.id === itemId);
      if (item) {
        setYouNameTitle(item.name);
        setYouOweAmount(String(item.amount));
        setIsEditing(true);
      }
    } else if (type === "otherOwe") {
      const item = otherOwe.find((e) => e.id === itemId);
      if (item) {
        setOtherNameTitle(item.name);
        setOtherOweAmount(String(item.amount));
        setIsEditing(true);
      }
    }
  }, [id, type]);

  const addOrUpdateOwes = () => {

    if (type === "youOwe" && (!youNameTitle || !youOweAmount)) {
      Alert.alert("Error", "Fill all fields");
      return;
    }
    if (type === "otherOwe" && (!otherNameTitle || !otherOweAmount)) {
      Alert.alert("Error", "Fill all fields");
      return;
    }


    if (isEditing && type === "youOwe") {                                  {/* adding or updating you owe*/}
      const index = youOwe.findIndex((e) => e.id === Number(id));
      if (index !== -1) {
        youOwe[index] = {
          ...youOwe[index],
          name: youNameTitle,
          amount: Number(youOweAmount),
        };
      }
    } else if (isEditing && type === "otherOwe") {
      const index = otherOwe.findIndex((e) => e.id === Number(id));
      if (index !== -1) {
        otherOwe[index] = {
          ...otherOwe[index],
          name: otherNameTitle,
          amount: Number(otherOweAmount),
        };
      }
    } else if (type === "youOwe") {
      youOwe.push({
        id: Date.now(),
        name: youNameTitle,
        amount: Number(youOweAmount),
        date: new Date(),
      });
    } else if (type === "otherOwe") {
      otherOwe.push({
        id: Date.now(),
        name: otherNameTitle,
        amount: Number(otherOweAmount),
        date: new Date(),
      });
    }


    setYouNameTitle(""); setYouOweAmount("");
    setOtherNameTitle(""); setOtherOweAmount("");
    setIsEditing(false);
    router.back();
  };

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        {isEditing && type === "youOwe" ? "Edit You Owe" : "Add You Owe"}
      </Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={youNameTitle}
        onChangeText={setYouNameTitle}
      />

      <TextInput
        placeholder="Amount"
        style={styles.input}
        value={youOweAmount}
        onChangeText={setYouOweAmount}
        keyboardType="numeric"
      />

      <Button
        title={isEditing && type === "youOwe" ? "Update" : "Add"}
        onPress={addOrUpdateOwes}
      />


      <Text style={[styles.heading, styles.sectionSpacing]}>
        {isEditing && type === "otherOwe" ? "Edit Other Owe" : "Add Other Owe"}
      </Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={otherNameTitle}
        onChangeText={setOtherNameTitle}
      />

      <TextInput
        placeholder="Amount"
        style={styles.input}
        value={otherOweAmount}
        onChangeText={setOtherOweAmount}
        keyboardType="numeric"
      />

      <Button
        title={isEditing && type === "otherOwe" ? "Update" : "Add"}
        onPress={addOrUpdateOwes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  sectionSpacing: { marginTop: 30 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
