import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils";
import { useState } from "react";
import Modal from 'react-native-modal';

const enhance = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  confirmButton: {
    backgroundColor: COLORS.expense,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

const CATEGORY_ICONS = {
  "Wages": "cash",
  "Groceries": "cart",
  "Advance": "wallet",
  "Medical": "medical",
  "Tools & Equipment": "construct",
  "Transport": "bus",
  "Other": "ellipsis-horizontal",
};

export const TransactionItem = ({ item, onDelete }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [confirmationTitle, setConfirmationTitle] = useState('');
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

  const handleDelete = () => {
    if (confirmationTitle === item.title) {
      onDelete(item._id);
      setIsDialogVisible(false);
      setConfirmationTitle('');
    } else {
      Alert.alert("Error", "Please enter the correct transaction title");
    }
  };

  return (
    <>
      <View style={enhance.card}>
        <View style={enhance.contentContainer}>
          <View style={enhance.mainContent}>
            <View style={styles.categoryIconContainer}>
              <Ionicons name={iconName} size={22} color={isIncome ? COLORS.income : COLORS.expense} />
            </View>
            <View style={styles.transactionLeft}>
              <Text style={styles.transactionTitle}>{item.title}</Text>
              <Text style={styles.transactionCategory}>{item.category}</Text>
            </View>
            <View style={styles.transactionRight}>
              <Text
                style={[styles.transactionAmount, { color: isIncome ? COLORS.income : COLORS.expense }]}
              >
                {isIncome ? "+" : "-"}${Math.abs(parseFloat(item.amount)).toFixed(2)}
              </Text>
              <Text style={styles.transactionDate}>{formatDate(item.created_at)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={() => setIsDialogVisible(true)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={isDialogVisible}
        onBackdropPress={() => {
          setIsDialogVisible(false);
          setConfirmationTitle('');
        }}
        onBackButtonPress={() => {
          setIsDialogVisible(false);
          setConfirmationTitle('');
        }}
        useNativeDriver
        style={{ margin: 0 }}
      >
        <View style={enhance.modalContainer}>
          <Text style={enhance.modalTitle}>Delete Transaction</Text>
          <Text style={enhance.modalMessage}>
            Please type {item.title} to confirm deletion:
          </Text>
          <TextInput
            style={enhance.input}
            placeholder="Enter transaction title"
            value={confirmationTitle}
            onChangeText={setConfirmationTitle}
            autoCapitalize="none"
          />
          <View style={enhance.buttonContainer}>
            <TouchableOpacity
              style={[enhance.button, enhance.cancelButton]}
              onPress={() => {
                setIsDialogVisible(false);
                setConfirmationTitle('');
              }}
            >
              <Text style={enhance.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[enhance.button, enhance.confirmButton]}
              onPress={handleDelete}
            >
              <Text style={enhance.confirmButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};