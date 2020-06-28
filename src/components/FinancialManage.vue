<template>
  <div style="text-align: left; padding-left: 20px;padding-right: 20px;background-color: #F2F2F2;padding-top: 8px;height: 100%">
    <div style="margin: 8px 0 20px 0px; border-left: #333333 3px solid;height: 20px;line-height: 20px;padding-left: 8px">财务管理</div>
    <div style="background-color: #ffffff">
      <el-tabs tab-position="left" style="max-height: 600px;">
        <el-tab-pane label="交易明细">
          <div style="text-align:left;">
            <el-tabs v-model="tabs">
              <el-tab-pane label="交易列表" name="first">
                <section>
                  <div>
<!--                    <el-input size="small" v-model.trim="input" placeholder="租户名" clearable style="width: 220px;"></el-input>-->
<!--                    <el-button size="mini" type="primary" plain @click="selectByName">查询</el-button>-->
                    <el-button size="mini" type="primary" @click="exportBillList" plain>导出</el-button>
                  </div>
                  <div style="margin-top: 20px;">
                    <el-table
                      size="mini"
                      :data="transaction_data"
                      :header-cell-style="{'background-color': '#F7F3FB'}"
                      stripe>
                      <el-table-column
                        align="center"
                        prop="housename"
                        min-width="9%"
                        label="房源名"></el-table-column>
                      <el-table-column
                        align="center"
                        prop="roomename"
                        min-width="9%"
                        label="房间名"></el-table-column>
                      <el-table-column
                        align="center"
                        prop="rentname"
                        min-width="9%"
                        label="租客名"></el-table-column>
                      <el-table-column
                        align="center"
                        prop="paytype"
                        min-width="9%"
                        label="支付方式">
                        <template slot-scope="scope">
                          <span v-if="scope.row.paytype==0">微信</span>
                          <span v-if="scope.row.paytype==1">支付宝</span>
                          <span v-if="scope.row.paytype==2">线下支付</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width="9%"
                        label="支付时间">
                       <template slot-scope="scope">
                         {{scope.row.paydate.substr(0,10)}}
                       </template>
                      </el-table-column>
                    <!--  <el-table-column
                        align="center"
                        prop="totalFee"
                        min-width="9%"
                        label="支付费用总计"></el-table-column>-->
                      <el-table-column
                        align="center"
                        min-width="9%"
                        label="费用类型">
                        <template slot-scope="scope">
                          <span v-if="scope.row.feetype==0">租金</span>
<!--                          <span v-else-if="scope.row.feetype==4">押金</span>-->
                          <span v-else-if="scope.row.feetype==1">押金</span>
                          <span v-else-if="scope.row.feetype==null">燃气费</span>
