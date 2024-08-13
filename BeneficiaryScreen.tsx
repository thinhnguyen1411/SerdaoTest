import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useBeneficiaries } from './BeneficiaryContext';
import {isValidIBAN} from 'ibantools';

const BeneficiaryScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const { addBeneficiary } = useBeneficiaries();

  useEffect(() => {
    //hardcode valid iban
    setIban('GB33BUKB20201555555555');
  }, []);

  const handleBeneficiary = ({ route }) => {
    if(!isValidIBAN(iban)) { 
      alert('Invalid IBAN!');
      return;
    }
    addBeneficiary(firstName, lastName, iban);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Beneficiary First Name"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Beneficiary Last Name"
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginVertical: 8 }}
        onChangeText={setIban}
        value={iban}
        placeholder="Beneficiary IBAN"
      />
      <Button title="Add Beneficiary" onPress={handleBeneficiary} />
    </View>
  );
};

export default BeneficiaryScreen;
