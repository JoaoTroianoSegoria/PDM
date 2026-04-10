import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
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
        tabBarStyle: {
          height: 72,
          paddingTop: 6,
          paddingBottom: 8,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Transações",
          tabBarLabel: "Painel",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-transactions"
        options={{
          title: "Adicionar transação",
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <MaterialIcons name="add" size={38} color={colors.primaryContrast} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Resumo",
          tabBarLabel: "Análises",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pie-chart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    marginTop: 2,
    borderRadius: 30,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 6,
  },
});
