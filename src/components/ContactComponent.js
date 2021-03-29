import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {ThemeContext, Avatar, Text, Divider} from 'react-native-elements';

const ContactComponent = ({navigation, contact}) => {
  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);

  const onPressContactDetail = () => {
    navigation.navigate('ContactDetail', {contact});
  };

  return (
    <TouchableOpacity onPress={onPressContactDetail}>
      <View style={styles.contactContainer}>
        {contact.image ? (
          <Avatar
            rounded
            size="medium"
            source={{
              uri: `${contact.image}`,
            }}
            containerStyle={styles.contactAvatar}
          />
        ) : (
          <Avatar
            rounded
            size="medium"
            title={`${contact?.firstName.substring(0, 1)}`}
            containerStyle={styles.contactAvatar}
          />
        )}
        <Text
          style={
            styles.contactNameText
          }>{`${contact.firstName} ${contact.lastName}`}</Text>
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
};

const useStyles = theme => {
  return StyleSheet.create({
    contactContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.backgroundColor,
      padding: 15,
      alignItems: 'center',
    },
    contactAvatar: {
      backgroundColor: theme.colors.primary,
      marginEnd: 15,
    },
    contactNameText: {
      fontSize: 18,
      color: theme.colors.secondary,
    },
    divider: {
      marginHorizontal: 15,
    },
  });
};

export default ContactComponent;
