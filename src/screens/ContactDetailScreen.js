import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  ThemeContext,
  Text,
  Avatar,
  Input,
  Divider,
} from 'react-native-elements';
import * as utils from '../utils/stringUtils';

const ContactDetailScreen = ({navigation, route}) => {
  const {addNewContact, editNewContact} = useContactContext();
  const {theme} = useContext(ThemeContext);
  const styles = useStyles(theme);
  const contact = route.params?.contact;
  const [value, setValue] = useState({
    id: contact?.id || '',
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    image: contact?.image || '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerLeftButton}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={onPressSaveContact}>
          <Text style={styles.headerRightButton}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, value]);

  const validateForm = () => {
    if (!utils.regNotEmpty(value.firstName)) {
      Alert.alert('First Name is required');

      return false;
    }

    if (!utils.regNotEmpty(value.lastName)) {
      Alert.alert('Last Name is required');

      return false;
    }

    if (utils.regNotEmpty(value.email) && !utils.regEmail(value.email)) {
      Alert.alert('Email format is incorrect');

      return false;
    }

    if (!utils.regNotEmpty(value.phone)) {
      Alert.alert('Phone No is required');

      return false;
    }

    return true;
  };

  const onPressSaveContact = async () => {
    try {
      if (validateForm()) {
        if (contact) {
          await editNewContact(value);
        } else {
          await addNewContact(value);
        }
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          {value.image ? (
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri: `${contact.image}`,
              }}
              containerStyle={styles.contactAvatar}
            />
          ) : (
            <Avatar
              rounded
              size="xlarge"
              title={`${contact?.firstName.substring(0, 1) || ''}`}
              containerStyle={styles.contactAvatar}
            />
          )}
        </View>
        <Text style={styles.titleText}>Main Information</Text>
        <View style={styles.contactContainer}>
          <View style={styles.contactFlexRow}>
            <View style={{flex: 0.3}}>
              <Text style={styles.contactDetailTitleText}>First Name</Text>
            </View>
            <View style={{flex: 0.7}}>
              <Input
                placeholder="First Name"
                value={value.firstName}
                onChangeText={text =>
                  setValue({
                    ...value,
                    firstName: text,
                  })
                }
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
            </View>
          </View>
          <Divider />
          <View style={styles.contactFlexRow}>
            <View style={{flex: 0.3}}>
              <Text style={styles.contactDetailTitleText}>Last Name</Text>
            </View>
            <View style={{flex: 0.7}}>
              <Input
                placeholder="Last Name"
                value={value.lastName}
                onChangeText={text =>
                  setValue({
                    ...value,
                    lastName: text,
                  })
                }
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
            </View>
          </View>
        </View>
        <Text style={styles.titleText}>Sub Information</Text>
        <View style={styles.contactContainer}>
          <View style={styles.contactFlexRow}>
            <View style={{flex: 0.3}}>
              <Text style={styles.contactDetailTitleText}>Email</Text>
            </View>
            <View style={{flex: 0.7}}>
              <Input
                placeholder="Email"
                value={value.email}
                onChangeText={text =>
                  setValue({
                    ...value,
                    email: text,
                  })
                }
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
            </View>
          </View>
          <Divider />
          <View style={styles.contactFlexRow}>
            <View style={{flex: 0.3}}>
              <Text style={styles.contactDetailTitleText}>Phone</Text>
            </View>
            <View style={{flex: 0.7}}>
              <Input
                placeholder="Phone"
                value={value.phone}
                onChangeText={text =>
                  setValue({
                    ...value,
                    phone: text,
                  })
                }
                containerStyle={styles.containerStyle}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const useStyles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    headerLeftButton: {
      marginStart: 10,
      color: theme.colors.primary,
      fontSize: 18,
    },
    headerRightButton: {
      marginEnd: 10,
      color: theme.colors.primary,
      fontSize: 18,
    },
    avatarContainer: {
      paddingVertical: 15,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    contactAvatar: {
      backgroundColor: theme.colors.primary,
    },
    titleText: {
      fontSize: 20,
      fontWeight: '500',
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    contactContainer: {
      paddingHorizontal: 15,
      backgroundColor: 'white',
    },
    contactFlexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactDetailTitleText: {
      fontSize: 16,
    },
    containerStyle: {
      maxHeight: 36,
      marginTop: 5,
      marginBottom: 10,
    },
    inputStyle: {
      height: 36,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    inputContainerStyle: {
      borderRadius: 5,
      borderColor: 'grey',
      borderWidth: 1,
    },
  });
};

export default ContactDetailScreen;
