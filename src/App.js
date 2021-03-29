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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const theme = {
    colors: {
      primary: '#ff8c00',
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
    <SafeAreaView style={[backgroundStyle, styles.safeAreaView]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <ContactProvider value={contactContext}>
            <AppNavigator />
          </ContactProvider>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );

  // return (
  //   <NavigationContainer>
  //     <SafeAreaView style={backgroundStyle}>
  //       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  //       <ScrollView
  //         contentInsetAdjustmentBehavior="automatic"
  //         style={backgroundStyle}>
  //         <Header />
  //         <View
  //           style={{
  //             backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //           }}>
  //           <Section title="Step One">
  //             Edit <Text style={styles.highlight}>App.js</Text> to change this
  //             screen and then come back to see your edits.
  //           </Section>
  //           <Section title="See Your Changes">
  //             <ReloadInstructions />
  //           </Section>
  //           <Section title="Debug">
  //             <DebugInstructions />
  //           </Section>
  //           <Section title="Learn More">
  //             Read the docs to discover what to do next:
  //           </Section>
  //           <LearnMoreLinks />
  //         </View>
  //       </ScrollView>
  //     </SafeAreaView>
  //   </NavigationContainer>
  // );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
