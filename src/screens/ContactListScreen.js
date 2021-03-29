import React, {useContext, useLayoutEffect, useEffect, useState} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {ThemeContext, Icon, Avatar, Text, Divider} from 'react-native-elements';
import useContactContext from '../contexts/ContactContext';

const ContactListScreen = ({navigation}) => {
  const {state, restoreContacts} = useContactContext();
  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);
  const [refreshing, serRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Contacts',
      headerTintColor: theme.colors.primary,
      headerLeft: () => (
        <Icon
          name="search"
          color={theme.colors.primary}
          onPress={onPressSearchContact}
          containerStyle={styles.headerLeftButton}
        />
      ),
      headerRight: () => (
        <Icon
          name="add"
          color={theme.colors.primary}
          onPress={onPressAddContact}
          containerStyle={styles.headerRightButton}
        />
      ),
    });
  }, [navigation]);

  const onRefresh = () => {
    try {
      serRefreshing(true);
      restoreContacts();
    } catch (error) {
      console.log(error);
    } finally {
      serRefreshing(false);
    }
  };

  const onPressSearchContact = () => {};

  const onPressAddContact = () => {
    navigation.navigate('ContactDetail');
  };

  const onPressContactDetail = contact => {
    navigation.navigate('ContactDetail', {contact});
  };

  const renderContact = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPressContactDetail(item)}>
        <View style={styles.contactContainer}>
          {item.image ? (
            <Avatar
              rounded
              size="medium"
              source={{
                uri: `${item.image}`,
              }}
              containerStyle={styles.contactAvatar}
            />
          ) : (
            <Avatar
              rounded
              size="medium"
              title={`${item?.firstName.substring(0, 1)}`}
              containerStyle={styles.contactAvatar}
            />
          )}
          <Text
            style={
              styles.contactNameText
            }>{`${item.firstName} ${item.lastName}`}</Text>
        </View>
        <Divider style={styles.divider} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.contacts}
        renderItem={renderContact}
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
    },
    headerLeftButton: {
      marginStart: 10,
    },
    headerRightButton: {
      marginEnd: 10,
    },
    contactContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 15,
      alignItems: 'center',
    },
    contactAvatar: {
      backgroundColor: theme.colors.primary,
      marginEnd: 15,
    },
    contactNameText: {
      fontSize: 18,
    },
    divider: {
      marginHorizontal: 15,
    },
  });
};

export default ContactListScreen;
