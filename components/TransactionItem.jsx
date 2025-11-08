import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils";

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
  }
});

const CATEGORY_ICONS = {
  "Wages": "cash",
  "Groceries": "cart",
  "Cash": "wallet",
  "Medical": "medical",
  // "Tools & Equipment": "construct",
  // "Transport": "bus",
  "Other": "ellipsis-horizontal",
};

export const TransactionItem = ({ item, onDelete }) => {
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => onDelete(item._id),
          style: "destructive"
        }
      ]
    );
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
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};