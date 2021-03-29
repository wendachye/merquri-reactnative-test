import React, {useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {ThemeContext, SearchBar, Avatar, Text} from 'react-native-elements';
import useContactContext from '../contexts/ContactContext';
import Contact from '../components/ContactComponent';

const SearchContactScreen = ({navigation}) => {
  const {state} = useContactContext();
  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);
  const [searchValue, setSearchValue] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Search Contacts',
      headerTitleStyle: {alignSelf: 'center'},
      headerTintColor: theme.colors.primary,
      headerStyle: {
        backgroundColor: theme.colors.backgroundColor,
      },
    });
  }, [navigation]);

  onChangeText = text => {
    if (/\S/.test(text)) {
      setSearchValue(text);

      const lowercasedFilter = text.toLowerCase();

      const filteredContacts = state.contacts.filter(
        contact =>
          contact?.firstName.toLowerCase().includes(lowercasedFilter) ||
          contact?.lastName.toLowerCase().includes(lowercasedFilter) ||
          contact?.email?.toLowerCase().includes(lowercasedFilter) ||
          contact?.phone?.toLowerCase().includes(lowercasedFilter),
      );

      setFilteredContacts(filteredContacts);
    } else {
      setSearchValue('');
      setFilteredContacts([]);
    }
  };

  return (
    <>
      <SearchBar
        placeholder="Search"
        onChangeText={onChangeText}
        value={searchValue}
      />
      <View style={styles.container}>
        <FlatList
          data={filteredContacts}
          renderItem={({item}) => {
            return <Contact navigation={navigation} contact={item} />;
          }}
          keyExtractor={contact => contact.id}
        />
      </View>
    </>
  );
};

const useStyles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
    },
    headerLeftButton: {
      marginStart: 10,
    },
    headerRightButton: {
      marginEnd: 10,
    },
  });
};

export default SearchContactScreen;
