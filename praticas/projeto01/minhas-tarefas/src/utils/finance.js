import { colors } from "../../constants/colors";

export const CATEGORY_OPTIONS = {
  income: [
    { label: "Salário", value: "salary" },
    { label: "Freela", value: "freelance" },
    { label: "Extra", value: "extra" },
  ],
  expense: [
    { label: "Alimentação", value: "food" },
    { label: "Casa", value: "house" },
    { label: "Educação", value: "education" },
    { label: "Transporte", value: "transport" },
    { label: "Saúde", value: "health" },
    { label: "Lazer", value: "leisure" },
    { label: "Viagem", value: "travel" },
  ],
};

const categoryMap = {
  salary: {
    color: colors.primary,
    icon: "account-balance-wallet",
    key: "salary",
    label: "Salário",
    softColor: colors.primarySoft,
    type: "income",
  },
  freelance: {
    color: colors.categoryIncome,
    icon: "work-outline",
    key: "freelance",
    label: "Freela",
    softColor: "#F9EDF4",
    type: "income",
  },
  extra: {
    color: colors.categoryLeisure,
    icon: "card-giftcard",
    key: "extra",
    label: "Extra",
    softColor: "#EDF8EF",
    type: "income",
  },
  food: {
    color: colors.categoryFood,
    icon: "restaurant",
    key: "food",
    label: "Alimentação",
    softColor: "#FDF0E8",
    type: "expense",
  },
  house: {
    color: colors.categoryHouse,
    icon: "home-work",
    key: "house",
    label: "Casa",
    softColor: "#FBF8DB",
    type: "expense",
  },
  education: {
    color: colors.categoryEducation,
    icon: "school",
    key: "education",
    label: "Educação",
    softColor: "#F1EAF6",
    type: "expense",
  },
  transport: {
    color: colors.categoryTransport,
    icon: "directions-car",
    key: "transport",
    label: "Transporte",
    softColor: "#ECF2FD",
    type: "expense",
  },
  health: {
    color: colors.categoryHealth,
    icon: "favorite",
    key: "health",
    label: "Saúde",
    softColor: "#FEF0F1",
    type: "expense",
  },
  leisure: {
    color: colors.categoryLeisure,
    icon: "local-activity",
    key: "leisure",
    label: "Lazer",
    softColor: "#EEF8EF",
    type: "expense",
  },
  travel: {
    color: colors.categoryTravel,
    icon: "flight-takeoff",
    key: "travel",
    label: "Viagem",
    softColor: "#E9F7FB",
    type: "expense",
  },
};

export function getCategoryMeta(categoryKey) {
  return (
    categoryMap[categoryKey] ?? {
      color: colors.primary,
      icon: "receipt-long",
      key: categoryKey,
      label: "Outros",
      softColor: colors.primarySoft,
      type: "expense",
    }
  );
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(Number(value) || 0);
}

export function parseCurrencyInput(value) {
  if (!value) {
    return 0;
  }

  const normalizedValue = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=.*\.)/g, "")
    .replace(",", ".");

  return Number(normalizedValue);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

export function summarizeTransactions(transactions) {
  const summary = {
    balance: 0,
    expenseCategories: [],
    expenseCount: 0,
    expenseTotal: 0,
    incomeCount: 0,
    incomeTotal: 0,
    largestExpenseCategory: null,
    totalCount: transactions.length,
  };

  const categoryTotals = new Map();

  transactions.forEach((transaction) => {
    const amount = Number(transaction.amount) || 0;
    const category = getCategoryMeta(transaction.category);

    if (transaction.type === "income") {
      summary.incomeTotal += amount;
      summary.incomeCount += 1;
    } else {
      summary.expenseTotal += amount;
      summary.expenseCount += 1;
    }

    const currentCategory = categoryTotals.get(category.key) ?? {
      ...category,
      amount: 0,
      count: 0,
    };

    currentCategory.amount += amount;
    currentCategory.count += 1;
    categoryTotals.set(category.key, currentCategory);
  });

  summary.balance = summary.incomeTotal - summary.expenseTotal;
  summary.expenseCategories = [...categoryTotals.values()]
    .filter((category) => category.type === "expense")
    .sort((left, right) => right.amount - left.amount);
  summary.largestExpenseCategory = summary.expenseCategories[0] ?? null;

  return summary;
}
