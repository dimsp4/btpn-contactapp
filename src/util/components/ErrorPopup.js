import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { popError } from "../../store/AppReducer";

export default function ErrorPopup() {
    const dispatch = useDispatch()
  const isError = useSelector((state) => state.app.isError);
  const errorMassage = useSelector((state) => state.app.errorMassage);
  const handleCloseErrorModal = () => dispatch(popError(false));

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isError}
      onRequestClose={handleCloseErrorModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.errorMessage}>{errorMassage}</Text>
          <TouchableOpacity onPress={handleCloseErrorModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  errorMessage: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: "tomato",
    fontWeight: "bold",
  },
});
