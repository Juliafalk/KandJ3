import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    ROUTES_FETCH_SUCCESS ,
    RUN_AGAIN,
    START_BUTTON,
    FAVORITE_ROUTES_FETCH_SUCCESS,
    LAST_ROUTE_FETCH
} from './types'; 

export const routesFetch = () => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .on('value', snapshot => {
                dispatch({ type: ROUTES_FETCH_SUCCESS, payload: snapshot.val() });  
            }); 
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

export const favoriteFetch = () => {
    const {currentUser} = firebase.auth();

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .on('value', snapshot => {
                dispatch({ 
                    type: FAVORITE_ROUTES_FETCH_SUCCESS, 
                    payload: snapshot.val() 
                });
            })
        }
};

export const lastRouteFetch = () => {
    const {currentUser} = firebase.auth();
    console.log(currentUser)

    return(dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/routes`)
            .on('value', snapshot => {
                console.log(snapshot.val())
                var theRoutes = snapshot.val()
                console.log(Object.keys(snapshot.val()).length)
                console.log(theRoutes[Object.keys(theRoutes)[Object.keys(theRoutes).length -1 ]])
                var lastRoute = theRoutes[Object.keys(theRoutes)[Object.keys(theRoutes).length -1 ]]
                dispatch({ 
                    type: LAST_ROUTE_FETCH,  
                    payload: snapshot.val()
                });  
            })
            
        };
    };
