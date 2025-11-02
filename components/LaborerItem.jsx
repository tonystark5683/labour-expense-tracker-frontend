import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatDate } from "../lib/utils";

export const LaborerItem = ({ item, onPress }) => {
  const laborerWithId = {
    ...item,
    id: item._id, // ensure we have both id and _id for compatibility
  };
  return (
    <TouchableOpacity style={styles.transactionCard} onPress={() => onPress(laborerWithId)}>
      <View style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons name="person" size={22} color={COLORS.primary} />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.name}</Text>
          <Text style={styles.transactionCategory}>₹{item.daily_wage}/day</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={styles.transactionDate}>{item.phone || 'No phone'}</Text>
          <Text style={styles.transactionDate}>Since {formatDate(item.joining_date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};