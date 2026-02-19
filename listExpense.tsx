import { View, ScrollView, Text, StyleSheet, Button,TouchableOpacity} from "react-native";
import { expenses, earned, youOwe, otherOwe } from "./expenses";
import { useState } from "react";

export default function ListExpense() {
  const [refresh, setRefresh] = useState(false); // to force re-render

  const handleDelete = (id: number, type: string) => {
    let arr;
    switch (type) {
      case "expense":
        arr = expenses;
        break;
      case "earned":
        arr = earned;
        break;
      case "youOwe":
        arr = youOwe;
        break;
      case "otherOwe":
        arr = otherOwe;
        break;
      default:
        return;
    }

    const index = arr.findIndex((e) => e.id === id);
    if (index !== -1) {
      arr.splice(index, 1);
      setRefresh(!refresh); // force re-render
    }
  };

  // Helper function to render list items with delete button
  const renderList = (data: any[], type: string, labelKey: string) => {
    if (data.length === 0) return <Text>No items yet</Text>;
    return data.map((e) => (
      <View key={e.id} style={styles.itemRow}>
        <Text>
          {e[labelKey]} - ${e.amount} - {e.date.toLocaleDateString()}
        </Text>

        <TouchableOpacity onPress={() => handleDelete(e.id, type)}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Expenses</Text>
      {renderList(expenses, "expense", "title")}

      <Text style={[styles.title, { marginTop: 30 }]}>All Earned</Text>
      {renderList(earned, "earned", "title")}

      <Text style={[styles.title, { marginTop: 30 }]}>All You Owe</Text>
      {renderList(youOwe, "youOwe", "name")}

      <Text style={[styles.title, { marginTop: 30 }]}>All Other Owe</Text>
      {renderList(otherOwe, "otherOwe", "name")}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },


    deleteText: {
      color: "#d11a2a",
      fontSize: 18,
      fontWeight: "600",
      fontWeight: "bold",
    },
    });