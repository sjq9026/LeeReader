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
    View,
    Image,
    Dimensions
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const  ScreenWidth = Dimensions.get("window").width;
export default class NewsListCell extends Component<Props> {

    constructor(props) {
        super();
    }

    render() {
        let {data} = this.props;
        let item = null;
        if (data.imageurls.length === 0) {
            item = <View style={styles.strlayout}>
                <View style={styles.strlayout}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.laiyuan}>来源：{data.source}</Text>
                </View>
            </View>
        } else if (data.imageurls.length < 3) {
            item = <View style={styles.imglayout}>
                <Image style={{height: 60, width:60}} source={{uri: data.imageurls[0].url}}>

                </Image>
                <View style={styles.strlayout}>
                    <Text style={{height: 40, lineHeight: 40, textAlign: "center"}}>{data.title}</Text>
                    <Text>来源：{data.source}</Text>
                </View>
            </View>
        } else {
            item = <View style={styles.moreimglayout}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Image style={{height: 60, width: (ScreenWidth-50)/3,marginRight:5}} source={{uri: data.imageurls[0].url}}>

                    </Image>
                    <Image style={{height: 60, width: (ScreenWidth-50)/3,marginLeft:5,marginRight:5}} source={{uri: data.imageurls[1].url}}>

                    </Image>
                    <Image style={{height: 60, width: (ScreenWidth-50)/3,marginLeft:5}} source={{uri: data.imageurls[2].url}}>

                    </Image>
                </View>
                <View style={styles.strlayout}>
                    <Text style={{height: 40, lineHeight: 40, textAlign: "center"}}>{data.title}</Text>
                    <Text>来源：{data.source}</Text>
                </View>

            </View>
        }

        return (
            <View style={styles.container}>
                {item}
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    strlayout: {
        flexDirection: "column",
        height: 80


    },
    imglayout: {
        flexDirection: "row",
        height: 80


    },
    moreimglayout: {
        flexDirection: "column",
        height: 120
    },
    title: {
        fontSize: 16,
        height: 40,
        lineHeight: 40,
        textAlign: "center",
        color: "#525353"
    },
    laiyuan: {
        color: "#B9B9B9",
        fontSize: 14
    }

});
