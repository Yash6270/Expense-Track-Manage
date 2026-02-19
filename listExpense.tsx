import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { expenses, earned, youOwe, otherOwe } from "./expenses";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ListExpense() {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  const handleDelete = (id: number, type: string) => {               {/* this is to hadle the delete option of expense.earned,and owes section  */}
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
      setRefresh(!refresh);
    }
  };

  const renderList = (data: any[], type: string, labelKey: string) => {
    if (data.length === 0) return <Text>No items yet</Text>;

    return data.map((e) => (
      <View key={e.id} style={styles.itemRow}>
        <TouchableOpacity
          style={styles.rowContent}
          onPress={() => {

            let pathname = "/addExpense";
            if (type === "youOwe" || type === "otherOwe") {
              pathname = "/owes";
            }


            router.push({
              pathname,
              params: { type, id: String(e.id) }
            });
          }}
        >
          <Text style={styles.itemText}>
            {e[labelKey]} - ${e.amount} - {e.date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

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

      <Text style={[styles.title, styles.sectionTitle]}>All Earned</Text>
      {renderList(earned, "earned", "title")}

      <Text style={[styles.title, styles.sectionTitle]}>All You Owe</Text>
      {renderList(youOwe, "youOwe", "name")}

      <Text style={[styles.title, styles.sectionTitle]}>All Other Owe</Text>
      {renderList(otherOwe, "otherOwe", "name")}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  sectionTitle: { marginTop: 30 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
  },
  rowContent: {
    flex: 1,
    paddingRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: "#d11a2a",
    fontSize: 18,
    fontWeight: "bold",
  },
});
