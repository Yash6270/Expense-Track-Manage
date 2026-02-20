import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { youOwe, otherOwe } from "./expenses";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Owes() {
  const router = useRouter();
  const { type, id } = useLocalSearchParams();

  const [youNameTitle, setYouNameTitle] = useState("");
  const [youOweAmount, setYouOweAmount] = useState("");

  const [otherNameTitle, setOtherNameTitle] = useState("");
  const [otherOweAmount, setOtherOweAmount] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  // 🔁 Load existing data when editing
  useEffect(() => {
    if (!type || !id) return;

    if (type === "youOwe") {
      const item = youOwe.find((e) => e.id === Number(id));
      if (item) {
        setYouNameTitle(item.name);
        setYouOweAmount(String(item.amount));
        setIsEditing(true);
      }
    }

    if (type === "otherOwe") {
      const item = otherOwe.find((e) => e.id === Number(id));
      if (item) {
        setOtherNameTitle(item.name);
        setOtherOweAmount(String(item.amount));
        setIsEditing(true);
      }
    }
  }, [type, id]);

  //  Add or Update You Owe
  const handleSubmitYouOwe = () => {
    if (!youNameTitle || !youOweAmount) {
      alert("Fill all fields");
      return;
    }

    if (isEditing && type === "youOwe") {
      const index = youOwe.findIndex((e) => e.id === Number(id));
      if (index !== -1) {
        youOwe[index] = {
          ...youOwe[index],
          name: youNameTitle,   
          amount: Number(youOweAmount),
        };
      }
    } else {
      youOwe.push({
        id: Date.now(),
        name: youNameTitle,     
        amount: Number(youOweAmount),
        date: new Date(),
      });
    }

    router.back();
  };

  
  const handleSubmitOtherOwe = () => {
    if (!otherNameTitle || !otherOweAmount) {
      alert("Fill all fields");
      return;
    }

    if (isEditing && type === "otherOwe") {
      const index = otherOwe.findIndex((e) => e.id === Number(id));
      if (index !== -1) {
        otherOwe[index] = {
          ...otherOwe[index],
          name: otherNameTitle,  
          amount: Number(otherOweAmount),
        };
      }
    } else {
      otherOwe.push({
        id: Date.now(),
        name: otherNameTitle,    
        amount: Number(otherOweAmount),
        date: new Date(),
      });
    }

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>You Owe</Text>

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
        onPress={handleSubmitYouOwe}
      />

      <Text style={[styles.heading, { marginTop: 30 }]}>
        Other Owe You
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
        onPress={handleSubmitOtherOwe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },

});
