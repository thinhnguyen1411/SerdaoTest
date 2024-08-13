import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BeneficiaryContext = createContext();

export const useBeneficiaries = () => useContext(BeneficiaryContext);

export const BeneficiaryProvider = ({ children }) => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [balance, setBalance] = useState(0);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState();

  const addBeneficiary = async (firstName, lastName, iban) => {
    const newBeneficiary = { id: Date.now(), firstName, lastName, iban };
    setBeneficiaries((prevBeneficiaries) => [...prevBeneficiaries, newBeneficiary]);

    const beneficiariesStore = await AsyncStorage.getItem('beneficiaries');
    let beneficiariesStoreArr = [];
    if (beneficiariesStore !== null) {
      // value previously stored
      beneficiariesStoreArr = JSON.parse(beneficiariesStore);
      
    }
    beneficiariesStoreArr.push(newBeneficiary);
    await AsyncStorage.setItem('beneficiaries', JSON.stringify(beneficiariesStoreArr));
    
  };

  const selectBeneficiary = (selectedItem) => {
    setSelectedBeneficiary(selectedItem);
  };

  const loadBeneficiaryList = (data) => {
    setBeneficiaries(data);
  };

  return (
    <BeneficiaryContext.Provider value={{ beneficiaries, selectedBeneficiary, selectBeneficiary, addBeneficiary, loadBeneficiaryList, balance }}>
      {children}
    </BeneficiaryContext.Provider>
  );
};