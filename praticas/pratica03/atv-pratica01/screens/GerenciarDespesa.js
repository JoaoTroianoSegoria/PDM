import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLayoutEffect, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function getDataFormatada(data) {
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export default function GerenciarDespesa({
  navigation,
  route,
  despesas,
  onAddExpense,
  onDeleteExpense,
  onUpdateExpense,
}) {
  const despesaId = route.params?.expenseId;
  const modoEdicao = !!despesaId;
  const despesaEditada = despesas.find((despesa) => despesa.id === despesaId);

  const [data, setData] = useState(despesaEditada?.data ?? new Date());
  const [valor, setValor] = useState(
    despesaEditada ? despesaEditada.valor.toString() : "",
  );
  const [descricao, setDescricao] = useState(despesaEditada?.descricao ?? "");
  const [showPicker, setShowPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: modoEdicao ? "Editar Despesa" : "Nova Despesa",
    });
  }, [modoEdicao, navigation]);

  function showPickerHandler() {
    setShowPicker(true);
  }

  function onChangeHandler(event, selectedDate) {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (event.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      setData(selectedDate);
    }
  }

  function cancelarHandler() {
    navigation.goBack();
  }

  function excluirHandler() {
    onDeleteExpense(despesaId);
    navigation.goBack();
  }

  function confirmarHandler() {
    const valorNumerico = Number(valor.replace(",", "."));

    if (!descricao.trim() || Number.isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert(
        "Dados inválidos",
        "Informe uma descrição e um valor maior que zero para a despesa.",
      );
      return;
    }

    const dadosDespesa = {
      descricao: descricao.trim(),
      valor: valorNumerico,
      data,
    };

    if (modoEdicao) {
      onUpdateExpense(despesaId, dadosDespesa);
    } else {
      onAddExpense(dadosDespesa);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {modoEdicao ? "Atualize os dados da despesa" : "Cadastre uma nova despesa"}
      </Text>

      <View style={styles.row}>
        <View style={[styles.inputContainer, styles.flexOne]}>
          <Text style={styles.label}>Valor da Despesa</Text>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={setValor}
            placeholder="0,00"
            placeholderTextColor="#6c8789"
            style={styles.input}
            value={valor}
          />
        </View>

        <View style={[styles.inputContainer, styles.flexOne]}>
          <Text style={styles.label}>Data da Despesa</Text>
          <Pressable
            android_ripple={{ color: "#dce7e7" }}
            onPress={showPickerHandler}
            style={({ pressed }) => [styles.dateButton, pressed && styles.pressed]}
          >
            <Text style={styles.dateText}>{getDataFormatada(data)}</Text>
          </Pressable>
        </View>
      </View>

      {showPicker && (
        <DateTimePicker mode="date" onChange={onChangeHandler} value={data} />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          autoFocus
          multiline
          numberOfLines={3}
          onChangeText={setDescricao}
          placeholder="Ex.: mercado, transporte, lanche..."
          placeholderTextColor="#6c8789"
          style={[styles.input, styles.descriptionInput]}
          value={descricao}
        />
      </View>

      <View style={styles.buttonsRow}>
        <Pressable
          android_ripple={{ color: "#dde7e7" }}
          onPress={cancelarHandler}
          style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </Pressable>
        <Pressable
          android_ripple={{ color: "#2f7b7a" }}
          onPress={confirmarHandler}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>
            {modoEdicao ? "Salvar" : "Adicionar"}
          </Text>
        </Pressable>
      </View>

      {modoEdicao && (
        <View style={styles.deleteContainer}>
          <Pressable
            android_ripple={{ color: "#f8d6d6" }}
            onPress={excluirHandler}
            style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
          >
            <Ionicons color="#ba2d38" name="trash-outline" size={22} />
            <Text style={styles.deleteText}>Remover despesa</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eef4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#123336",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  flexOne: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#36585b",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#c9d7d8",
    color: "#123336",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  descriptionInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  dateButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#c9d7d8",
    justifyContent: "center",
    minHeight: 49,
    paddingHorizontal: 14,
  },
  dateText: {
    color: "#123336",
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#17494d",
    borderRadius: 12,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: "#f8fbfb",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#c9d7d8",
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: "#36585b",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteContainer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#c9d7d8",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff6f6",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f0caca",
    paddingVertical: 14,
  },
  deleteText: {
    color: "#ba2d38",
    fontSize: 15,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.75,
  },
});
