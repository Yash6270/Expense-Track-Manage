import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { expenses, earned } from "./expenses";

export default function AddExpense() {
  const router = useRouter();
  const { type, id } = useLocalSearchParams();


  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");


  const [earnedTitle, setEarnedTitle] = useState("");
  const [earnedAmount, setEarnedAmount] = useState("");


  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {                                                   {/* get the value while editing it */}
    if (!type || !id) return;

    const itemId = Number(id);

    if (type === "expense") {
      const item = expenses.find((e) => e.id === itemId);
      if (item) {
        setExpenseTitle(item.title);
        setExpenseAmount(String(item.amount));
        setIsEditing(true);
      }
    } else if (type === "earned") {
      const item = earned.find((e) => e.id === itemId);
      if (item) {
        setEarnedTitle(item.title);
        setEarnedAmount(String(item.amount));
        setIsEditing(true);
      }
    }
  }, [id, type]);

                                                                      {/* Adding or updating Expenses*/}
  const addOrUpdateExpense = () => {
    if (!expenseTitle || !expenseAmount) {
      alert("Fill all fields");
      return;
    }

    if (isEditing && type === "expense") {
      // Update existing expense
      const index = expenses.findIndex((e) => e.id === Number(id));
      if (index !== -1) {
        expenses[index] = {
          ...expenses[index],
          title: expenseTitle,
          amount: Number(expenseAmount),
        };
      }
    } else {
      // Add new expense
      expenses.push({
        id: Date.now(),
        title: expenseTitle,
        amount: Number(expenseAmount),
        date: new Date(),
      });
    }


    setExpenseTitle("");                           {/*clear the field after pressing add button */}
    setExpenseAmount("");
    router.back();
  };

                                                          {/* Add and  update Earned */}
  const addOrUpdateEarned = () => {
    if (!earnedTitle || !earnedAmount) {
      alert("Fill all fields");
      return;
    }

    if (isEditing && type === "earned") {
                                                                        // Updating the  existing earned
      const index = earned.findIndex((e) => e.id === Number(id));
      if (index !== -1) {
        earned[index] = {
          ...earned[index],
          title: earnedTitle,
          amount: Number(earnedAmount),
        };
      }
    } else {
      // Add new earned
      earned.push({
        id: Date.now(),
        title: earnedTitle,
        amount: Number(earnedAmount),
        date: new Date(),
      });
    }

    setEarnedTitle("");
    setEarnedAmount("");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {isEditing && type === "expense" ? "Edit Expense" : "Add Expense"}
      </Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={expenseTitle}
        onChangeText={setExpenseTitle}
      />

      <TextInput
        placeholder="Amount"
        style={styles.input}
        value={expenseAmount}
        onChangeText={setExpenseAmount}
        keyboardType="numeric"
      />

      <Button
        title={isEditing && type === "expense" ? "Update" : "Add"}
        onPress={addOrUpdateExpense}
      />

      <Text style={styles.heading}>
        {isEditing && type === "earned" ? "Edit Earned" : "Add Earned"}
      </Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={earnedTitle}
        onChangeText={setEarnedTitle}
      />

      <TextInput
        placeholder="Amount"
        style={styles.input}
        value={earnedAmount}
        onChangeText={setEarnedAmount}
        keyboardType="numeric"
      />

      <Button
        title={isEditing && type === "earned" ? "Update" : "Add"}
        onPress={addOrUpdateEarned}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});