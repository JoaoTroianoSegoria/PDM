export function isIncomeTransaction(transaction) {
  return Boolean(transaction?.category?.isIncome);
}

export function getSignedTransactionValue(transaction) {
  const value = Number(transaction?.value) || 0;
  return isIncomeTransaction(transaction) ? value : -value;
}

export function calculateTotals(transactions = []) {
  return transactions.reduce(
    (totals, transaction) => {
      const value = Number(transaction.value) || 0;

      if (isIncomeTransaction(transaction)) {
        totals.income += value;
      } else {
        totals.expenses += value;
      }

      totals.balance = totals.income - totals.expenses;
      return totals;
    },
    { income: 0, expenses: 0, balance: 0 }
  );
}

export function getExpensesByCategory(transactions = []) {
  const groups = transactions
    .filter((transaction) => !isIncomeTransaction(transaction))
    .reduce((acc, transaction) => {
      const category = transaction.category;
      const key = category?.id ?? category?.name ?? "other";
      const current = acc[key] ?? {
        id: key,
        name: category?.displayName ?? "Outros",
        icon: category?.icon ?? "category",
        background: category?.background ?? "#D9D9D9",
        total: 0,
      };

      current.total += Number(transaction.value) || 0;
      acc[key] = current;
      return acc;
    }, {});

  return Object.values(groups).sort((a, b) => b.total - a.total);
}
