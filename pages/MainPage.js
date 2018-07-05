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
    Dimensions,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import HttpUtil from "../utils/HttpUtil";
import DataUtil, {KEYS} from "../utils/DataUtil";
import NewsListCell from "../cell/NewsListCell";


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
        this.dataUtil = new DataUtil(KEYS.NEW_CATEGORY);
        this.state = {
            categories: [],
            newslist: [],
            isRefreshing: false
        }
        ;


        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
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
                <Text style={{paddingLeft: 10, fontSize: 18, color: "#EA2000"}}>LeeReader</Text>
            </View>

            <View style={{height:55}}>
            <ScrollableTabView
                style={{borderWidth:1,borderColor:"red"}}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarUnderlineColor='#FF0000'
                tabBarBackgroundColor='#FFFFFF'
                tabBarActiveTextColor='#9B30FF'
                tabBarInactiveTextColor='#7A67EE'
                onChangeTab={(obj) => {

                    this.onTabChange(obj.i);
                }}
                tabBarTextStyle={{fontSize: 14}}>
                {this.state.categories.map((result, i, array) => {
                    let tab = array[i];
                    /*  return tab.isCheck ? <Text style={{textAlign: 'center'}} key={i} tabLabel={tab.name}>
                     </Text> : null;*/

                    return <Text style={{textAlign: 'center'}} key={i} tabLabel={tab.name}>

                    </Text>;
                })}
            </ScrollableTabView>
            </View>
            <FlatList
                data={this.state.list}
                renderItem={(data) => this._renderItem(data)}
                /*  refreshing={this.state.isLoading}
                  onRefresh={this._onRefresh}*/
                refreshControl={
                    <RefreshControl
                        title={"加载中"}
                        colors={["red"]}
                        tintColor={"black"}
                        titleColor={"black"}
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this._onRefresh(true)}
                    />
                }

                ListFooterComponent={() => this._renderFooterView()}
                onEndReached={() => this._onRefresh(false)}
            />

        </View>


    }

    loadData() {
        this.dataUtil.getNewsCategory()
            .then(result => {
                console.log(result);
                let datas = [];
                for (let i = 0; i < result.length; i++) {
                    let category = result[i];
                    if (category.isCheck) {
                        datas.push(category);
                    }
                }


                this.setState({
                    categories: datas
                })
            });
    }

    _renderItem(data) {
        console.log("item======>"+data)
        return <NewsListCell data={data}/>
    }

    onTabChange(index) {
        this.category = this.state.categories[index];

        this.refreshNewsData();


    }


    refreshNewsData() {
        this.httpUtil.getNewsList(this.httpUtil.getUrl(this.category.channelId, this.category.name, "", "", "", "", "", ""))
            .then((result) => {
                console.log(result)
                this.setState({
                    newslist: result,
                    isRefreshing: false
                })
            })
    }


    _renderFooterView() {
        return <View style={styles.footerLayout}>
            <ActivityIndicator
                size={"large"}
                color={"red"}
                animating={true}


            />

            <Text>正在加载更多</Text>


        </View>
    }

    _onRefresh(isRefreshing) {
        if (isRefreshing) {
            this.setState({
                isRefreshing: true
            });
        }

        this.refreshNewsData();


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
