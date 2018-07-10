import {AppRegistry} from 'react-native';

import {StackNavigator} from 'react-navigation'

import WelcomePage from "./pages/WelcomePage";
import MainPage from "./pages/MainPage";
import AllColumnPage from "./pages/AllColumnPage";
import NewDetailPage from "./pages/NewDetailPage";


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
        },
        NewDetailPage: {
            screen: NewDetailPage,
            navigationOptions: {
                header: null
            }
        }
    })

AppRegistry.registerComponent('LeeReader', () => pages);
