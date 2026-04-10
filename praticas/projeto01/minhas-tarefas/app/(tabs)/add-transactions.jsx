import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { useTransactions } from "../../src/context/transactions-context";
import {
  CATEGORY_OPTIONS,
  getCategoryMeta,
  parseCurrencyInput,
} from "../../src/utils/finance";

const INITIAL_FORM = {
  title: "",
  amount: "",
  notes: "",
  type: "expense",
  category: CATEGORY_OPTIONS.expense[0].value,
};

export default function AddTransactionsScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const [form, setForm] = useState(INITIAL_FORM);

  const availableCategories = useMemo(
    () => CATEGORY_OPTIONS[form.type],
    [form.type]
  );

  useEffect(() => {
    if (!availableCategories.some((category) => category.value === form.category)) {
      setForm((current) => ({
        ...current,
        category: availableCategories[0].value,
      }));
    }
  }, [availableCategories, form.category]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleTypeChange(type) {
    setForm((current) => ({
      ...current,
      type,
      category: CATEGORY_OPTIONS[type][0].value,
    }));
  }

  function handleSubmit() {
    const amount = parseCurrencyInput(form.amount);

    if (!form.title.trim()) {
      Alert.alert("Falta um título", "Digite um nome para identificar a transação.");
      return;
    }

    if (!amount || amount <= 0) {
      Alert.alert("Valor inválido", "Informe um valor maior que zero.");
      return;
    }

    addTransaction({
      amount,
      category: form.category,
      notes: form.notes.trim(),
      title: form.title.trim(),
      type: form.type,
    });

    setForm(INITIAL_FORM);
    Alert.alert("Transação salva", "Sua movimentação já apareceu no painel.");
    router.navigate("/");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboard}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.title}>Nova movimentação</Text>
            <Text style={styles.subtitle}>
              Registre entradas e saídas com categoria, valor e observações.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Tipo</Text>

            <View style={styles.segmentRow}>
              {[
                { label: "Entrada", value: "income" },
                { label: "Saída", value: "expense" },
              ].map((option) => {
                const isActive = form.type === option.value;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => handleTypeChange(option.value)}
                    style={[
                      styles.segmentButton,
                      isActive && styles.segmentButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        isActive && styles.segmentTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Título</Text>
            <TextInput
              placeholder="Ex.: Mercado da semana"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
              value={form.title}
              onChangeText={(value) => updateField("title", value)}
            />

            <Text style={styles.sectionTitle}>Valor</Text>
            <TextInput
              keyboardType="decimal-pad"
              placeholder="Ex.: 249,90"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
              value={form.amount}
              onChangeText={(value) => updateField("amount", value)}
            />

            <Text style={styles.sectionTitle}>Categoria</Text>
            <View style={styles.categoryGrid}>
              {availableCategories.map((category) => {
                const meta = getCategoryMeta(category.value);
                const isSelected = form.category === category.value;

                return (
                  <Pressable
                    key={category.value}
                    onPress={() => updateField("category", category.value)}
                    style={[
                      styles.categoryButton,
                      isSelected && {
                        borderColor: meta.color,
                        backgroundColor: meta.softColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && { color: colors.primaryText },
                      ]}
                    >
                      {category.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionTitle}>Observações</Text>
            <TextInput
              multiline
              numberOfLines={4}
              placeholder="Adicione um detalhe opcional para lembrar depois."
              placeholderTextColor={colors.secondaryText}
              style={[styles.input, styles.notesInput]}
              textAlignVertical="top"
              value={form.notes}
              onChangeText={(value) => updateField("notes", value)}
            />
          </View>

          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Salvar transação</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 18,
  },
  hero: {
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.secondaryText,
  },
  card: {
    padding: 18,
    borderRadius: 24,
    backgroundColor: colors.surface,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryText,
  },
  segmentRow: {
    flexDirection: "row",
    gap: 10,
  },
  segmentButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontWeight: "700",
    color: colors.secondaryText,
  },
  segmentTextActive: {
    color: colors.primaryContrast,
  },
  input: {
    minHeight: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.primaryText,
  },
  notesInput: {
    minHeight: 110,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    minWidth: "30%",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  categoryText: {
    fontWeight: "600",
    color: colors.secondaryText,
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primaryContrast,
  },
});
