import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ContactListScreen from '../screens/ContactListScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import SearchContactScreen from '../screens/SearchContactScreen';

export default AppNavigator = () => {
  const AppStack = createStackNavigator();

  return (
    <AppStack.Navigator mode="modal">
      <AppStack.Screen name="ContactList" component={ContactListScreen} />
      <AppStack.Screen name="ContactDetail" component={ContactDetailScreen} />
      <AppStack.Screen
        name="SearchContact"
        component={SearchContactScreen}
        // options={{
        //   animationEnabled: false,
        // }}
      />
    </AppStack.Navigator>
  );
};
