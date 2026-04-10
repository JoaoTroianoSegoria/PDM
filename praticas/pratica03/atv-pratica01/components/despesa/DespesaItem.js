import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

function getDataFormatada(data) {
  return (
    data.getDate().toString().padStart(2, "0") +
    "/" +
    (data.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    data.getFullYear()
  );
}

export default function DespesaItem({ id, descricao, valor, data }) {
  const navigation = useNavigation();

  function despesaPressHandler() {
    navigation.navigate("GerenciarDespesa", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      android_ripple={{ color: "#dce6e6" }}
      onPress={despesaPressHandler}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <View style={styles.item}>
        <View style={styles.infoContainer}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>R$ {valor.toFixed(2).replace(".", ",")}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d5dfdf",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 12,
  },
  descricao: {
    color: "#123336",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  data: {
    color: "#5b7476",
    fontSize: 14,
  },
  valorContainer: {
    backgroundColor: "#17494d",
    borderRadius: 12,
    minWidth: 92,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  valor: {
    color: "#f2be5c",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});
