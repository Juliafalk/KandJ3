import { AppRegistry } from 'react-native';
import App from './src/App';
import { YellowBox } from 'react-native'; //JG 20/4 removes the yellow warning
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    , 'Warning: Cannot update during an existing']);  

AppRegistry.registerComponent('LastTry', () => App);