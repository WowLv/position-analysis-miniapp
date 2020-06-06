<template>
    <view class="container">
        <view class="navbar_list">
            <view class="navbar_item" @click="open" data-type="posPop">职位<text class="iconfont icon-arrow-down"></text></view>
            <view class="navbar_item" @click="open" data-type="companyPop" >公司<text class="iconfont icon-arrow-down"></text></view>
            <view class="navbar_item" @click="open" data-type="sortPop" >排序<text class="iconfont icon-arrow-down"></text></view>
        </view>
        <pop-up ref="posPop" type="bottom" class="pop_up">
            <view class="filter">
                <scroll-view scroll-y class="filter_list">
                    <uni-list>
                        <uni-list-item v-for="(item1, index1) in posFilter" :key="index1">
                            <text class="title">{{item1.name}}</text>
                            <view 
                            v-for="(item2, index2) in item1.value" 
                            :key="index2" 
                            class="item" 
                            :class="{actived: activedList.some(item => item === item2)}"
                            :data-item="item2"
                            @click="filterSelect">
                                <text>{{item2}}</text>
                            </view>
                        </uni-list-item>
                    </uni-list>
                </scroll-view>
                <view class="pos_btn">确定</view>
            </view>
        </pop-up>
        <pop-up ref="companyPop" type="bottom" class="pop_up">
           <view class="filter">
                <scroll-view scroll-y class="filter_list">
                    <uni-list>
                        <uni-list-item v-for="(item1, index1) in companyFilter" :key="index1">
                            <text class="title">{{item1.name}}</text>
                            <view 
                            v-for="(item2, index2) in item1.value" 
                            :key="index2" 
                            class="item"
                            :class="{actived: activedList.some(item => item === item2)}"
                            :data-item="item2"
                            @click="filterSelect">
                                <text>{{item2}}</text>
                            </view>
                        </uni-list-item>
                    </uni-list>
                </scroll-view>
                <view class="pos_btn">确定</view>
            </view>
        </pop-up>
        <pop-up ref="sortPop" type="bottom" class="pop_up">
            <view class="filter">
                <scroll-view scroll-y class="sort_filter_list">
                    <uni-list>
                        <uni-list-item class="sort_item">综合排序</uni-list-item>
                        <uni-list-item class="sort_item">时间排序</uni-list-item>
                    </uni-list>
                </scroll-view>
                <view class="pos_btn">确定</view>
            </view>
        </pop-up>
    </view>
</template>

<script>
import PopUp from '../uni-popup/uni-popup'
// import { test } from '../../../utils/api'
export default {
    data() {
        return {
            posFilter: [
                { name: '月薪范围', value: ['2k以下','2k-5k','5k-10','10k-15k','15k-25k','25k-50k','50k以上'] },
                { name: '工作经验', value: ['应届毕业生', '三年及以下', '3-5年', '5-10年', '十年以上','经验不限'] },
                { name: '学历要求', value: ['大专','本科','硕士','博士','不限'] },
                { name: '工作性质', value: ['全职','兼职','实习'] }
            ],
            companyFilter: [
                { name: '公司规模', value: ['少于15人','15-50人','50-150人','150-500人','500-2000人','2000人以上'] },
                { name: '融资阶段', value: [ '天使轮','A轮','B轮','C轮','D轮及以上','上市公司','不需要融资'] },
                { name: '行业领域', value: ['不限','移动互联网','电商','金融','企业服务','教育','游戏','消费生活','硬件','社交','旅游','体育','工具','广告营销','数据服务','信息安全','人工智能','区块链','VR','AR','软件开发','通讯','房产家居','其他']}
            ],
            activedList: []
        }
    },
    components: {
        PopUp
    },
    methods: {
        open(e) {
            let type = e.currentTarget.dataset.type
            this.$refs[type].open()
        },
        filterSelect(e) {
            let item = e.currentTarget.dataset.item
            console.log(item)
            if(this.activedList.indexOf(item) === -1) {
                this.activedList.push(item)
            }else {
                this.activedList.splice(this.activedList.indexOf(item),1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    .navbar_list {
        display: flex;
        .navbar_item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70rpx;
            flex: 1;
            color: $middle-color;
            font-size: $main-size
        }
    }
    .pop_up {
        .filter {
            background-color: $back-color;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30rpx 0;
            .filter_list {
                height: 50vh;
                color: $main-color;
                width: 92%;
                margin-bottom: 30rpx;
                .actived {
                    color: white;
                    background-color: $actived-color;
                }
                .title {
                    margin: 30rpx 0;
                    font-size: $main-size;
                    display: block;
                    font-weight: 500;
                }
                .item {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 165rpx;
                    height: 60rpx;
                    font-size: 27rpx;
                    padding: 8rpx 0;
                    margin: 10rpx 5rpx;
                    border: 1rpx solid $circle-border-color;
                }
            }
            .sort_filter_list {
                height: 10vh;
                color: $main-color;
                width: 92%;
                margin-bottom: 30rpx;
                .sort_item {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    font-size: $main-size;
                    width: 320rpx;
                    height: 60rpx;
                    padding: 8rpx 0;
                    margin: 10rpx 8rpx;
                    border: 1rpx solid $circle-border-color;
                }
            }
            .pos_btn {
                width: 92%;
                background-color: $actived-color;
                color: white;
                font-size: $main-size;
                border-radius: 6rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20rpx 0;
            }
            
        }
        
    }
}
    
</style>