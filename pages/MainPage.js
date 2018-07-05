/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import HttpUtil from "../utils/HttpUtil";
import categories from "../res/datas/categories.json"

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const ScreenWidth = Dimensions.get("window").width;
export default class MainPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.httpUtil = new HttpUtil();
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }


    loadData() {
        this.httpUtil.getNewsList(this.httpUtil.getUrl(categories[0].channelId, categories[0].name, "", "", "", "", "", ""))
            .then((result) => {

            })
    }


    render() {
        return <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 50,
                width: ScreenWidth,
                backgroundColor: "#F5FCFF"
            }}>
                <Text>Popular</Text>
            </View>


            <ScrollableTabView
                initialPage={1}
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarUnderlineColor='#FF0000'
                tabBarBackgroundColor='#FFFFFF'
                tabBarActiveTextColor='#9B30FF'
                tabBarInactiveTextColor='#7A67EE'
                tabBarTextStyle={{fontSize: 18}}>
                <Text tabLabel='Tab #1'>My</Text>
                <Text tabLabel='Tab #2'>favorite</Text>
                <Text tabLabel='Tab #3'>project</Text>
                <Text tabLabel='Tab #4'>4444</Text>
                <Text tabLabel='Tab #5'>5555</Text>
                <Text tabLabel='Tab #6'>66666</Text>
                <Text tabLabel='Tab #7'>77777</Text>
            </ScrollableTabView>;

        </View>


    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    welcome: {
        fontSize: 60,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
