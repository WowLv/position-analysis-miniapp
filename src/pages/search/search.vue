<template>
    <view class="container">
        <Top :location="userLocation" :nowInput="_nowInput"></Top>
        <view class="result_box" v-if="_nowInput">
            <text class="result">暂时没有符合搜索条件的职位</text>
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
export default {
    data() {
        return {
            userLocation: '',
            sNowInput: '',
            historyList: [],
            recommendList: ['前端', 'java', 'ui', '自动化测试'],
            campanyList: ['虎牙科技', '字节跳动', 'Bigo', '小鹏汽车', '唯品会']
        }
    },
    onShow() {
        if(this.userInfo.location) {
            this.userLocation = this.userInfo.location
        }
        uni.$on('searchPos', (data) => {
            this.sNowInput = data
        })
    },
    computed: {
        ...mapGetters([
            'userInfo',
            'searchHistory'
        ]),
         _nowInput() {
             return this.sNowInput
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
        clearHistory() {
            uni.showModal({
                content: '确定删除全部搜索记录?',
                success: (res) => {
                    if (res.confirm) {
                        this.clearSearchHistory()
                    }
                }
            });
            
        },
        //点击搜索记录再次搜索
        selectHistory(e) {
             this.searchHistory.map((item) => {
                 if(item.id === e.target.dataset.index) {
                     this.sNowInput = item.value
                 }
            })
        },
        handleSelect(e) {
            const index = e.target.dataset.index
            const type = e.target.dataset.type
            this.sNowInput = this[type][index]

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
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200rpx;
            .result {
                color: $main-color;
                font-size: $main-size;
            }
        }
    }
</style>