/*This it the file that calls the StartPage. 
Later in the progress an if-state could be usefull here, to decide
if startpage or map should be shown direct (like if the user already is signed in)
/ JF (11/4)
*/
import React, { Component } from 'react';
import StartPage from './components/StartPage';


class App extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    render() {
        return <StartPage />;
    }
}
export default App;
