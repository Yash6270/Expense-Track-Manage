import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import {expenses,earned} from "./expenses";
import { useLocalSearchParams } from "expo-router";


export default function AddExpense() {
     const router = useRouter();
     const {from} = useLocalSearchParams();

     console.log(from);


     //Expenses
     const [expenseTitle, setExpenseTitle] = useState("");
     const [expenseAmount, setExpenseAmount] = useState("");

     //Earned
     const [earnedTitle,setEarnedTitle] = useState("");
     const [earnedAmount,setEarnedAmount] = useState("");

     const addExpense = () => {
        if (!expenseTitle || !expenseAmount) {
            alert("Fill all fields");
            return;
        }

     expenses.push({                          //pushing the values to the array in the expenses.ts
        id: Date.now(),
        title: expenseTitle,
        amount: Number(expenseAmount),
        date: new Date(),
     });

     setExpenseTitle("");
     setExpenseAmount("");
};

const addEarned = () => {                      // complete function which handel the non-filled area and push the values to array and clear.
    if(!earnedTitle || !earnedAmount){
       alert("Fill all Fields");
       return;
    }
    earned.push({
        id: Date.now(),
        title: earnedTitle ,
        amount:Number(earnedAmount),
        date: new Date(),
        });

    setEarnedTitle("");     /* clears value field after the values are added*/
    setEarnedAmount("");
    };

  return (
      <View style={styles.container}>

         <Text style={styles.heading}>Add Expense</Text>

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

         <Button title="Add" onPress={addExpense} />

         <Text style={styles.heading}>Add Earned</Text>

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

         <Button title="Add" onPress={addEarned} />

      </View>
     );
   }

   const styles = StyleSheet.create({

       container: { flex: 1, padding: 20 },
       heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
       section: {
       fontSize: 18,
       fontWeight: "600",
       marginTop: 20,
       marginBottom: 10,
       },

       input: {
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 15,
       },
   });
