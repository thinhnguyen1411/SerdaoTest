import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TransactionDto} from './TransactionDto';
import {AccountDto} from './AccountDto';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({children}) => {
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [balance, setBalance] = useState<number>(1000);

  const addTransaction = async (amount: string, account: AccountDto) => {
    const newTransaction: TransactionDto = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    const newBalance = balance - parseFloat(amount);
    setBalance(newBalance);

    const transactionsStore = await AsyncStorage.getItem('transactions');
    let transactionStoreArr = [];
    if (transactionsStore !== null) {
      transactionStoreArr = JSON.parse(transactionsStore);
    }
    transactionStoreArr.push(newTransaction);
    await AsyncStorage.setItem(
      'transactions',
      JSON.stringify(transactionStoreArr),
    );
    await AsyncStorage.setItem('balance', newBalance.toString());
  };

  const loadTransactionList = (data: TransactionDto[]) => {
    setTransactions(data);
  };

  const loadBalance = (data: number) => {
    setBalance(data);
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        loadTransactionList,
        loadBalance,
        balance,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
