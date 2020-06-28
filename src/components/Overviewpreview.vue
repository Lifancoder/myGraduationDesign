<template>
  <div class="overall">
<!--    日历-->
    <div class="time-show">
      <i class="my-icontubiaolunkuo-"></i>
      <div class="now-day">{{nowDay}}</div>
      <div class="allDate">
        <div class="now-year">{{nowYear}}</div>
        <span>年</span>
        <div class="now-month">{{nowMonth}}</div>
        <span>月</span>
      </div>
      <div class="week-day">
        <span>星期{{weeks[week]}}</span>
      </div>
    </div>
<!--    概览统计-->
    <div class="chart">
      <el-card class="vacancy-rate">
        <i class="my-icontongji"></i>
        <div class="text-div"><span class="text-font">空置率</span>
          <div style="display: flex;justify-content: flex-end"><span class="vacancyRate-text">{{nullroom}}</span>
            <span class="symbol">(%)</span></div>
        </div>
      </el-card>
      <el-card class="vacancy-rate">
        <i class="my-iconrenminbi"></i>
        <div class="text-div"><span class="text-font">总收入</span>
          <div style="display: flex;justify-content: flex-end"><span class="vacancyRate-text">{{tolefeeamount}}</span>
            <span class="symbol">(元)</span></div>
        </div>
      </el-card>
      <el-card class="vacancy-rate">
        <i class="my-iconfangzi"></i>
        <div class="text-div"><span class="text-font">已出租</span>
          <div style="display: flex;justify-content: flex-end"><span class="vacancyRate-text">{{rented.length}}</span>
            <span class="symbol">(间)</span></div>
        </div>
      </el-card>
    </div>

