import React, {useEffect} from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useTransactions } from './TransactionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const { transactions, balance, loadTransactionList, loadBalance } = useTransactions();

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.account && (
        <>
          <Text style={styles.itemText}>To: {item.account.name}</Text>
          <Text style={styles.itemText}>IBAN: {item.account.iban}</Text>
        </>
      )}
    </View>
  );

  const loadTransactions = async () => {
    const transactionsStore = await AsyncStorage.getItem('transactions');
    if (transactionsStore !== null) {
      let transactionStoreArr = JSON.parse(transactionsStore) as Array<object>;
      loadTransactionList(transactionStoreArr);
    }
  }

  const loadBalanceData = async () => {
    const balanceStore = await AsyncStorage.getItem('balance');
    if (balanceStore !== null) {
      loadBalance(parseFloat(balanceStore));
    }
  }
  
  const clearData = async () => {
    loadTransactionList([]);
    loadBalance(0);
    try {
      await AsyncStorage.removeItem('balance');
      await AsyncStorage.removeItem('transactions');
    } catch(e) {
      // remove error
    }
  };
  
  useEffect(() => {
    loadTransactions();
    loadBalanceData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>Current Balance: ${balance.toFixed(2)}</Text>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('Transaction')}
      />
      <Button title="Clear" color="#FF0000" onPress={clearData} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
});

export default HomeScreen;
