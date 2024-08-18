import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BeneficiaryDto} from './BeneficiaryDto';

const BeneficiaryContext = createContext();

export const useBeneficiaries = () => useContext(BeneficiaryContext);

export const BeneficiaryProvider = ({children}) => {
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryDto[]>([]);

  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryDto>();

  const addBeneficiary = async (
    firstName: string,
    lastName: string,
    iban: string,
  ) => {
    const newBeneficiary: BeneficiaryDto = {
      id: Date.now(),
      firstName,
      lastName,
      iban,
    };
    setBeneficiaries(prevBeneficiaries => [
      ...prevBeneficiaries,
      newBeneficiary,
    ]);

    const beneficiariesStore = await AsyncStorage.getItem('beneficiaries');
    let beneficiariesStoreArr = [];
    if (beneficiariesStore !== null) {
      // value previously stored
      beneficiariesStoreArr = JSON.parse(beneficiariesStore);
    }
    beneficiariesStoreArr.push(newBeneficiary);
    await AsyncStorage.setItem(
      'beneficiaries',
      JSON.stringify(beneficiariesStoreArr),
    );
  };

  const selectBeneficiary = (selectedItem: BeneficiaryDto) => {
    setSelectedBeneficiary(selectedItem);
  };

  const loadBeneficiaryList = (data: BeneficiaryDto[]) => {
    setBeneficiaries(data);
  };

  return (
    <BeneficiaryContext.Provider
      value={{
        beneficiaries,
        selectedBeneficiary,
        selectBeneficiary,
        addBeneficiary,
        loadBeneficiaryList,
      }}>
      {children}
    </BeneficiaryContext.Provider>
  );
};
