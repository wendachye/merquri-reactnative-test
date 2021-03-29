import {useReducer, useCallback} from 'react';
import rawContacts from '../../data.json';
import * as utils from '../utils/stringUtils';

const sortFirstName = (a, b) => {
  if (a.firstName < b.firstName) {
    return -1;
  }
  if (a.firstName > b.firstName) {
    return 1;
  }
  return 0;
};

const initialState = {
  isLoading: false,
  contacts: rawContacts.sort(sortFirstName),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_CONTACTS': {
      return {
        ...state,
        contacts: rawContacts.sort(sortFirstName),
      };
    }
    case 'ADD_NEW_CONTACT': {
      let newContact = {
        ...action.contact,
        id: utils.createUUID(),
      };

      let newContacts = [...state.contacts, newContact];

      return {
        ...state,
        contacts: newContacts.sort(sortFirstName),
      };
    }
    case 'EDIT_NEW_CONTACT': {
      let newContacts = [...state.contacts];

      let contactEdit = newContacts.find(
        contact => contact.id === action.contact.id,
      );

      if (contactEdit) {
        contactEdit.firstName = action.contact.firstName;
        contactEdit.lastName = action.contact.lastName;
        contactEdit.email = action.contact.email;
        contactEdit.phone = action.contact.phone;
      }

      return {
        ...state,
        contacts: newContacts,
      };
    }
    default:
      return state;
  }
};

export default contactReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const restoreContacts = useCallback(
    () => dispatch({type: 'RESTORE_CONTACTS'}),
    [],
  );

  const addNewContact = useCallback(
    contact => dispatch({type: 'ADD_NEW_CONTACT', contact}),
    [],
  );

  const editNewContact = useCallback(
    contact => dispatch({type: 'EDIT_NEW_CONTACT', contact}),
    [],
  );

  return {
    state,
    restoreContacts,
    addNewContact,
    editNewContact,
  };
};
