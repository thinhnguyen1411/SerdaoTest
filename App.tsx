import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import BeneficiaryScreen from './BeneficiaryScreen';
import { TransactionProvider } from './TransactionContext';
import { BeneficiaryProvider } from './BeneficiaryContext';
import BeneficiaryList from './BeneficiaryList';

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
