import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { FinanceProvider } from "../contexts/FinanceContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FinanceProvider>
        <StatusBar backgroundColor={colors.primary} style="light" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </FinanceProvider>
    </SafeAreaProvider>
  );
}
