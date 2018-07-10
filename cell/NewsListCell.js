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
    Dimensions,
    TouchableHighlight
} from 'react-native';


const ScreenWidth = Dimensions.get("window").width;
export default class NewsListCell extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        let {data} = this.props;
        let item = null;
        if (data.imageurls.length === 0) {
            item = <View style={styles.strlayout}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.laiyuan}>来源：{data.source}</Text>
            </View>
        } else if (data.imageurls.length < 3) {
            item = <View style={styles.imglayout}>
                <Image style={{height: 60, width: 60}}
                       source={{uri: data.imageurls[0].url}}>

                </Image>
                <View style={{height: 80, width: (ScreenWidth - 20 - 60)}}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.laiyuan}>来源：{data.source}</Text>
                </View>
            </View>
        } else {
            item = <View style={styles.moreimglayout}>
                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                    <Image style={{height: 60, width: (ScreenWidth - 50) / 3, marginRight: 5}}
                           source={{uri: data.imageurls[0].url}}>

                    </Image>
                    <Image style={{height: 60, width: (ScreenWidth - 50) / 3, marginLeft: 5, marginRight: 5}}
                           source={{uri: data.imageurls[1].url}}>

                    </Image>
                    <Image style={{height: 60, width: (ScreenWidth - 50) / 3, marginLeft: 5}}
                           source={{uri: data.imageurls[2].url}}>

                    </Image>
                </View>
                <View style={styles.strlayout}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={{
                        color: "#B9B9B9",
                        fontSize: 14, marginTop: 0
                    }}>来源：{data.source}</Text>
                </View>


            </View>
        }

        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.props.onNewItemSelect}>

                    {item}

                </TouchableHighlight>


                <View>
                    <Text style={{
                        height: 1,
                        width: ScreenWidth - 30,
                        backgroundColor: "#B9B9B9",
                        marginBottom: 10
                    }}>

                    </Text>

                </View>

            </View>
        );
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,

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


    },
    imglayout: {

        flexDirection: "row",
        alignItems: "center",
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
        textAlign: "left",
        color: "#525353",


    },
    laiyuan: {

        color: "#B9B9B9",
        fontSize: 14
    }

});
