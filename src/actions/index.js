import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    ROUTES_FETCH_SUCCESS ,
    RUN_AGAIN,
    START_BUTTON
} from './types'; 

export const routesFetch = () => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .on('value', snapshot => {
                snapshot.forEach((child) => {
                dispatch({ type: ROUTES_FETCH_SUCCESS, payload: snapshot.val() });  
            });
        })
    };
};

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