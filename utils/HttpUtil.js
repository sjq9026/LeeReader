import Constants from "./Constants";

export default class HttpUtil {

    static MAX_RESULT = "20";

    /**
     * 根据传入的数据获取完整的url 所有参数均为非必须参数
     * @param channelId   新闻频道id，必须精确匹配
     * @param channelName 新闻频道名称，可模糊匹配
     * @param title       标题名称，可模糊匹配
     * @param _page        页数，默认1。每页最多20条记录。
     * @param _needContent 是否需要返回正文，1为需要，其他为不需要
     * @param _needHtml    是否需要返回正文的html格式，1为需要，其他为不需要
     * @param _needAllList 是否需要最全的返回资料。包括每一段文本和每一张图。用list的形式返回。1返回全部 其他 不返回全部
     * @param id          新闻id，可用此信息取得一条新闻记录
     * @returns {string}
     */
    getUrl(channelId, channelName, title, _page, _needContent, _needHtml, _needAllList, id) {
        let page = _page === "" ? "1" : _page;
        let needContent = _needContent === "" ? "0" : _needContent;
        let needHtml = _needHtml === "" ? "0" : _needHtml;
        let needAllList = _needAllList === "" ? "0" : _needAllList;

        return Constants.URL_ADDRESS +
            "channelId=" + channelId +
            "&channelName" + channelName +
            "&title=" + title +
            "&page=" + page +
            "&showapi_appid=" + "68784" +
            "&needContent=" + needContent +
            "&needHtml=" + needHtml +
            "&needAllList=" + needAllList +
            "&maxResult=" + Constants.MAX_RESULT +
            "&id=" + id +
            "&showapi_sign=" + "7eba4e72cac6424791e04cdb758149d7";
    }

    /**
     * 获取新闻列表数据
     * @param url
     * @returns {Promise}
     */
    getNewsList(url) {
        console.log("getNewsListURL-------->" + url);
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then((result) => {
                    console.log(JSON.stringify(result));
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                })
        })

    }


}