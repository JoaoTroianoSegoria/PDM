import { StyleSheet, Text, View } from "react-native";

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce(
    (acumulador, despesa) => acumulador + despesa.valor,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={styles.total}>R$ {somaDespesas.toFixed(2).replace(".", ",")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#d7e6e6",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 14,
  },
  periodo: {
    color: "#36585b",
    fontSize: 15,
    fontWeight: "600",
  },
  total: {
    color: "#123336",
    fontSize: 20,
    fontWeight: "700",
  },
});
