<template>
  <div
    style="text-align: left; padding-left: 20px;padding-right: 20px;background-color: #F2F2F2;padding-top: 8px;height: 100%">
    <div
      style="margin: 8px 0 20px 0px; border-left: #333333 3px solid;height: 20px;line-height: 20px;padding-left: 8px">
      报表管理
    </div>
    <div style="background-color: #ffffff">
      <el-tabs tab-position="left" style="max-height: 600px">
        <el-tab-pane label="租务记录">
          <div style="text-align: left;margin-top: 10px">
            <div>
            <!--  <el-date-picker
                v-model="chooseDate"
                size="small"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="pageNo=1,getReportRecord()">
              </el-date-picker>-->
<!--              <el-input v-model="iputValue" size="mini" style="width: 200px" prefix-icon="el-icon-search" placeholder="请输入租务类型"></el-input>-->
<!--              <el-button  size="mini" type="primary" plain style="margin-left: 20px; width: 100px" @click.stop="selectByType">查询</el-button>-->
            </div>
            <div style="margin-top:15px;">
              <el-table
                size="mini"
                :data="RecordList"
                :header-cell-style="{'background-color': '#F7F3FB'}"
                stripe
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="renttype"
                  min-width="9%"
                  label="租务类型">
                 <!-- <template slot-scope="scope">
                    <span>{{typeName[scope.row.renttype]}}</span>
                  </template>-->
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="houseid"
                  min-width="9%"
                  label="房源名">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="roomid"
                  min-width="9%"
                  label="房间号">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="rentname"
                  min-width="9%"
                  label="租客姓名">
                </el-table-column>
              </el-table>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page.sync="pageNo"
              :page-count="totalPage"
              @current-change="getReportRecord"
              class="pagination">
            </el-pagination>


          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
   import {GetReport} from '@/assets/jsAPI/api'
  export default {
    data() {
      return {
        // 历史概况
        chooseDate: [],
        pageNo: 1,
        pageSize: 10,
        totalPage: 1,
        DailyList: [],
        // 租务记录
        RecordList: [],
        chooseDate: [],
        pageNo: 1,
        pageSize: 10,
        totalPage: 1,
        typeName: ['生成租约', '编辑租约', '办理退租'],
        showPopup: false,
        popupTitle: '',
        Lease: '',
        rentType: 1,
        iputValue:'',
      }
    },
    methods: {

    /*  initChooseDate() {
        let today = getToday()
        let pre7Day = getDiffDay(-7)
        this.chooseDate = [pre7Day, today]
      },*/

      //租务记录
      getReportRecord() {
        this.$axios.post(GetReport, {}).then(res => {
          if(res.data.resultCode==0){
            this.RecordList=res.data.data
          }else {
            this.$message.error(res.data.resultDesc)
          }
        }).catch(e => {})
      },
      selectByType(){
        this.$axios.post(GetReport, {
          renttype:this.iputValue
        }).then(res => {
          if(res.data.resultCode==0){
            this.RecordList=res.data.data
          }else {
            this.$message.error(res.data.resultDesc)
          }
        }).catch(e => {})
      },

      close() {
        this.showPopup = false
      },
    },

    mounted() {
      this. getReportRecord()
      // this.initChooseDate()
    }
  }
</script>

<style scoped>
  .table-box {
    margin-top: 20px;
    text-align: center;
  }

  .pagination {
    /*position: absolute;*/
    /*bottom: 20px;*/
    /*left: 0;*/
    /*right: 0;*/
    margin-top: 20px;
    text-align: center;
  }

  .Lease {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    display: block;
    height: 18.4px;
    margin-top: 18px;
  }

  .headline {
    margin-bottom: 24px;
    padding-left: 8px;
    color: #161c18;
    font-size: 18px;
    line-height: initial;
    border-left: 4px solid #409eff;
    display: block;
    margin-top: 30px;
    margin-left: 25px;
    height: 27.6px;
    background-color: rgba(64, 158, 255, 0.1);
  }

  .layui-table {
    width: 100%;
    background-color: #fff;
    color: #666;
    margin-left: 25px;
  }

  th {
    vertical-align: middle;
    width: 182.4px;
    padding: 9px 0;
    color: #999;
    font-size: 14px;
    text-align: left;
    border: none;
    background: none;
    min-height: 20px;
    line-height: 20px;
    font-weight: 400;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  }

  td {
    padding: 9px 0;
    font-size: 14px;
    text-align: left;
    border: none;
    background: none;
  }
</style>


