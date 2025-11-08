import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useLaborers } from "../../hooks/useLaborers";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { LaborerItem } from "../../components/LaborerItem";
import NoLaborersFound from "../../components/NoLaborersFound";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { laborers, isLoading, loadData, deleteLaborer } = useLaborers(user.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLaborerPress = (laborer) => {
    router.push(`/laborer/${laborer._id}`);
  };

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/* RIGHT */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={15} color="#FFF" />
              <Text style={styles.addButtonText}>Add Labour</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Your Laborers</Text>
        </View>
      </View>

      {/* FlatList is a performant way to render long lists in React Native. */}
      {/* it renders items lazily — only those on the screen. */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={laborers}
        renderItem={({ item }) => (
          <LaborerItem 
            item={item} 
            onPress={handleLaborerPress}
            onDelete={async (id, confirmationName) => {
              try {
                const success = await deleteLaborer(id, confirmationName);
                if (success) {
                  loadData();
                }
              } catch (error) {
                console.error("Error deleting laborer:", error);
              }
            }}
          />
        )}
        ListEmptyComponent={<NoLaborersFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}
