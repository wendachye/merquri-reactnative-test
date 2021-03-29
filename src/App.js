import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import {ThemeProvider} from 'react-native-elements';
import {ContactProvider} from './contexts/ContactContext';
import contactReducer from './reducers/ContactReducer';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const styles = useStyles(isDarkMode);

  const defaultTheme = {
    colors: {
      primary: '#ff8c00',
      secondary: Colors.darker,
      backgroundColor: Colors.lighter,
      backgroundColorSecondary: 'lightgray',
    },
  };

  const darkTheme = {
    colors: {
      primary: '#ff8c00',
      secondary: Colors.lighter,
      backgroundColor: Colors.darker,
      backgroundColorSecondary: 'dimgray',
    },
    backgroundColor: {
      primary: Colors.darker,
    },
  };

  const {
    state,
    restoreContacts,
    addNewContact,
    editNewContact,
  } = contactReducer();

  const contactContext = useMemo(
    () => ({
      state,
      restoreContacts: () => {
        try {
          restoreContacts();
        } catch (error) {
          console.log(error);
        }
      },
      addNewContact: contact => {
        try {
          addNewContact(contact);
        } catch (error) {
          console.log(error);
        }
      },
      editNewContact: contact => {
        try {
          editNewContact(contact);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    [state],
  );

  return (
    <ThemeProvider
      useDark={isDarkMode}
      theme={isDarkMode ? darkTheme : defaultTheme}>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <ContactProvider value={contactContext}>
            <AppNavigator />
          </ContactProvider>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const useStyles = isDarkMode => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
  });
};

export default App;
