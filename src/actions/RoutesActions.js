import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { ROUTES_FETCH_SUCCESS, FAVORITE_ROUTES_FETCH_SUCCESS } from './types';

export const routesFetch = () => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .on('value', snapshot => {
                dispatch({ 
                    type: ROUTES_FETCH_SUCCESS, 
                    payload: snapshot.val() 
                });  
        })
            
    };
};
