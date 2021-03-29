import React, {useContext, useLayoutEffect, useState} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import {ThemeContext, Icon} from 'react-native-elements';
import useContactContext from '../contexts/ContactContext';
import Contact from '../components/ContactComponent';

const ContactListScreen = ({navigation}) => {
  const {state, restoreContacts} = useContactContext();
  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Contacts',
      headerTitleStyle: {alignSelf: 'center'},
      headerTintColor: theme.colors.primary,
      headerStyle: {
        backgroundColor: theme.colors.backgroundColor,
      },
      headerLeft: () => (
        <Icon
          name="search"
          size={28}
          color={theme.colors.primary}
          onPress={onPressSearchContact}
          containerStyle={styles.headerLeftButton}
        />
      ),
      headerRight: () => (
        <Icon
          name="add"
          size={28}
          color={theme.colors.primary}
          onPress={onPressAddContact}
          containerStyle={styles.headerRightButton}
        />
      ),
    });
  }, [navigation]);

  const onRefresh = () => {
    try {
      setRefreshing(true);
      restoreContacts();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const onPressSearchContact = () => {
    navigation.navigate('SearchContact');
  };

  const onPressAddContact = () => {
    navigation.navigate('ContactDetail');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.contacts}
        renderItem={({item}) => {
          return <Contact navigation={navigation} contact={item} />;
        }}
        keyExtractor={contact => contact.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
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

export default ContactListScreen;
