import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import TransactionScreen from './transactions/TransactionScreen';
import BeneficiaryScreen from './beneficiaries/BeneficiaryScreen';
import { TransactionProvider } from './transactions/TransactionContext';
import { BeneficiaryProvider } from './beneficiaries/BeneficiaryContext';
import BeneficiaryList from './beneficiaries/BeneficiaryList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <BeneficiaryProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Transaction" component={TransactionScreen} />
            <Stack.Screen name="BeneficiaryList" component={BeneficiaryList} />
            <Stack.Screen name="Beneficiary" component={BeneficiaryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BeneficiaryProvider>
    </TransactionProvider>
  );
};

export default App;
