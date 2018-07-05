import {AsyncStorage, ToastAndroid} from 'react-native'
import categories from "../res/datas/categories.json";

export const KEYS = {NEW_CATEGORY: "NEW_CATEGORY"}

export default class DataUtil {
    constructor(key) {
        this.key = key;
    }

    getNewsCategory() {
      return  new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.key, (error, result) => {
                //如果没有获取到分类数据，就把本地的再存一份
                if (result === null || result.length === 0) {
                    this.saveNewsCategory();
                    resolve(categories);
                }

                if (result !== null) {
                    resolve(JSON.parse(result));
                }
            })
        })

    }

    /**
     * 保存新闻分类数据
     */
    saveNewsCategory() {
        new Promise((resolve, reject) => {
            AsyncStorage.setItem(this.key, JSON.stringify(categories), (error) => {
                ToastAndroid.show("分类是数据初始化成功,1000");
            })
        })
    }


}