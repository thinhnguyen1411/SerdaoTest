import React, {useState, useEffect} from 'react';
import {View, TextInput, Button} from 'react-native';
import {useTransactions} from './TransactionContext';
import {useBeneficiaries} from '../beneficiaries/BeneficiaryContext';
import {AccountDto} from './AccountDto';

const TransactionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [iban, setIban] = useState<string>('');
  const {addTransaction} = useTransactions();
  const {selectBeneficiary, selectedBeneficiary} = useBeneficiaries();

  const handleTransaction = () => {
    const accountDetails: AccountDto = {name, iban};
    addTransaction(amount, accountDetails);
    selectBeneficiary();
    navigation.goBack();
  };

  useEffect(() => {
    if (!selectedBeneficiary) {
      return;
    }
    const fullName =
      selectedBeneficiary.firstName + ' ' + selectedBeneficiary.lastName;
    setName(fullName);
    setIban(selectedBeneficiary.iban);
  }, [selectedBeneficiary]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setName}
        value={name}
        editable={false}
        placeholder="Recipient Name"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '80%',
          marginVertical: 8,
        }}
        onChangeText={setIban}
        value={iban}
        editable={false}
        placeholder="Recipient IBAN"
      />
      <Button
        title="Select beneficiary"
        onPress={() => navigation.navigate('BeneficiaryList')}
      />
      <Button
        title="Submit Transaction"
        color="#FF0000"
        onPress={handleTransaction}
      />
    </View>
  );
};

export default TransactionScreen;
