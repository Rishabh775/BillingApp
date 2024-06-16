import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [mainUnit, setMainUnit] = useState("kWh");
  const [mainAmount, setMainAmount] = useState("");
  const [user1Rate, setUser1Rate] = useState("");
  const [user2Rate, setUser2Rate] = useState("");
  const [user1Bill, setUser1Bill] = useState("");
  const [user2Bill, setUser2Bill] = useState("");

  const calculateBill = () => {
    const amount = parseFloat(mainAmount);
    const rate1 = parseFloat(user1Rate);
    const rate2 = parseFloat(user2Rate);

    if (isNaN(amount) || isNaN(rate1) || isNaN(rate2)) {
      Alert.alert(
        "Invalid input",
        "Please enter valid numbers for all inputs."
      );
      return;
    }
    const perUnitCharge = amount / rate1;

    const user2Total = rate2 * perUnitCharge + 100;

    const user1Total = amount - user2Total;

    setUser1Bill(user1Total.toFixed(2));
    setUser2Bill(user2Total.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Billing App</Text>

      <Text style={styles.label}>Main Unit: {mainUnit}</Text>

      <Text style={styles.label}>Main Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={mainAmount}
        onChangeText={setMainAmount}
      />

      <Text style={styles.label}>User 1 Rate (per {mainUnit}):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={user1Rate}
        onChangeText={setUser1Rate}
      />

      <Text style={styles.label}>User 2 Rate (per {mainUnit}):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={user2Rate}
        onChangeText={setUser2Rate}
      />

      <Button title="Calculate Bill" onPress={calculateBill} color="#841584" />

      {user1Bill !== "" && (
        <Text style={styles.result}>User 1 Bill: ₹{user1Bill}</Text>
      )}

      {user2Bill !== "" && (
        <Text style={styles.result}>User 2 Bill: ₹{user2Bill}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
  },
  label: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 10,
    color: "#ffffff",
  },
  result: {
    fontSize: 18,
    color: "#ffffff",
    marginTop: 20,
  },
});
