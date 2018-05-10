import firebase from 'firebase';
import { FAVORITE_ROUTES_FETCH_SUCCESS } from './types';

export const favoriteFetch = () => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .on('value', snapshot => {
                dispatch({ 
                    type: FAVORITE_ROUTES_FETCH_SUCCESS, 
                    payload: snapshot.val() 
                });  
                /*snapshot.forEach((child) => {
                dispatch({ 
                    type: ROUTES_FETCH_SUCCESS, 
                    payload: snapshot.val() 
                });  
            });*/
        })
            
    };
};
