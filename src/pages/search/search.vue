<template>
    <view class="container">
        <Top :location="userLocation" :nowInput="_nowInput" @searchPos="nowSearchPos"></Top>
        <view class="result_box" v-if="_nowInput">
            <text class="no_result" v-if="noResult">暂时没有符合搜索条件的职位</text>
            <view class="result_list" v-for="(item, index) in resultShowing" :key="index" v-else>
                <text class="result"><text class="iconfont icon-icon_search"></text>{{item}}</text>
            </view>
        </view>
        <view v-else class="search_box">
            <!-- 分类搜索 -->
            <navigator url="../selectPosition/selectPosition?mode=search" class="search_filter">
                <text class="title">按分类搜索</text>
                <text class="search_comfirm">技术<text class="iconfont icon-arrow-down"></text></text>
            </navigator>
            <view class="border"></view>
            <view class="search_recommend">
                <!-- 搜索记录 -->
                <view class="search_history">
                    <view class="history_title">搜索记录<text class="iconfont icon-ashbin" @click="clearHistory"></text></view>
                    <view class="history_list" >
                        <text class="history_item" 
                        v-for="item in searchHistory" 
                        :key="item.id"
                        @click="selectHistory"
                        :data-index="item.id">
                        {{item.value}}
                        </text>
                    </view>
                </view>
                <!-- 热门职位 -->
                <view class="recommend">
                    <view class="recommend_title">猜你喜欢</view>
                    <view class="recommend_list" >
                        <text class="recommend_item" 
                        v-for="(item ,index) in recommendList"
                        :key="index"
                        @click="handleSelect"
                        :data-index="index"
                        data-type="recommendList">
                        <text 
                        class="iconfont icon-fire"></text>
                        {{item}}
                        </text>
                    </view>
                </view>
                <!-- 热门公司 -->
                <view class="recommend">
                    <view class="recommend_title">热门公司</view>
                    <view class="recommend_list" >
                        <text class="recommend_item" 
                        v-for="(item ,index) in campanyList"
                        :key="index"
                        @click="handleSelect"
                        :data-index="index"
                        data-type="campanyList">
                        {{item}}
                        </text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import Top from '../../components/top/top'
import { mapGetters, mapActions } from 'vuex'
import { searchPos } from '../../utils/api'
// import { debounce } from '../../utils/utils'
let timer = null

export default {
    data() {
        return {
            userLocation: '',
            sNowInput: '',
            recommendList: ['前端', 'java', 'ui', '自动化测试'],
            campanyList: ['虎牙科技', '字节跳动', 'Bigo', '小鹏汽车', '唯品会'],
            resultList: [],
            noResult: false,
        }
    },
    onLoad() {
        let history = uni.getStorageSync("searchHistory") || []
        this.setSearchHistory(history)
    },
    onShow() {
        if(this.userInfo.location) {
            this.userLocation = this.userInfo.location
        }
        uni.$on('searchPos', (data) => {
            this.nowSearchPos(data)
        })
    },
    onUnload() {
        uni.setStorageSync('searchHistory', this.searchHistory)
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'searchHistory'
        ]),
         _nowInput() {
             return this.sNowInput
         },
         resultShowing() {
             let list = []
             let reg = new RegExp(this.sNowInput,"gi")
             this.resultList.map((itemOut, index) => {
                //  list.push(...item.posLabel.filter(item => {
                //     reg.test(item)
                //  }))
                itemOut.posLabel.map(itemIn => {
                    if(reg.test(itemIn)) {
                        if(list.indexOf(itemIn) === -1) {
                            list.push(itemIn)
                        }
                    }
                })
             })
             return list
         }
    },
    components: {
        Top
    },
    methods: {
        ...mapActions([
            'clearSearchHistory',
            'setSearchHistory'
        ]),
        async _searchPos(key) {
            const res = await searchPos(key)
            console.log(res.data)
            this.resultList = res.data
            if(!res.data.length) {
                this.noResult = true
            }else {
                this.noResult = false
            }
        },
        nowSearchPos(data) {
            console.log(data)
            this.sNowInput = data.trim()
            timer && clearTimeout(timer)
            timer = setTimeout(() => {
                if(data.trim()) {
                    this._searchPos(data.trim())
                }
            }, 800)
        },
        clearHistory() {
            uni.showModal({
                content: '确定删除全部搜索记录?',
                success: (res) => {
                    if (res.confirm) {
                        this.clearSearchHistory()
                    }
                }
            })
        },
        //点击搜索记录再次搜索
        selectHistory(e) {
             this.searchHistory.map((item) => {
                 if(item.id === e.target.dataset.index) {
                     this.nowSearchPos(item.value)
                 }
            })
        },
        handleSelect(e) {
            const index = e.target.dataset.index
            const type = e.target.dataset.type

            this.nowSearchPos(this[type][index])
            const length = this.searchHistory.length
			if(!length) {
                this.setSearchHistory({ value: this.sNowInput, id: 0})
            }else {
                this.setSearchHistory({ value: this.sNowInput, id: length})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        padding: 0 30rpx;
        position: relative;
        .border {
            position: absolute;
            left: 0;
            top: 180rpx;
            width: 100%;
            height: 20rpx;
            background-color: $back-color;
        }
        .search_box {
            .search_filter {
                height: 90rpx;
                width: 100%;
                display: flex;
                align-items: center;
                position: relative;
                margin-top: 10rpx;
                border-top: 1rpx solid $circle-border-color;
                .title {
                    color: $main-color;
                    font-size: $main-size;
                    font-weight: 500;
                }
                .search_comfirm {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    color: $shallow-color;
                    font-size: $middle-size;
                    right: 0;
                }
            }
            .search_recommend {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                .search_history {
                    width: 100%;
                    padding-top: 60rpx;
                    display: flex;
                    flex-direction: column;
                    .history_title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: $main-color;
                        .icon-ashbin {
                            color: $middle-color;
                            font-size: 45rpx;
                        }
                    }
                    .history_list {
                        width: 100%;
                        .history_item {
                            display: inline-block;
                            font-size: $middle-size;
                            color: $middle-color;
                            padding: 15rpx;
                            border: 1rpx solid $circle-border-color;
                            margin: 15rpx 30rpx 15rpx 0;
                        }
                    }
                }
                .recommend {
                    width: 100%;
                    padding-top: 60rpx;
                    display: flex;
                    flex-direction: column;
                    .recommend_title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: $main-color;
                    }
                    .recommend_list {
                        width: 100%;
                        .recommend_item {
                            display: inline-block;
                            font-size: $middle-size;
                            color: $middle-color;
                            padding: 15rpx;
                            border: 1rpx solid $circle-border-color;
                            margin: 15rpx 30rpx 15rpx 0;
                            .icon-fire {
                                margin: 0 10rpx;
                                color: $salary-color;
                            }
                        }
                    }
                    
                }
            }
        }
        .result_box {
            .no_result {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 80rpx 0;
                color: $main-color;
                font-size: $main-size;
            }
            .result_list {
                display: flex;
                flex-direction: column;
                .result {
                    width: 100%;
                    height: 80rpx;
                    line-height: 80rpx;
                    font-size: $main-size;
                    color: $middle-color;
                    .icon-icon_search {
                        font-size: 45rpx;
                        color: $shallow-color;
                        margin-right: 30rpx;
                    }
                }
            }
            
        }
    }
</style>