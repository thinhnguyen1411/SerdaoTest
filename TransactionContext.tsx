import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const addTransaction = async (amount, account) => {
    const newTransaction = { id: Date.now(), amount: parseFloat(amount), account };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    const newBalance = balance + parseFloat(amount);
    setBalance(newBalance);

    const transactionsStore = await AsyncStorage.getItem('transactions');
    let transactionStoreArr = [];
    if (transactionsStore !== null) {
      transactionStoreArr = JSON.parse(transactionsStore);
      
    }
    transactionStoreArr.push(newTransaction);
    await AsyncStorage.setItem('transactions', JSON.stringify(transactionStoreArr));
    await AsyncStorage.setItem('balance', newBalance.toString());
  };

  const loadTransactionList = (data) => {
    setTransactions(data);
  };

  const loadBalance = (data) => {
    setBalance(data);
  };


  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, loadTransactionList, loadBalance, balance }}>
      {children}
    </TransactionContext.Provider>
  );
};