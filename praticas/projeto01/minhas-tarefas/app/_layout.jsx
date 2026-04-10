import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../constants/colors";
import { TransactionsProvider } from "../src/context/transactions-context";

export default function RootLayout() {
  return (
    <TransactionsProvider>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="+not-found"
          options={{
            title: "Tela não encontrada",
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.primaryContrast,
          }}
        />
      </Stack>
    </TransactionsProvider>
  );
}
