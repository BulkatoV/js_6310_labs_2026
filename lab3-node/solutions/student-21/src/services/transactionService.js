import {
  loadTransactions,
  saveTransactions,
} from './transactionStorage.js';

const transactions = loadTransactions();

export const addTransaction = ({ date, category, amount }) => {
  if (typeof date !== 'string' || !date.trim()) {
    throw new Error('Укажи дату транзакции');
  }

  if (typeof category !== 'string' || !category.trim()) {
    throw new Error('Укажи категорию транзакции');
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Сумма должна быть положительным числом');
  }

  const transaction = {
    date,
    category: category.trim(),
    amount,
  };

  transactions.push(transaction);
  saveTransactions(transactions);

  return transaction;
};

export const getReport = (from, to) => {
  if (!from || !to || from > to) {
    throw new Error('Укажи корректный период');
  }

  const filtered = transactions.filter(
    (transaction) => (
      transaction.date >= from && transaction.date <= to
    ),
  );

  const byCategory = {};

  for (const transaction of filtered) {
    byCategory[transaction.category] =
      (byCategory[transaction.category] ?? 0) + transaction.amount;
  }

  const total = filtered.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  return { total, byCategory };
};

export const clearTransactions = () => {
  transactions.length = 0;
  saveTransactions(transactions);
};