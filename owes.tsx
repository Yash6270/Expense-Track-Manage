import {View,Text,TextInput,Button,StyleSheet} from "react-native";
import { useState } from "react";
import {youOwe,otherOwe} from "./expenses";

export default function Owes(){

    //You owe the money
    const[youNameTitle,setYouNameTitle] = useState("");
    const[youOweAmount,setYouOweAmount] =useState("");

    //Other owe you the money
    const[otherNameTitle,setOtherNameTitle] = useState("");
    const[otherOweAmount,setOtherOweAmount] = useState("");

    const addYouOwe = () => {
        if(!youNameTitle || !youOweAmount){
        alert("Fill all Fields");
        return;
        }

        youOwe.push({
             id: Date.now(),
             name: youNameTitle,
             amount: Number(youOweAmount),
             date: new Date(),
           });

       setYouNameTitle("");
       setYouOweAmount("");
       };

   const addOtherOwe = () => {
       if(!otherNameTitle || !otherOweAmount){
           alert("Fill all fields");
           return;
       }

        otherOwe.push({
            id:Date.now(),
            name: otherNameTitle,
            amount: Number(otherOweAmount),
            date: new Date(),
            });
        setOtherNameTitle("");
        setOtherOweAmount("");

        };


return(
     <View style={styles.container}>
           <Text style={styles.heading}>Add You Owe</Text>

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

           <Button title="Add" onPress={addYouOwe} />

        <Text style={styles.heading}>Add Other Owe</Text>

           <TextInput
                placeholder="Title"
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

              <Button title="Add" onPress={addOtherOwe} />


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
