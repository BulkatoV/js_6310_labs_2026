import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const storagePath = fileURLToPath(
  new URL('../../data/transactions.json', import.meta.url),
);

export const loadTransactions = () => {
  if (!existsSync(storagePath)) {
    return [];
  }

  const content = readFileSync(storagePath, 'utf8');
  const transactions = JSON.parse(content);

  if (!Array.isArray(transactions)) {
    throw new Error('Файл транзакций должен содержать массив');
  }

  return transactions;
};

export const saveTransactions = (transactions) => {
  mkdirSync(dirname(storagePath), { recursive: true });

  writeFileSync(
    storagePath,
    JSON.stringify(transactions, null, 2),
    'utf8',
  );
};