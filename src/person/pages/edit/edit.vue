<template>
    <view class="container">
        <cell cType="input" :value="infoObj.name" valueType="name" @cellValue="handleCellValue" title="真实姓名"></cell>
        <cell cType="popup" :value="infoObj.sex" valueType="sex" :cList="sexList" @cellValue="handleCellValue" title="性别"></cell>
        <cell cType="date" :value="infoObj.date" @cellValue="handleCellValue" title="出生年月" start="1950-1-1" :end="now" bottom></cell>
        <view class="addBottom"></view>
        <cell cType="popup" :value="infoObj.status" valueType="status" :cList="stateList" @cellValue="handleCellValue" title="当前身份" bottom></cell>
        <view class="addBottom"></view>
        <cell cType="input" :value="infoObj.phone" valueType="phone" @cellValue="handleCellValue" title="手机号码"></cell>
        <cell cType="input" :value="infoObj.email" valueType="email" @cellValue="handleCellValue" title="联系邮箱" bottom></cell>
        <view class="addBottom"></view>
        <cell cType="navigator" cUrl="../../../pages/selectRegion/selectRegion?mode=info" title="所在城市" :value="infoObj.currentCity" bottom></cell>
        <view class="addBottom"></view>
        <button class="save_btn" @click="saveInfo">保存</button>
    </view>
</template>

<script>
import cell from '@/components/cell/cell'
import { getNowDate } from '@/utils/utils'
export default {
    data() {
        return {
            sexList: ['男', '女'],
            stateList: ['学生', '应届毕业生', '在职'],
            now: '',
            infoObj: {}
        }
    },
    onLoad() {
        this.infoObj = uni.getStorageSync('infoObj') || {}
        this.now = getNowDate()
    },
    onShow() {
        uni.$on('resumeRegion', (data) => {
            //使用$set将对象中的属性处理成响应式
            this.$set(this.infoObj, 'currentCity', data)
            console.log(this.infoObj)
        })
    },
    components: {
        cell
    },
    methods: {
        handleCellValue(e) {
             this.$set(this.infoObj, e.type, e.value)
            console.log(this.infoObj)
        },
        saveInfo() {
            uni.setStorageSync('infoObj', this.infoObj)
            uni.showToast({
                title: '保存成功'
            }).then(() => {
                setTimeout(() => {
                    uni.navigateBack({
                        delta: 1
                    });
                },1000)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    .addBottom {
        height: 20rpx;
        width: 100%;
        background-color: $back-color;
    }
    .save_btn {
        margin: 120rpx auto;
        width: 500rpx;
        height: 80rpx;
        color: $border-color;
        background-color: $theme-color;
        display: flex;
        align-items: center;
        justify-content: center;

    }
}
</style>