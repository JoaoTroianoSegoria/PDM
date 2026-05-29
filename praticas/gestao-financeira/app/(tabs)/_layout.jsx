import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.primaryContrast,
        headerTitleAlign: "center",
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: styles.tabBar,
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.8} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Transacoes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-transactions"
        options={{
          title: "Adicionar transacao",
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <MaterialIcons name="add" size={40} color={colors.primaryContrast} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Resumo",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pie-chart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    paddingTop: 6,
    paddingBottom: 8,
    backgroundColor: colors.background,
    borderTopColor: colors.border,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 64,
    width: 64,
    borderRadius: 32,
    marginBottom: 18,
    backgroundColor: colors.primary,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 6,
  },
});
