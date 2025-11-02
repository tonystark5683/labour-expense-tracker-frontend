import { View, Text, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator, Alert, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../../assets/styles/create.styles";
import { COLORS } from "../../../constants/colors";
import { API_URL } from "../../../constants/api";
import { formatDate } from "../../../lib/utils";

const CATEGORIES = [
  { id: "wages", name: "Wages", icon: "cash" },
  { id: "groceries", name: "Groceries", icon: "cart" },
  { id: "advance", name: "Advance", icon: "wallet" },
  { id: "medical", name: "Medical", icon: "medical" },
  { id: "tools", name: "Tools & Equipment", icon: "construct" },
  { id: "transport", name: "Transport", icon: "bus" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" }
];

export default function LaborerDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const loadData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/laborers/details/${id}`);
      if (!response.ok) throw new Error("Failed to fetch laborer details");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error loading laborer details:", error);
      Alert.alert("Error", "Failed to load laborer details");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addTransaction = async () => {
    if (!selectedCategory) return Alert.alert("Error", "Please select a category");
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return Alert.alert("Error", "Please enter a valid amount");
    }
    if (!description.trim()) return Alert.alert("Error", "Please enter a description");

    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          laborer_id: data?.laborer._id,
          user_id: data?.laborer.user_id,
          title: description.trim(),
          amount: -parseFloat(amount), // negative since it's an expense
          category: selectedCategory,
        }),
      });

      if (!response.ok) throw new Error("Failed to add transaction");

      Alert.alert("Success", "Transaction added successfully");
      setAmount("");
      setDescription("");
      setSelectedCategory("");
      loadData();
    } catch (error) {
      console.error("Error adding transaction:", error);
      Alert.alert("Error", "Failed to add transaction");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{data?.laborer.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* LABORER INFO CARD */}
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Daily Wage</Text>
              <Text style={styles.infoValue}>₹{data?.laborer.daily_wage}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Since</Text>
              <Text style={styles.infoValue}>{formatDate(data?.laborer.joining_date)}</Text>
            </View>
          </View>
          {data?.laborer.phone && (
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{data.laborer.phone}</Text>
              </View>
            </View>
          )}
        </View>

        {/* SUMMARY CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>₹{Math.abs(data?.summary.total || 0)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Wages</Text>
              <Text style={styles.summaryValue}>₹{Math.abs(data?.summary.wages_total || 0)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Groceries</Text>
              <Text style={styles.summaryValue}>₹{Math.abs(data?.summary.groceries_total || 0)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Advance</Text>
              <Text style={styles.summaryValue}>₹{Math.abs(data?.summary.advance_total || 0)}</Text>
            </View>
          </View>
        </View>

        {/* ADD NEW TRANSACTION */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add New Transaction</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons
              name="create-outline"
              size={22}
              color={COLORS.textLight}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor={COLORS.textLight}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="cash-outline"
              size={22}
              color={COLORS.textLight}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount (₹)"
              placeholderTextColor={COLORS.textLight}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.name && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Ionicons
                  name={category.icon}
                  size={20}
                  color={selectedCategory === category.name ? COLORS.white : COLORS.text}
                  style={styles.categoryIcon}
                />
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.name && styles.categoryButtonTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addTransaction}>
            <Ionicons name="add-circle" size={20} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>

        {/* TRANSACTIONS LIST */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Transactions</Text>
          {data?.transactions.map((transaction) => (
            <View key={transaction._id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                <Text style={styles.transactionDate}>{formatDate(transaction.created_at)}</Text>
              </View>
              <Text style={styles.transactionAmount}>
                -₹{Math.abs(transaction.amount)}
              </Text>
            </View>
          ))}
          {data?.transactions.length === 0 && (
            <Text style={styles.noTransactions}>No transactions yet</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}