import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { navigationRef, onBackNavigate, onNavigate } from "../../navigation/RootNavigation";
import { PATH } from "../../util/constant/Path";

export default function ContactUpdateForm({ service }) {
  const dispatch = useDispatch();

  const params = navigationRef.current.getCurrentRoute().params;

  const { onLoadContacts,onUpdateContact, onDeleteContact} = service();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setFirstName(params.firstName)
    setLastName(params.lastName)
    setAge(params.age.toString())
    setPhoto(params.photo)
  }, []);

  const handleCreateContact = async () => {
    if (!firstName || !lastName || !age) {
      alert("All fields are required");
      return;
    }

    const newContact = {
      firstName,
      lastName,
      age: parseInt(age),
      photo,
    };

    await onUpdateContact(params.id, newContact);
    onBackNavigate()
  };

  const handledDeleteForm = async () => {
    if (await onDeleteContact(params.id)){
      onBackNavigate()
      await onLoadContacts()
    }
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
        <Text style={styles.addButtonLabel}>Update Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handledDeleteForm}>
        <Text style={styles.deleteButtonLabel}>Delete</Text>
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
    marginBottom: 20
  },
  addButtonLabel: {
    color: "tomato",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonLabel: {
    color: "white",
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
