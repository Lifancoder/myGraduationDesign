<template>
  <div style="text-align: left; padding-left: 20px;padding-right: 20px;background-color: #F2F2F2;padding-top: 8px">
    <div style="margin: 8px 0 20px 0px; border-left: #333333 3px solid;height: 20px;line-height: 20px;padding-left: 8px">抄表管理</div>
    <el-select size="small" v-model="value2"  placeholder="全部类型" style="width: 120px;">
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input size="small" v-model.trim="input" placeholder="房源名" clearable style="width: 220px;"></el-input>
    <el-button type="primary"size="small" plain style="margin-left: 20px; width: 100px" @click.stop="selectType">查询</el-button>
<!--    <el-button type="primary" size="small" plain style="margin-left: 20px; width: 100px" @click="exporReading" plain>导出</el-button>-->
    <div class="table-box">
      <el-table
        :data="tableData"
        height="500"
        style="width: 100%">
        <el-table-column
          label="#"
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="housename"
          label="房源名"
          min-width="14%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="roomnum"
          label="房间号"
          min-width="14%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rentname"
          label="租客名字"
          min-width="14%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="feetype"
          label="费用类型"
          min-width="14%"
          align="center">
          <template slot-scope="scope">
            <span>{{typeList[scope.row.feetype - 1]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最新抄表日期"
          min-width="14%"
          align="center">
          <template slot-scope="scope">
            {{scope.row.optdate.substr(0,10)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="degree"
          label="最新抄表读数"
          min-width="16%"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="18%"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="primary" plain>抄表</el-button>
            <el-button size="small" type="primary" @click="showText(scope.row)" plain>
              历史记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 30px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="paginator.pageSize"
        layout="prev, pager, next, jumper"
        :total="paginator.totalNum">
      </el-pagination>
    </div>

    <!--      历史纪录弹框-->
    <el-dialog title="抄表历史记录"
               width="75%"
               :visible.sync="dialogFormVisible">
      <span style="font-size: 18px;color: #333333;display: inline-block ;margin-bottom:20px">{{Meter.housename}} | {{Meter.roomnum}}</span>
      <span style="font-size: 18px;color: #333333; float: right">{{typeList[  this.Meter.feetype -1]}}</span>

      <div style="display: block;width:100% ; height: 1px;background-color: #239bf0"></div>
      <div style="height: 20px"></div>
   <!--   <el-date-picker
        v-model="choosed_date"
        type="daterange"
        size="mini"
        style="width: 280px;"
        :clearable="false"
        range-separator="-"
        value-format="yyyy-MM-dd"
        @change="pageNo=1,getRecordList()"></el-date-picker>-->
      <div style="height: 20px"></div>
      <el-table :data="ReadingRecordList"
                size="mini"
                :header-cell-style="{'background-color': '#F7F3FB'}">
        <el-table-column   min-width="14%" label="抄表时间"align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.optdate!==null">{{scope.row.optdate.substr(0,10)}}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column  min-width="14%" property="degree" align="center" label="抄表读数"></el-table-column>
        <el-table-column  min-width="14%" property="used" align="center" label="本次用量"></el-table-column>
        <el-table-column  min-width="14%" property="unit" align="center" label="单价"></el-table-column>
        <el-table-column  min-width="14%" property="totalmoney" align="center" label="费用总计（元）">
          <template slot-scope="scope">
            <span v-if="scope.row.used!==null&&scope.row.unit!==null">{{(scope.row.used*scope.row.unit).toString().substr(0,5)}}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column  min-width="14%" align="center" property="optname" label="抄表人"></el-table-column>
      </el-table>
    </el-dialog>

    <!--    抄表-->
    <el-dialog title="抄表"
               width="35%"
               :show-close="false"
               :close-on-click-modal="true"
               :visible.sync="MeterDialog">
      <span style="font-size: 18px;color: #333333;display: inline-block ;margin-bottom:20px">{{Meter.housename}} | {{Meter.roomnum}}</span>
      <span style="font-size: 18px;color: #333333; float: right">{{Meter.rentname}}</span>

      <div style="display: block;width:100% ; height: 1px;background-color: #239bf0"></div>
      <div style="height: 40px"></div>

      <div><span style="display: inline-block;margin-left: 30px">本次抄表:</span>
        <el-input style="width:306px;height: 40px ;margin-left: 60px" v-model.trim="Meter.degree" placeholder='输入本次抄表读数'>
        </el-input>
      </div>
      <div style="margin-top: 30px">
        <span style="display: inline-block;margin-left: 28px">本次抄表时间:</span>

        <el-date-picker
          style="margin-left: 35px"
          v-model="Meter.optdate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>

      <div style="margin-top: 40px;margin-left: 70px">
        <el-button size="medium" type="primary" style="width: 150px;height: 40px;margin-right: 40px"
                   @click="closeMeter">取消
        </el-button>
        <el-button size="medium" type="primary" style="width: 150px;height: 40px"
                   @click="saveMeterList">确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import {getReadingList, getHouseSrcList, exportReadingList, getReadingRecord, saveMeter} from '@/assets/jsAPI/api'
  import {GetMeterReading,AddMeter} from '@/assets/jsAPI/api'
  /*import {getToday, getDiffDay, getItem} from '@/assets/js/utils'*/

  export default {
    data() {
      return {

        value: 0,
        options2: [{label: '全部类型', value: 9},
          {
            label: '水费', value: 1
          }, {
            label: '电费', value: 3
          }, {
            label: '燃气费', value: 2
          }],
        value2: null,
        input: '',
        tableData: [],
        currentPage: 1,
        paginator: {
          pageNo: 1,
          pageNum: 7,
          pageSize: 20,
          totalNum: 7,
          totalPage: 1
        },
        // 历史记录弹框区
        ReadingRecordList: [],
        typeList:['水费','燃气费','电费'],
        choosed_date: [],
        dialogFormVisible: false,
        showType: '',
        showHouseName: '',
        showRoomName: '',
        storage: {
          roomId: '',
          feeCode: ''
        },
        //抄表弹框区
        MeterDialog:false,
       Meter:{
         housename:'',
         roomnum:"",
         rentname:"",
         feetype:"",
         optdate:"",
         degree:"",
         used:"",
         unit:"",
         optname:""
       },
        users:{},
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.currentPage)
        this.loadTableData()
      },
      loadTableData(){
        this.tableData=[]
        this.$axios.post(GetMeterReading,{})
          .then(res => {
            if(res.data.resultCode==0){
              res.data.data.reverse()
            for (let i =0;i<res.data.data.length;i++) {
               for (let j =i+1;j<res.data.data.length;j++) {
                 if (res.data.data[i].feetype ==res.data.data[j].feetype && res.data.data[i].roomnum ==res.data.data[j].roomnum){
                   res.data.data.splice(j,1);
                   j--;
                 }
               }
               this.tableData=res.data.data
            }
            }else {
              this.$message.error(res.data.resultDesc)
            }
          }).catch(e =>{
        })
      },
      selectType(){
        this.tableData=[]
        console.log('选择：'+this.value2)
        if (this.value2===9){
          this.$axios.post(GetMeterReading,{})
            .then(res => {
              if(res.data.resultCode==0){
                res.data.data.reverse()
                for (let i =0;i<res.data.data.length;i++) {
                  for (let j =i+1;j<res.data.data.length;j++) {
                    if (res.data.data[i].feetype ==res.data.data[j].feetype && res.data.data[i].roomnum ==res.data.data[j].roomnum){
                      res.data.data.splice(j,1);
                      j--;
                    }
                  }
                  this.tableData=res.data.data
                }
              }else {
                this.$message.error(res.data.resultDesc)
              }
            }).catch(e =>{
          })
        }else if (this.value2!==''&&this.input==''&&this.value2!==9) {
          this.$axios.post(GetMeterReading,{
            feetype:this.value2
          })
            .then(res => {
              if(res.data.resultCode==0){
                res.data.data.reverse()
                for (let i =0;i<res.data.data.length;i++) {
                  for (let j =i+1;j<res.data.data.length;j++) {
                    if (res.data.data[i].feetype ==res.data.data[j].feetype && res.data.data[i].roomnum ==res.data.data[j].roomnum){
                      res.data.data.splice(j,1);
                      j--;
                    }
                  }
                  this.tableData=res.data.data
                }
              }else {
                this.$message.error(res.data.resultDesc)
              }
            }).catch(e =>{
          })
        }else if (this.value2 ==''&&this.input!==''&&this.value2!==9){
          this.$axios.post(GetMeterReading,{
            housename:this.input
          })
            .then(res => {
              if(res.data.resultCode==0){
                res.data.data.reverse()
                for (let i =0;i<res.data.data.length;i++) {
                  for (let j =i+1;j<res.data.data.length;j++) {
                    if (res.data.data[i].feetype ==res.data.data[j].feetype && res.data.data[i].roomnum ==res.data.data[j].roomnum){
                      res.data.data.splice(j,1);
                      j--;
                    }
                  }
                  this.tableData=res.data.data
                }
              }else {
                this.$message.error(res.data.resultDesc)
              }
            }).catch(e =>{
          })
        }else{
          this.$axios.post(GetMeterReading,{
            feetype:this.value2,
            housename:this.input
          })
            .then(res => {
              if(res.data.resultCode==0){
                res.data.data.reverse()
                for (let i =0;i<res.data.data.length;i++) {
                  for (let j =i+1;j<res.data.data.length;j++) {
                    if (res.data.data[i].feetype ==res.data.data[j].feetype && res.data.data[i].roomnum ==res.data.data[j].roomnum){
                      res.data.data.splice(j,1);
                      j--;
                    }
                  }
                  this.tableData=res.data.data
                }
              }else {
                this.$message.error(res.data.resultDesc)
              }
            }).catch(e =>{
          })
        }
      },

      showText(row) {
        this.ReadingRecordList=[]
        this.dialogFormVisible = true
        this.Meter.housename=row.housename
        this.Meter.roomnum=row.roomnum
        this.Meter.feetype=row.feetype
        this.$axios.post(GetMeterReading,{
          housename:row.housename,
          roomnum:row.roomnum,
          feetype:row.feetype
        })
          .then(res => {
            if(res.data.resultCode==0){
              this.ReadingRecordList=res.data.data
            }else {
              this.$message.error(res.data.resultDesc)
            }
          }).catch(e =>{
        })
      },


      //抄表 (handleClick /saveMeterList )
      handleClick(row) {
        this.Meter.housename=row.housename
        this.Meter.roomnum=row.roomnum
        this.Meter.rentname=row.rentname
        this.Meter.optdate=''
        this.Meter.degree=''
        this.Meter.feetype=row.feetype
        this.Meter.unit=row.unit
        this.Meter.used=row.degree
        this.Meter.optname=this.users.username
        console.log('登录者：'+JSON.stringify(this.Meter.optname))
        this.MeterDialog=true
      },

      saveMeterList() {
        console.log('抄表时间：'+this.Meter.optdate)
        this.$axios.post(AddMeter,{
          housename:this.Meter.housename,
          roomnum: this.Meter.roomnum,
          rentname:this.Meter.rentname,
          feetype:this.Meter.feetype,
          optdate: this.Meter.optdate + ' 00:00:00',
          degree:this.Meter.degree,
          used:this.Meter.degree-this.Meter.used,
          unit:this.Meter.unit,
          optname:this.Meter.optname
        }).then(res =>{
          this. loadTableData()
          this.MeterDialog = false
        })
      },

      closeMeter() {
        this.MeterDialog = false
      },

    },
    mounted() {
      this.loadTableData()
      // this.initChooseDate()
      let a= this.$store.state.isLogin
      this.users=a
    }
  }
</script>

<style scoped>
  .table-box {
    margin-top: 20px;
    text-align: center;
  }
</style>


