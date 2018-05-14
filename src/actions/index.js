import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import thunk from 'redux-thunk';

import { 
    RUN_AGAIN,
    START_BUTTON,
    ROUTES_FETCH_SUCCESS,
    FAVORITE_ROUTES_FETCH_SUCCESS,
    LAST_ROUTE_FETCH
} from './types'; 

export const runAgain = (wayPoints) => {
    return{ 
        type: RUN_AGAIN, 
        payload: wayPoints
    }; 
};

export const startButton = (boolean) => {
    return{ 
        type: START_BUTTON,
        payload: boolean
    }; 
};

export const routesFetch = () => {
    const {currentUser} = firebase.auth();
        return(dispatch) => {
            if (currentUser != null){
            firebase.database().ref(`/users/${currentUser.uid}/routes`)
                .on('value', snapshot => {
                    dispatch({ type: ROUTES_FETCH_SUCCESS, payload: snapshot.val() });  
                }); 
            }
        };
};

export const favoriteFetch = () => {
    const {currentUser} = firebase.auth();

        return(dispatch) => {
            if (currentUser != null){
            firebase.database().ref(`/users/${currentUser.uid}/routes`)
                .on('value', snapshot => {
                    dispatch({ 
                        type: FAVORITE_ROUTES_FETCH_SUCCESS, 
                        payload: snapshot.val() 
                    });
                })
            }
        }
};

export const lastRouteFetch = () => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        if(currentUser != null){
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .on('value', snapshot => {
                if(snapshot.val() != null)
                dispatch({ 
                    type: LAST_ROUTE_FETCH,  
                    payload: snapshot.val()
                });  
            })
        }
    };
};
