/**
 * 倒计时组件
 * author：jorden
 * date：2017-11-19 
 * @param targettime 必须是 "2017-11-11-11-11-11",中间不能少一个，
 * */

var countDown = Vue.extend({
    data: function () {
        return {
            days: 0,
            hours: 0,
            mins: 0,
            secs: 0,
            targettime: this.targettime,
            counter:null,
            countStatus:true,
        }
    },
    props: ["targettime"],


    template: `
        <div>
            <p v-if="countStatus">
                距离{{targettime}}还剩下{{days}}天{{hours}}时{{mins}}分{{secs}}秒
            </p>
        </div>
     `,
    methods: {
        getCountDown: function (str) {
            var dateArr = this.resoveStr(str);
            Y = dateArr[0] || 0;
            M = dateArr[1] || 0;
            D = dateArr[2] || 0;
            h = dateArr[3] || 0;
            m = dateArr[4] || 0;
            s = dateArr[5] || 0;
            var endTime = new Date(Y, M - 1, D, h, m, s);
            var currentTime = new Date();
            var diff = endTime.getTime() - currentTime.getTime();

            if(diff>0){
                this.days = this.checkTime(parseInt(diff / 1000 / 60 / 60 / 24)); //计算剩余的天数 
                this.hours = this.checkTime(parseInt(diff / 1000 / 60 / 60 % 24)); //计算剩余的小时 
                this.mins = this.checkTime(parseInt(diff / 1000 / 60 % 60)); //计算剩余的分钟 
                this.secs = this.checkTime(parseInt(diff / 1000 % 60)); //计算剩余的秒数
            }else{
                clearInterval(this.counter);
                this.$emit('isclosed');
                this.days = 0;
                this.hours = 0; 
                this.mins = 0;
                this.secs = 0;
            }
        },
        resoveStr: function (str) {
            return str.split('-');
        },
        checkTime: function (i) {
            if (i < 10) {
                return '0' + i;
            } else {
                return i
            }
        },
        closedCounter:function(){
            this.countStatus = false;
        }
    },
    mounted: function () {
        this.counter = setInterval(()=>this.getCountDown(this.targettime),1000)
    }
})

Vue.component('count-down', countDown)