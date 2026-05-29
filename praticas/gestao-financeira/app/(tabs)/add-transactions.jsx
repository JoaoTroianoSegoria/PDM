import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { CategoryOption } from "../../components/CategoryOption";
import { colors } from "../../constants/colors";
import { useFinance } from "../../contexts/FinanceContext";
import { parseCurrencyInput } from "../../utils/currency";
import { getTodayInput, isValidDateInput, toApiDate } from "../../utils/date";

export default function AddTransactions() {
  const router = useRouter();
  const { categories, createTransaction, error, loadFinanceData, saving } =
    useFinance();
  const [type, setType] = useState("expense");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(getTodayInput());
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        type === "income" ? category.isIncome : !category.isIncome
      ),
    [categories, type]
  );

  const selectedCategory =
    filteredCategories.find((category) => category.id === selectedCategoryId) ??
    filteredCategories[0];
  const canSave = !saving && !error && filteredCategories.length > 0;

  function changeType(nextType) {
    setType(nextType);
    setSelectedCategoryId(null);
  }

  async function handleSubmit() {
    const amount = parseCurrencyInput(value);

    if (!description.trim()) {
      Alert.alert("Descricao obrigatoria", "Informe o nome da transacao.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      Alert.alert("Valor invalido", "Informe um valor maior que zero.");
      return;
    }

    if (!isValidDateInput(date)) {
      Alert.alert("Data invalida", "Use o formato AAAA-MM-DD.");
      return;
    }

    if (error) {
      Alert.alert(
        "API indisponivel",
        "Sincronize as categorias com o backend antes de salvar."
      );
      return;
    }

    if (!selectedCategory?.id) {
      Alert.alert(
        "Categoria indisponivel",
        "Carregue as categorias da API antes de salvar."
      );
      return;
    }

    try {
      await createTransaction({
        description: description.trim(),
        value: amount,
        date: toApiDate(date),
        categoryId: selectedCategory.id,
      });

      setDescription("");
      setValue("");
      setDate(getTodayInput());
      setSelectedCategoryId(null);
      Alert.alert("Transacao salva", "O lancamento foi enviado para a API.");
      router.push("/");
    } catch (err) {
      Alert.alert("Nao foi possivel salvar", err.message);
    }
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboard}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.typeSwitch}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => changeType("expense")}
              style={[
                styles.typeButton,
                type === "expense" && styles.typeButtonActive,
              ]}
            >
              <MaterialIcons
                name="remove-circle-outline"
                size={20}
                color={type === "expense" ? colors.primaryContrast : colors.negativeText}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  type === "expense" && styles.typeButtonTextActive,
                ]}
              >
                Saida
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => changeType("income")}
              style={[
                styles.typeButton,
                type === "income" && styles.typeButtonActive,
              ]}
            >
              <MaterialIcons
                name="add-circle-outline"
                size={20}
                color={type === "income" ? colors.primaryContrast : colors.positiveText}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  type === "income" && styles.typeButtonTextActive,
                ]}
              >
                Entrada
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Descricao</Text>
            <TextInput
              placeholder="Ex: Mercado"
              placeholderTextColor={colors.mutedText}
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.fieldGroup, styles.rowItem]}>
              <Text style={styles.label}>Valor</Text>
              <TextInput
                keyboardType="decimal-pad"
                placeholder="0,00"
                placeholderTextColor={colors.mutedText}
                value={value}
                onChangeText={setValue}
                style={styles.input}
              />
            </View>

            <View style={[styles.fieldGroup, styles.rowItem]}>
              <Text style={styles.label}>Data</Text>
              <TextInput
                keyboardType="numbers-and-punctuation"
                placeholder="AAAA-MM-DD"
                placeholderTextColor={colors.mutedText}
                value={date}
                onChangeText={setDate}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.categoryHeader}>
            <Text style={styles.sectionTitle}>Categoria</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => loadFinanceData({ silent: true })}
              style={styles.syncButton}
            >
              <MaterialIcons name="sync" size={18} color={colors.primaryDark} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {filteredCategories.map((category) => (
              <CategoryOption
                key={category.id}
                category={category}
                selected={selectedCategory?.id === category.id}
                onPress={() => setSelectedCategoryId(category.id)}
              />
            ))}
          </ScrollView>

          {filteredCategories.length === 0 || error ? (
            <View style={styles.warningBox}>
              <MaterialIcons name="cloud-off" size={20} color={colors.warning} />
              <Text style={styles.warningText}>
                {error ?? "Nenhuma categoria encontrada na API."}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={!canSave}
            onPress={handleSubmit}
            style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          >
            {saving ? (
              <ActivityIndicator color={colors.primaryContrast} />
            ) : (
              <>
                <MaterialIcons name="save" size={22} color={colors.primaryContrast} />
                <Text style={styles.saveButtonText}>Salvar transacao</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 108,
    gap: 16,
  },
  typeSwitch: {
    height: 52,
    padding: 4,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    gap: 4,
  },
  typeButton: {
    flex: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    color: colors.primaryText,
    fontSize: 14,
    fontWeight: "800",
  },
  typeButtonTextActive: {
    color: colors.primaryContrast,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: colors.primaryText,
    fontSize: 13,
    fontWeight: "800",
  },
  input: {
    minHeight: 52,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.primaryText,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "800",
  },
  syncButton: {
    width: 40,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  categories: {
    gap: 10,
    paddingRight: 16,
  },
  warningBox: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFF9E8",
    borderWidth: 1,
    borderColor: "#F3D78A",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  warningText: {
    flex: 1,
    color: colors.primaryText,
    fontSize: 12,
    lineHeight: 17,
  },
  saveButton: {
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  saveButtonDisabled: {
    opacity: 0.72,
  },
  saveButtonText: {
    color: colors.primaryContrast,
    fontSize: 16,
    fontWeight: "900",
  },
});