<!--    出租详情-->
    <div class="details">
      <div class="details-title">待处理</div>
      <div class="details-pending">
        <div style="width: 100px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">临近交租</span>
          <span style="font-size: 18px;display: block;font-weight: 600;color:#e6a448">{{rentCollection.length}}</span>
        </div>
        <div style="width: 100px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">已逾期</span>
          <span style="font-size: 18px;display: block;font-weight: 600;color:#ff010d">{{late.length}}</span>
        </div>
        <div style="width: 100px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">即将到期</span>
          <span style="font-size: 18px;display: block;font-weight: 600;color:#6f6b68">{{comingSoon.length}}</span>
        </div>
      </div>
    </div>
    <div class="details">
      <div class="details-title">出租详情</div>
      <div class="details-pending">
        <!--<div style="width: 100px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">新租</span>
          <span style="font-size: 18px;display: block;">{{newRent}}</span>
        </div>-->
        <div style="width: 100px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">全部</span>
          <span style="font-size: 18px;display: block;">{{tableData.length}}</span>
        </div>
        <div style="width: 100px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">已租</span>
          <span style="font-size: 18px;display: block;">{{rented.length}}</span>
        </div>
        <div style="width: 100px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">空置</span>
          <span style="font-size: 18px;display: block;">{{vacant.length}}</span>
        </div>
        <div style="width: 100px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">空置率</span>
          <span style="font-size: 18px;display: block;">{{nullroom}}%</span>
        </div>
      </div>
    </div>
    <div class="details">
      <div class="details-title">收支详情</div>
      <div class="details-pending">
        <div style="width: 150px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">收入租金(元)</span>
          <span style="font-size: 18px;display: block;">{{incomeRent}}</span>
        </div>
        <span>|</span>
        <div style="width: 150px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">收入押金(元)</span>
          <span style="font-size: 18px;display: block;">{{incomeDeposit}}</span>
        </div>
        <span>|</span>
        <div style="width: 150px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">收入杂费(元)</span>
          <span style="font-size: 18px;display: block;">{{incomeIncidentals}}</span>
        </div>
        <span>|</span>
        <div style="width: 150px;height: 60px;display: flex;align-items: center;flex-direction: column;justify-content: center">
          <span style="font-size: 16px;display: block;margin-bottom: 10px">支出金额(元)</span>
          <span style="font-size: 18px;display: block;">{{amountExpense}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {GetRentsList,GetFinancial} from '@/assets/jsAPI/api'
  export default {
    name: "Overviewpreview",
    data() {
      return {
        tableData: [],
        allAvailability: [],
        rented:[],
        vacant:[],
        rentCollection:[],
        late:[],
        comingSoon:[],
        transaction_data: [],
        signinfo:'',
        nullroom:0,
        nowDay: 0,
        nowYear: 0,
        nowMonth: 0,
        week: 0,
        newRent:0,
        incomeRent:0,
        incomeDeposit:0,
        incomeIncidentals:'3545.00',
        amountExpense:'0',
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        tolefeeamount:0,
      }
    },
    methods: {
      getDate() {
        var NowDate = new Date()
        this.nowDay = NowDate.getDate()
        this.nowYear = NowDate.getFullYear()
        this.nowMonth = NowDate.getMonth() + 1
        this.week = NowDate.getDay()
      },
      //获取财务列表
      GetOrderList() {
        let rentAmount=[]
        let Deposit=[]
        this.$axios.post(GetFinancial, {}).then(res => {
          if (res.data.resultCode==0){
            this.transaction_data=res.data.data
            for (let i=0;i<this.transaction_data.length;i++){
              this.tolefeeamount +=this.transaction_data[i].feeamount
              if (this.transaction_data[i].feetype==0){
                rentAmount.push(this.transaction_data[i].feeamount)
                console.log('租金：'+rentAmount)
              }
              if (this.transaction_data[i].feetype==1){
                Deposit.push(this.transaction_data[i].feeamount)
                console.log('押金：'+Deposit)
              }
            }
            for (let j=0;j<rentAmount.length;j++){
              this.incomeRent +=rentAmount[j]
            }
            for (let k=0;k<Deposit.length;k++){
              this.incomeDeposit +=Deposit[k]
            }
          }else{
            this.$message.error(res.data.resultDesc)
          }
        }).catch(e =>{

        })
      },
      //获取租务信息列表
      GetAvailabilityList() {
        // let loading = this.$loading({target: '#right-zone', text: '加载中...'})
        this.$axios.post(GetRentsList, {}).then(res => {
          if (res.data.resultCode==0){
            this.tableData=res.data.data
            this. GetALLAvailability()
          }else{
            this.$message.error(res.data.resultDesc)
          }
        }).catch(e => {

        })
      },
      //获取全部房源
      GetALLAvailability(){
        this.allAvailability=[]
        this.rented=[]
        this.vacant=[]
        this.rentCollection=[]
        this.late=[]
        this.comingSoon=[]
        console.log('房源：'+JSON.stringify(this.tableData))
        for (let i=0;i<this.tableData.length;i++){
          let avail={
            id:0,
            houseid:'',
            housename:'',
            roomid:'',
            roomname:'',
            roomnum:'',
            rentname:'',
            begindate:'',
            enddate:'',
            rentdate:'',
            roomstate:'',
            signinfo:'',
          }
          avail.id=this.tableData[i].id
          avail.houseid=this.tableData[i].houseid
          avail.housename=this.tableData[i].housename
          avail.roomid=this.tableData[i].roomid
          avail.roomname=this.tableData[i].roomname
          avail.roomnum=this.tableData[i].roomnum
          avail.rentname=this.tableData[i].rentname
          avail.begindate=this.tableData[i].begindate
          avail.enddate=this.tableData[i].enddate
          avail.rentdate=this.tableData[i].rentdate
          avail.roomstate=this.tableData[i].roomstate
          avail.signinfo=this.tableData[i].signinfo
          this.allAvailability.push(avail)
          console.log('房源：'+JSON.stringify(this.allAvailability))
          if (this.tableData[i].roomstate=='4') {
            this.vacant.push(this.tableData[i])
          }else{
            this.rented.push(this.tableData[i])
          }
          if (this.tableData[i].roomstate=='1')this.rentCollection.push(this.tableData[i])
          if (this.tableData[i].roomstate=='2')this.late.push(this.tableData[i])
          if (this.tableData[i].roomstate=='3')this.comingSoon.push(this.tableData[i])
        }
        this.nullroom= (this.vacant.length/this.tableData.length).toString().substring(0,4)
      },
    },
    mounted() {
      this.getDate()
      this. GetAvailabilityList()
      this. GetOrderList()
    }
  }
</script>

<style scoped>
  .overall {
    padding: 20px 20px 20px 20px;
    background-color: #F2F2F2;
  }

  .time-show {
    width: 280px;
    height: 50px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
  }

  .my-icontubiaolunkuo- {
    display: inline-block;
    margin-top: 8px;
  }

  .now-day {
    font-size: 35px;
    font-weight: 600;
  }

  .allDate {
    display: inline-block;
    font-size: 19px;
    font-weight: 500;
  }

  .now-year {
    display: inline-block;
  }

  .now-month {
    display: inline-block;
  }

  .week-day {
    display: inline-block;
  }

  .chart {
    width: 1250px;
    height: 100px;
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
  }

  .vacancy-rate {
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
  }



  .my-icontongji {
    font-size: 50px;
    color: #47cbc8;
    display: inline-block;
    margin-top: 15px;
  }

  .text-font {
    display: block;
    width: 80px;
    margin-left: 30px;
    margin-bottom: 10px;
    font-size: 25px;
    font-weight: 600;
    color: #666666;
  }

  .text-div {
    width: 200px;
    height: 100%;
    display: inline-block
  }

  .vacancyRate-text {
    font-size: 20px;
    color: #333333;
    display: inline-block;
    margin-right: 10px;
  }

  .symbol {
    font-size: 25px;
    font-weight: 600;
    color: #666666;
  }

  .my-iconrenminbi {
    font-size: 50px;
    color: #f4516c;;
    display: inline-block;
    margin-top: 15px;
  }
  .my-iconfangzi{
    font-size: 50px;
    color: #36a3f7;;
    display: inline-block;
    margin-top: 15px;
  }
  .details{
    width: 1250px;
    height: 100px;
    margin-top: 20px;
  }
  .details-title{
    width: 120px;
    height: 15px;
    background-color: #515151;
    color: #ffffff;
    font-size: 12px;
    font-weight: 200;
  }
  .details-pending{
    width: 100%;
    height: 85px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content:space-around;
  }
  .split-line{
    height: 30px;
    border: #666666 0.5px solid;
  }
</style>
