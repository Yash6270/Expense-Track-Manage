import {View, Text, Button, StyleSheet,Alert} from "react-native";
import {useRouter} from "expo-router";
import {expenses,earned,youOwe,otherOwe} from "../expenses";
import { useIsFocused } from "@react-navigation/native";
import {useEffect, useState} from "react";



export default function Home()
 {
    const router = useRouter();
    const isFocused = useIsFocused();

    const [totalSpent ,setTotalSpent] = useState(0);                   /*useState: when the data changes, it render the new value */
    const [totalEarned, setTotalEarned] = useState(0);
    const [totalYouOwe,setTotalYouOwe] = useState(0);
    const [totalOtherOwe,setTotalOtherOwe] = useState(0);


     useEffect(() =>
     {
         const spentSum = expenses
          .reduce((s, e) => s + e.amount, 0);

         const earnSum = earned
           .reduce((s, e) => s + e.amount, 0);

         const youOweSum = youOwe
         .reduce((s,e) => s + e.amount, 0);

         const otherOweSum = otherOwe
         .reduce((s,e) => s + e.amount, 0);

         setTotalSpent(spentSum);
         setTotalEarned(earnSum);
         setTotalYouOwe(youOweSum);
         setTotalOtherOwe(otherOweSum);
     },  [isFocused]);



      return(


        <View  style={styles.container}>                                                   {/* Container for The title  */}

          <Text style={styles.title}>Expense Track & Manage </Text>


            <View style={styles.summaryContainer}>                                     {/*Container for the amount spent and earned */}
                <Text>Total Spent: ${totalSpent}</Text>
                <Text>Total Earned: ${totalEarned} </Text>
                <Text>Total Saved: ${totalEarned - totalSpent} </Text>
                <Text>Total Owe: ${totalOtherOwe- totalYouOwe} </Text>
            </View>


            <View style={styles.buttonContainer}>
                <View style={{ marginBottom: 10 }}>
                     <Button title="Add Expenses & Earn" onPress={() => router.push("/addExpense"), params: {from:"home"}} />
                </View>
                <View style={{ marginBottom: 10 }}>
                     <Button title="List Expenses, Earn & Owes" onPress={() => router.push("/listExpense")} />
                </View>
                <View style ={{marginBottom: 10}}>
                     <Button title="Owes" onPress={() => router.push("/owes")}  />
                </View>
                <View style ={{ marginBottom: 10 }}>
                     <Button title="About" onPress={() => router.push("/info")} />
                </View>
            </View>
        </View>

      );
 }
export {expenses};

   const styles = StyleSheet.create({
       container: {flex: 1 , padding: 20 , backgroundColor: "#fff"},
       title: {fontSize: 24 , fontWeight: "bold" , marginBottom: 20},
       summaryContainer: {flexDirection: "column", justifyContent: "space-between", marginBottom:150},
       buttonContainer: {flexDirection: "column", justifyContent: "space-between", height: 150},
    });








