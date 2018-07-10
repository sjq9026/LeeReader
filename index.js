import { AppRegistry } from 'react-native';
import App from './App';
import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation'

import WelcomePage from "./pages/WelcomePage";
import MainPage from "./pages/MainPage";
import AllColumnPage from "./pages/AllColumnPage";


const pages = StackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null
            }
        },
        MainPage: {
            screen: MainPage,
            navigationOptions: {
                header: null
            }
        }
    })

AppRegistry.registerComponent('LeeReader', () => AllColumnPage);
