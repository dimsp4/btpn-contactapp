import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { popError, setErrorMessage } from "../../store/AppReducer";
import { onBackNavigate } from "../../navigation/RootNavigation";

export default function ContactAddForm({ service }) {
  const dispatch = useDispatch();

  const { onPostContact, onLoadContact } = service();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState("");

  const handleCreateContact = async () => {
    if (!firstName || !lastName || !age || !photo) {
      dispatch(setErrorMessage("All fields are required"))
      dispatch(popError(true))
      return;
    }

    const newContact = {
      firstName,
      lastName,
      age: parseInt(age),
      photo,
    };

    await onPostContact(newContact);
    onBackNavigate()
  };

  const handleCancelForm = () => {
    onBackNavigate()
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Photo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Photo URL"
        value={photo}
        onChangeText={setPhoto}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleCreateContact}>
        <Text style={styles.addButtonLabel}>Add Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelForm}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backContainer: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "tomato",
  },
  label: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "tomato",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
