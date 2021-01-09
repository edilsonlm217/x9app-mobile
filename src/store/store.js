import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import api from '../services/api';

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const store = createContext(initialState);
const { Provider } = store;

function StateProvider({ children }) {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.payload.token,
        };

      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.payload.userToken,
        };

      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };

      default:
        throw new Error();
    }
  }, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('@auth_token');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({
        type: 'RESTORE_TOKEN',
        payload: {
          userToken,
        },
      });
    };

    bootstrapAsync();
  }, []);

  const methods = React.useMemo(
    () => ({
      signIn: async (data) => {
        const { login, password } = data;

        try {
          const response = await api.post('session', {
            login,
            password,
          }, {
            timeout: 10000,
          });

          const { token, user } = response.data;

          const auth_token_key = ['@auth_token', response.data.token.toString()];

          try {
            await AsyncStorage.multiSet([
              auth_token_key,
            ]);
          } catch (e) {
            Alert.alert('Erro', 'Não foi possível salvar dados na Storage');
          }

          dispatch({
            type: 'SIGN_IN',
            payload: {
              token,
            },
          });

          return true;
        } catch (err) {
          if (err.message.includes('401')) {
            Alert.alert('Erro', 'Usuário ou senha inválidos');
          } else {
            Alert.alert('Erro de conexão', 'Não foi possível encontrar o servidor');
          }
          return true;
        }
      },

      saveTenantKey: async (data) => {
        const restoreKeyStatus = data;

        try {
          const saveToStorage = ['@restore_key_status', restoreKeyStatus.toString()];

          await AsyncStorage.multiSet([
            saveToStorage,
          ]);
        } catch (error) {
          console.log('Deu erro na hora de salvar no AsyncStorage');
        }

        dispatch({
          type: 'SAVE_KEY_PREFERENCES',
          payload: {
            restoreKeyStatus,
          },
        });
      },

      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }), [],
  );

  return <Provider value={{ state, methods }}>{children}</Provider>;
}

export { store, StateProvider };
