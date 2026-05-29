import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela nao encontrada</Text>
      <Link href="/" style={styles.link}>
        Voltar para transacoes
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.primaryText,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },
  link: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: "700",
  },
});
