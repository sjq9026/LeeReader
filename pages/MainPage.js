/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    RefreshControl,
    ActivityIndicator,

} from 'react-native';
import HttpUtil from "../utils/HttpUtil";
import DataUtil, {KEYS} from "../utils/DataUtil";
import NewsListCell from "../cell/NewsListCell";


const ScreenWidth = Dimensions.get("window").width;

export default class MainPage extends Component<Props> {

    constructor(props) {
        super(props);
        this.httpUtil = new HttpUtil();
        this.dataUtil = new DataUtil(KEYS.NEW_CATEGORY);
        this.category = null;
        this.curreentPage = 1;
        this.state = {
            categories: [],
            newsList: [],
            isRefreshing: false
        };


        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        let tabviews = null;
        let scrollTab = null;
        if (this.state.categories.length > 0) {
            tabviews = this.state.categories.map((result, i, array) => {
                let tab = array[i];
                /*  return tab.isCheck ? <Text style={{textAlign: 'center'}} key={i} tabLabel={tab.name}>
                 </Text> : null;*/

                return <Text style={{textAlign: 'center'}} key={i} tabLabel={tab.name}>

                </Text>;
            })

            scrollTab = <View style={{height: 35}}>
                <ScrollableTabView
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
                    {tabviews}
                </ScrollableTabView>
            </View>
        }


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
            {scrollTab}

            <FlatList
                ref="_flatList"
                data={this.state.newsList}
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
                ListEmptyComponent={() => this._emptyComponent()}
                onEndReached={() => this._loadMore()}
            />

        </View>


    }

    loadData() {
        this.dataUtil.getNewsCategory()
            .then(result => {
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

                if (this.category === null) {
                    this.category = this.state.categories[0];
                }
                this.refreshNewsData();


            });


    }

    _renderItem(data) {
        return <NewsListCell key={data.item.id} data={data.item}
                             onNewItemSelect={() => this.onNewItemClick(data.item)}/>


    }

    _emptyComponent() {
        return <View style={{flex: 1, justifyContent: "center"}}>
            <Text style={{alignItems: "center"}}>阿嘞！我也不知道发生了什么。。。</Text>
        </View>
    }

    /**
     * 跳转到新闻详情页面
     */
    onNewItemClick(item) {
        this.props.navigation.navigate("NewDetailPage", {data: item})
    }

    onTabChange(index) {
        this.category = this.state.categories[index];
        this.refreshNewsData();
    }

    _loadMore() {
        this.curreentPage++;
        let length = this.state.newsList;
        this.httpUtil.getNewsList(this.httpUtil.getUrl(this.category.channelId, this.category.name, "", this.curreentPage, "", "", "", ""))
            .then((result) => {
                this.setState({
                    newsList: this.state.newsList.concat(result),
                })
                this.refs._flatList.scrollToIndex({viewPosition: 0, index: length})
            })

    }

    refreshNewsData() {
        this.curreentPage = 1;
        this.httpUtil.getNewsList(this.httpUtil.getUrl(this.category.channelId, this.category.name, "", this.curreentPage, "", "", "", ""))
            .then((result) => {
                this.setState({
                    newsList: result,
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
            <Text style={{alignItems: "center"}}>正在加载更多</Text>


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
    item: {
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        marginBottom: 10,
        width: ScreenWidth - 20,
        marginLeft: 10,
        marginRight: 10
    },
    footerLayout: {
        flexDirection: "column",
        width:ScreenWidth,
        justifyContent:"center",
        alignItems:"center"

    }
});
