import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils";
import { useState } from "react";
import Modal from 'react-native-modal';

const enhance = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
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
    backgroundColor: COLORS.card,
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
    backgroundColor: COLORS.background,
    color: COLORS.text,
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
    backgroundColor: COLORS.background,
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

export const LaborerItem = ({ item, onPress, onDelete }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [confirmationName, setConfirmationName] = useState('');
  
  const laborerWithId = {
    ...item,
    id: item._id,
  };

  const handleDelete = () => {
    if (confirmationName.toLowerCase() === item.name.toLowerCase()) {
      onDelete(item._id, confirmationName);
      setIsDialogVisible(false);
      setConfirmationName('');
    }
  };

  return (
    <>
      <View style={enhance.card}>
        <View style={enhance.contentContainer}>
          <TouchableOpacity onPress={() => onPress(laborerWithId)} style={enhance.mainContent}>
            <View style={styles.categoryIconContainer}>
              <Ionicons name="person" size={22} color={COLORS.primary} />
            </View>
            <View style={styles.transactionLeft}>
              <Text style={styles.transactionTitle}>{item.name}</Text>
            </View>
            <View style={styles.transactionRight}>
              <Text style={styles.transactionDate}>{item.phone || 'No phone'}</Text>
              <Text style={styles.transactionDate}>Since {formatDate(item.joining_date).split(',')[0]}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => setIsDialogVisible(true)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={isDialogVisible}
        onBackdropPress={() => {
          setIsDialogVisible(false);
          setConfirmationName('');
        }}
        onBackButtonPress={() => {
          setIsDialogVisible(false);
          setConfirmationName('');
        }}
        useNativeDriver
        style={{ margin: 0 }}
      >
        <View style={enhance.modalContainer}>
          <Text style={enhance.modalTitle}>Delete Laborer</Text>
          <Text style={enhance.modalMessage}>
            This will delete the laborer and all associated transactions. To confirm, please enter the laborers name:
          </Text>
          <TextInput
            style={enhance.input}
            placeholder="Enter laborer's name"
            value={confirmationName}
            onChangeText={setConfirmationName}
            autoCapitalize="none"
          />
          <View style={enhance.buttonContainer}>
            <TouchableOpacity
              style={[enhance.button, enhance.cancelButton]}
              onPress={() => {
                setIsDialogVisible(false);
                setConfirmationName('');
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