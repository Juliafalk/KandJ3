import firebase from 'firebase';
import { LAST_ROUTE_FETCH } from './types';

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
                /*snapshot.forEach((child) => {
                    console.log(child.val())
                
            });*/
        })
            
    };
};