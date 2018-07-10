/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';



export default class NewDetailPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            url: url,
            title: "",
            canGoBack: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <TouchableHighlight onPress={this.leftBtnClick}>
                        <Image source={require("../imgs/ic_arrow_back_white_36pt.png")}
                               style={{height: 25, width: 25, marginLeft: 20}}>
                        </Image>
                    </TouchableHighlight>

                    <Text style={{color: "white"}}>{this.titleStr}</Text>

                    <View style={styles.right}>
                        <TouchableHighlight onPress={this.shareClick}>
                            <Image source={require("../imgs/ic_arrow_back_white_36pt.png")}
                                   style={{height: 20, width: 20}}>
                            </Image>
                        </TouchableHighlight>
                        <TouchableHighlight style={{width: 20, height: 20, marginRight: 15, marginLeft: 15}}
                                            onPress={this.favoriteClick}>
                            <Image source={img}
                                   style={{height: 20, width: 20}}>
                            </Image>
                        </TouchableHighlight>
                    </View>


                </View>


                <WebView source={{uri: this.state.url}}
                         ref="webview"
                         onNavigationStateChange={(e) => {
                             this.onWebViewStateChange(e)
                         }}
                />
            </View>

        );
    }


    componentDidMount() {
        let that = this;
        this.timer = setInterval(function () {
            that.jumpAPPage();
        }, 3000)
    }

    jumpAPPage() {
        this.props.navigation.navigate('MainPage');
        clearInterval(this.timer);
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        height: 40,
        width: width,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#377DFE',
    },
    right: {
        height: 40,
        flexDirection: "row",
        alignItems: 'center',

    }
});