<!--                          <span v-else-if="scope.row.feetype==3">电费</span>-->
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="feeamount"
                        min-width="9%"
                        label="支付金额"></el-table-column>
                      <el-table-column
                        align="center"
                        min-width="9%"
                        label="订单状态">
                        <template slot-scope="scope">
                          <span>{{billStatusName[scope.row.orderstate]}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>


                </section>
              </el-tab-pane>
              <!--<el-tab-pane label="查询单个订单" name="second">
                <section>
                  <div>
                    <el-input placeholder="请输入支付流水号" size="mini" style="width: 240px;" v-model="important_search">
                      <template slot="append">
                        <i class="el-icon-search"></i>
                      </template>
                    </el-input>
                    <el-button size="mini" type="primary" plain @click="selectByName()">查询</el-button>
                  </div>
                  <div style="margin-top: 20px;">
                    <el-table
                      size="mini"
                      :data="transaction_data"
                      :header-cell-style="{'background-color': '#F7F3FB'}"
                      stripe>
                      <el-table-column
                        align="center"
                        prop="housename"
                        min-width="9%"
                        label="房源名"></el-table-column>
                      <el-table-column
                        align="center"
                        prop="roomename"
                        min-width="9%"
                        label="房间名"></el-table-column>
                      <el-table-column
                        align="center"
                        prop="rentname"
                        min-width="9%"
                        label="租客名"></el-table-column>
                      <el-table-column
                        align="center"
                        prop="paytype"
                        min-width="9%"
                        label="支付方式">
                        <template slot-scope="scope">
                          <span v-if="scope.row.paytype==0">微信</span>
                          <span v-if="scope.row.paytype==1">支付宝</span>
                          <span v-if="scope.row.paytype==2">线下支付</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width="9%"
                        label="支付时间">
                        <template slot-scope="scope">
                          <span v-if="scope.row.paydate!==null">{{scope.row.paydate.substr(0,10)}}</span>
                          <span v-else>-</span>
                        </template>
                      </el-table-column>
                      &lt;!&ndash;  <el-table-column
                          align="center"
                          prop="totalFee"
                          min-width="9%"
                          label="支付费用总计"></el-table-column>&ndash;&gt;
                      <el-table-column
                        align="center"
                        min-width="9%"
                        label="费用类型">
                        <template slot-scope="scope">
                          &lt;!&ndash;<span v-if="scope.row.feetype==2">水费</span>
                          <span v-if="scope.row.feetype==3">电费</span>
                          <span v-if="scope.row.feetype==3">燃气费</span>&ndash;&gt;
                          <span v-if="scope.row.feetype==0">租金</span>
                          <span v-else-if="scope.row.feetype==4">押金</span>
                          <span v-else-if="scope.row.feetype==1">水费</span>
                          <span v-else-if="scope.row.feetype==2">燃气费</span>
                          <span v-else-if="scope.row.feetype==3">电费</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="feeamount"
                        min-width="9%"
                        label="支付金额"></el-table-column>
                      <el-table-column
                        align="center"
                        prop="paysn"
                        min-width="9%"
                        label="支付流水号"></el-table-column>
                      <el-table-column
                        align="center"
                        min-width="9%"
                        label="订单状态">
                        <template slot-scope="scope">
                          <span>{{billStatusName[scope.row.orderstate]}}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </section>
              </el-tab-pane>-->
            </el-tabs>
          </div>
        </el-tab-pane>
        <el-tab-pane label="退款处理">
          <div style="margin-top: 20px">
            <el-table
              :data="refund_data"
              size="small"
              :header-cell-style="{'background-color': '#F7F3FB'}"
              stripe>
              <el-table-column :fit="false" label="请求时间" align="center" prop="requestdate"></el-table-column>
              <el-table-column :fit="false" label="退租经办人" align="center" prop="agent"></el-table-column>
              <el-table-column :fit="false" label="房源-房间" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.housename&&scope.row.roomname !==null">{{scope.row.housename-scope.row.roomname}}</span>
                  <span v-else>-</span>
                </template>
              </el-table-column>
              <el-table-column :fit="false" label="租客" align="center" prop="rentname"></el-table-column>
              <el-table-column :fit="false" label="退款金额" align="center" prop="refundmoney"></el-table-column>
              <el-table-column :fit="false" label="状态" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.status===0" type="text" @click=""
                             size="small">
                    确认退款
                  </el-button>
                  <span v-else>{{scope.row.refundName}}已确认退款<br>{{scope.row.refundTime}}</span>
                </template>
              </el-table-column>
            </el-table>
<!--            <el-pagination-->
<!--              background-->
<!--              layout="prev, pager, next"-->
<!--              :current-page.sync="pageNo"-->
<!--              :page-count="totalPage"-->
<!--              @current-change="getRefundList"-->
<!--              class="pagination">-->
<!--            </el-pagination>-->

            <el-dialog
              title="提示"
              :visible.sync="refundDialogVisible"
              width="30%"
              center>
              <div style="text-align: center;">
                <span>是否已通过现金、转账等方式给租客退款？</span>
              </div>
              <span slot="footer" class="dialog-footer">
        <el-button @click="refundDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="refundDialogVisible = false" @click.stop="">确 定</el-button>
      </span>
            </el-dialog>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  /* import {getReadingList, getHouseSrcList, exportReadingList, getReadingRecord, saveMeter} from '@/assets/js/api'*/
   import {GetFinancial,exportFinancial,GetRefund} from '@/assets/jsAPI/api'
  /*import {getToday, getDiffDay, getItem} from '@/assets/js/utils'*/

  export default {
    data() {
      return {
        // 交易明细
        tabs: 'first',
        houseSrcs: [],
        choosed_house: null,
        choosed_date: [],
        input:'',
        transaction_data: [],
        showsettle: false,
        settleList: [],
        dialogFormVisible: false,
        orderInfoList: [],
        order_type: '',
        important_search: '',
        pageNo: 1,
        pageSize: 10,
        totalPage: 1,
        billStatusName: ['未支付','支付成功'],
        payWayName: [],
        // 退款处理
        refund_data: [],
        pageNo: 1,
        pageSize: 10,
        totalPage: 1,
        status:0,
        refundDialogVisible: false,
        refundId: 0,
      }
    },
    methods: {
   /*   initChooseDate() {
        let today = getToday()
        let pre7Day = getDiffDay(-7)
        this.choosed_date = [pre7Day, today]
      },*/
      GetOrderList() {
        this.$axios.post(GetFinancial, {}).then(res => {
          if (res.data.resultCode==0){
            this.transaction_data=res.data.data
          }else{
            this.$message.error(res.data.resultDesc)
          }
        }).catch(e =>{

        })
      },
      // selectByName(){
      //   this.$axios.post(GetFinancial, {
      //     paysn:this.important_search,
      //     feetype:'0'
      //   }).then(res => {
      //     if (res.data.resultCode==0){
      //       this.transaction_data=res.data.data
      //     }else{
      //       this.$message.error(res.data.resultDesc)
      //     }
      //   }).catch(e =>{
      //
      //   })
      // },
      //获取退款列表
      GetRefundList(){
        this.$axios.post(GetRefund,{}).then(res =>{
          if (res.data.resultCode==0){
            this.refund_data=res.data.data
          }else{
            this.$message.error(res.data.resultDesc)
          }
        })
      },

      //导出
      exportBillList() {
        // let token = getItem('token')
        // let id = !(parseInt(this.choosed_house) > 0) ? 0 : parseInt(this.choosed_house)
        // let Stime = this.choosed_date[0]
        // let Etime = this.choosed_date[1]
        this.$axios.get(exportFinancial, {
          params: {},
          responseType: 'blob'
        }).then(res => {
          console.log("res:" + JSON.stringify(res))
          var blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel;charset=utf-8'
          })
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, res.fileName)
          } else {
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = '交易列表.xls'// 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
          }

        })
      },

    },

    mounted() {
      this.GetOrderList()
      this.GetRefundList()
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

</style>


