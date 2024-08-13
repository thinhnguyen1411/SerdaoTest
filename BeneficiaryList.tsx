import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useBeneficiaries } from './BeneficiaryContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BeneficiaryList = ({ route, navigation }) => {
  const { beneficiaries, selectBeneficiary, balance, loadBeneficiaryList } = useBeneficiaries();
  const [selectedItem, setSelectedItem] = useState('');

  const onPressAction = (rowItem) => {
    console.log('ListItem was selected');
    console.dir(rowItem);
    setSelectedItem(rowItem.id);
    selectBeneficiary(rowItem);

    navigation.goBack();
  }

  const clearData = async () => {
    loadBeneficiaryList([]);
    try {
      await AsyncStorage.removeItem('beneficiaries');
    } catch(e) {
      // remove error
    }
  };

const loadBeneficiary = async () => {
  const beneficiariesStore = await AsyncStorage.getItem('beneficiaries');
  if (beneficiariesStore !== null) {
    let beneficiariesStoreArr = JSON.parse(beneficiariesStore) as Array<object>;
    loadBeneficiaryList(beneficiariesStoreArr);
  }
}

  useEffect(() => {
    loadBeneficiary();
  }, []);

  const renderItem = ( item ) => {
    
    const isSelectedUser = selectedItem === item.id;
    
    const viewStyle = isSelectedUser ? styles.selectedButton : styles.normalButton;
    return(
    <TouchableOpacity style={viewStyle} onPress={() => onPressAction(item)} >
    <View style={styles.item}>
      <Text style={styles.itemText}>First name: {item.firstName}</Text>
      <Text style={styles.itemText}>Last name: {item.lastName}</Text>
      <Text style={styles.itemText}>IBAN: {item.iban}</Text>
    </View>
    </TouchableOpacity>
  )};

  return (
    <View style={styles.container}>
      <Button
        title="Add Beneficiaries"
        onPress={() => navigation.navigate('Beneficiary')}
      />
      <Button title="Clear" color="#FF0000" onPress={clearData} />
      <FlatList
        data={beneficiaries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          renderItem(item)
        )}
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
  selectedButton: {
    backgroundColor: 'lightgray',
  },
  normalButton: {
    backgroundColor: 'white',
  },
});

export default BeneficiaryList;
