import { FlatList, StyleSheet, Text, View } from "react-native";

import DespesaItem from "./DespesaItem";

export default function DespesaLista({ despesas }) {
  const despesasOrdenadas = [...despesas].sort((a, b) => b.data - a.data);

  return (
    <FlatList
      contentContainerStyle={
        despesasOrdenadas.length === 0 ? styles.emptyContainer : styles.listContainer
      }
      data={despesasOrdenadas}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Nenhuma despesa encontrada.</Text>
        </View>
      }
      renderItem={({ item }) => <DespesaItem {...item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d5dfdf",
    padding: 24,
  },
  emptyText: {
    color: "#36585b",
    fontSize: 16,
    textAlign: "center",
  },
});
