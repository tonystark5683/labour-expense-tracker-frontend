import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useState, useMemo } from 'react';
import { COLORS } from '../constants/colors';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CATEGORIES = ['Wages', 'Cash', 'Groceries', 'Medical', 'Other'];

export default function DashboardTab({ transactions }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const screenWidth = Dimensions.get('window').width;

  const monthlyData = useMemo(() => {
    const data = new Array(12).fill(0);
    transactions.forEach(t => {
      const month = new Date(t.created_at).getMonth();
      data[month] += Math.abs(t.amount);
    });
    return data;
  }, [transactions]);

  const weeklyData = useMemo(() => {
    if (!selectedMonth) return [];
    
    const selectedMonthTransactions = transactions.filter(t => {
      const date = new Date(t.created_at);
      return date.getMonth() === selectedMonth;
    });

    // Group by week
    const weeks = {};
    selectedMonthTransactions.forEach(t => {
      const date = new Date(t.created_at);
      const weekNumber = Math.ceil(date.getDate() / 7);
      weeks[weekNumber] = (weeks[weekNumber] || 0) + Math.abs(t.amount);
    });

    return Object.entries(weeks).map(([week, amount]) => ({
      week: `Week ${week}`,
      amount
    }));
  }, [selectedMonth, transactions]);

  const categoryData = useMemo(() => {
    const data = {};
    CATEGORIES.forEach(category => {
      data[category] = transactions
        .filter(t => t.category === category)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    });
    return data;
  }, [transactions]);

  const totalAmount = useMemo(() => 
    transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  , [transactions]);

  return (
    <ScrollView style={{ flex: 1, paddingVertical: 16 }}>
      {/* SUMMARY CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>₹{totalAmount}</Text>
          </View>
          {CATEGORIES.map(category => (
            <View key={category} style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>{category}</Text>
              <Text style={styles.summaryValue}>₹{categoryData[category] || 0}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Summary Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary By Category</Text>
        <BarChart
          data={{
            labels: CATEGORIES,
            datasets: [{
              data: CATEGORIES.map(cat => categoryData[cat])
            }]
          }}
          width={screenWidth - 70}
          height={220}
          chartConfig={{
            backgroundColor: COLORS.card,
            backgroundGradientFrom: COLORS.card,
            backgroundGradientTo: COLORS.card,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
            labelColor: () => COLORS.text,
            barPercentage: 0.7,
          }}
          style={styles.chart}
          showValuesOnTopOfBars
        />
      </View>

      {/* Monthly Expenses */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Expenses</Text>
        <BarChart
          data={{
            labels: MONTHS,
            datasets: [{
              data: monthlyData
            }]
          }}
          width={screenWidth - 70}
          height={220}
          chartConfig={{
            backgroundColor: COLORS.card,
            backgroundGradientFrom: COLORS.card,
            backgroundGradientTo: COLORS.card,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
            labelColor: () => COLORS.text,
            barPercentage: 0.7,
          }}
          style={styles.chart}
          onDataPointClick={({ index }) => setSelectedMonth(index)}
        />
      </View>

      {/* Weekly Breakdown for Selected Month */}
      {selectedMonth !== null && weeklyData.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Breakdown - {MONTHS[selectedMonth]}</Text>
          <BarChart
            data={{
              labels: weeklyData.map(d => d.week),
              datasets: [{
                data: weeklyData.map(d => d.amount)
              }]
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.card,
              backgroundGradientFrom: COLORS.card,
              backgroundGradientTo: COLORS.card,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
              labelColor: () => COLORS.text,
              barPercentage: 0.7,
            }}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = {
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  summaryItem: {
    width: '45%',
    backgroundColor: COLORS.cardLight,
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  }
};