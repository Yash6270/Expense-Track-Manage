import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expense Track & Manage</Text>

      <Text style={styles.heading}>About This App</Text>
      <Text style={styles.text}>
        Expense Track & Manage is a simple mobile app to track your expenses,
        earnings, and debts. You can add expenses, record money you owe or is owed to you,
        and manage your finances in a clean, organized way.
      </Text>

      <Text style={styles.heading}>Developer</Text>
      <Text style={styles.text}>Yash Chaudhary</Text>

      <Text style={styles.heading}>Version</Text>
      <Text style={styles.text}>1.0.0</Text>

      <Text style={styles.heading}>Contact</Text>
      <Text style={styles.text}>yashkumarganeshbhai.chaudhary@sl.on.ca</Text>

      <Text style={styles.footer}>Thank you for using our app!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  heading: { fontSize: 20, fontWeight: "600", marginTop: 20, marginBottom: 5 },
  text: { fontSize: 16, lineHeight: 22 },
  footer: { fontSize: 16, marginTop: 30, textAlign: "center", color: "#555" },
});