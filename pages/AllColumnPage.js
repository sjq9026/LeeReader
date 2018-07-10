/**
 * Created by wuyanhua on 2018/7/7.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,Image, Text, View,ScrollView ,TouchableOpacity} from 'react-native';

import HttpUtil from "../utils/HttpUtil";
import DataUtil, {KEYS} from "../utils/DataUtil";
import NewsListCell from "../cell/NewsListCell";



export default class AllColumnPage extends Component{
    constructor(props) {
        super(props);
        this.httpUtil = new HttpUtil();
        this.dataUtil = new DataUtil(KEYS.NEW_CATEGORY);
        this.state = {
            selected:[],
            notSelected:[]
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData =()=>{
        this.dataUtil.getNewsCategory()
            .then(result => {
                if(result && result.length>0){
                    let selectedArr = [];
                    let notSelectedArr = [];
                    for (let i = 0; i < result.length; i++) {
                        let category = result[i];
                        if (category.isCheck) {
                            selectedArr.push(category);
                        }else{
                            notSelectedArr.push(category);
                        };
                    };
                    this.setState({
                        selected: selectedArr,
                        notSelected: notSelectedArr
                    });
                };
            });
    }

    clickEvent=(data,index)=>{
        let selectedData=this.state.selected;
        let notSelectedData=this.state.notSelected;

        if(data.isCheck){
            selectedData.splice(index,1);
            data.isCheck=false;
            notSelectedData.splice(0,0,data)
        }else{
            selectedData.push(data);
            data.isCheck=true;
            notSelectedData.splice(index,1);
        };

        this.setState({
            selected:selectedData,
            notSelected:notSelectedData
        })
    }

    showColumn=(dataArr,title)=>{
        let columnContent=null;
        let _this=this;
        //是否显示标题
        let textContent=dataArr.length>0?<Text style={styles.text}>{title}</Text>:null;

        columnContent=dataArr.map(function(data,index){
            let fontStyle=data.name.length>4?{fontSize:12}:null;

            return (
                <TouchableOpacity
                    style={styles.nameWrapper}
                    key={index}
                    onPress={()=>{_this.clickEvent(data,index)}}
                >
                    <Text style={[styles.name,fontStyle]}>{data.name}</Text>
                </TouchableOpacity>
            )

        })

        return (
            <View>
                {textContent}
                <View style={styles.columnWrapper}>
                    {columnContent}
                </View>
            </View>
        )
    }

    closeClick=()=>{
        let {selected,notSelected}=this.state;
        let newArr=selected.concat(notSelected);
        this.dataUtil.saveNewsCategory(newArr);
    }

    render() {
        let {selected,notSelected}=this.state;
        let _this=this;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.title}>
                    <Text>所有栏目</Text>
                    <TouchableOpacity style={styles.close} onPress={_this.closeClick}>
                        <Image style={{width:16,height:16}} source={require('./image/close.png')}/>
                    </TouchableOpacity>
                </View>
                {this.showColumn(selected,"我的栏目")}
                {this.showColumn(notSelected,"更多栏目")}
            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30,
        paddingBottom:30,
        paddingLeft:15,
        paddingRight:15,
    },
    title:{
        height:40,
        width:"100%",
        alignItems:'center',
        justifyContent:'center'
    },
    close:{
        position:'absolute',
        top:12,
        right:12,
        width:16,
        height:16
    },
    text:{
        height:34,
        lineHeight:34,
        fontSize:14,
        color:'#333'
    },
    columnWrapper:{
        flexDirection:'row',
        flexWrap:"wrap",
    },
    nameWrapper:{
        width:"25%",
        marginBottom:8,
        alignItems:'center',
        justifyContent:"center"
    },
    name:{
        width:"90%",
        height:30,
        lineHeight:30,
        textAlign:'center',
        fontSize:14,
        color:'#666',
        borderWidth:1,
        borderColor:'#c2c2c2',
        borderRadius:6,
        padding:0
    }
});
