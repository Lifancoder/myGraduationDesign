<template>
  <div class="overall">
    <div class="sidebar">
      <span class="sidebar-title">房源列表</span>
      <div class="availability-button">
<!--        <el-button @click="addAvailability" size="mini" type="primary" plain>添加房源</el-button>-->
        <el-button @click="addRoom" size="mini" type="primary" plain>添加 房源-房间</el-button>
      </div>
      <el-dialog
        title="添加房源/房间"
        :visible.sync="dialog_addRoom"
        width="400px">
        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center">
          <div style="display: flex;justify-content: space-around;margin-bottom: 20px">
            <span style="width: 100px;display: flex;align-items: center;">房源名称：</span>
           <!-- <el-select v-model="roomValue" placeholder="请选择" style="width: 200px">
              <el-option
                v-for="item in allAvailability"
                :key="item.houseid"
                :label="item.housename"
                :value="item.housename">
              </el-option>
            </el-select>-->
            <el-input v-model="roomValue" style="width: 200px"></el-input>
          </div>
          <div style="display: flex;justify-content: space-around;">
            <span style="width: 100px;display: flex;align-items: center">房间名称：</span>
            <el-input v-model="roomName" style="width: 200px"></el-input>
          </div>
          <div style="display: flex;justify-content: space-around;margin-top: 20px">
            <span style="width: 100px;display: flex;align-items: center">房间号：</span>
            <el-input v-model="agencyRow.roomnum" style="width: 200px"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_addRoom = false" size="small">取 消</el-button>
    <el-button type="primary" @click="addRoomOk" size="small">确 定</el-button>
  </span>
      </el-dialog>

      <div class="availability-children" v-for="availability in allAvailability" :key="availability.houseid">
        <div style="width: 200px ;display: flex;justify-content: flex-start">
          <div>
            <el-button type="text">{{availability.housename}}</el-button>
            <el-button size="mini" @click="edit_availability(availability)">编辑房源</el-button>
          </div>
          <el-dialog
            title="编辑房源信息"
            :visible.sync="dialog_editAvailability"
            width="400px">
            <div style="display: flex;justify-content: space-around">
              <span style="width: 100px;display: flex;align-items: center">房源名称：</span>
              <el-input v-model="editAvailabilityName"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_editAvailability = false" size="small">取 消</el-button>
    <el-button type="primary" @click="editRent" size="small">确 定</el-button>
  </span>
          </el-dialog>
        </div>
      </div>

    </div>

<!--    删除房间-->
    <el-dialog
      title="提示"
      :visible.sync="deleteRoomDialogShow"
      width="30%"
      center>
      <div style="text-align: center;">
        <span>确定删除该房间吗？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteRoomDialogShow = false">取 消</el-button>
        <el-button type="primary"  @click.stop="deleteRoomOk">确 定</el-button>
      </span>
    </el-dialog>
    <!--          签约-->
    <el-drawer
      size="460px"
      :visible.sync="drawerAgency"
      :wrapperClosable="false"
      direction="rtl">
      <span class="title-class">{{titleName}}</span>
      <div class="agency-all">
        <div class="room-information">
          <span class="drawer-agency-title">房间信息</span>
          <div class="room-details">
            <span>房源名：{{agencyRow.availabilityName}}</span>
            <span>房间号：{{agencyRow.roomnum}}</span>
          </div>
        </div>
        <div style="max-height: 500px;overflow-y:auto">
          <el-form :model="basicForm" :rules="basicRules" ref="basicForm" label-width="100px">
            <div class="room-information">
              <span class="drawer-agency-title">基本信息</span>
              <div class="basic-information">
                <el-form-item label="租客姓名" prop="name" style="text-align: left;">
                  <el-input :disabled="isCheck" v-model.trim="basicForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phoneNum">
                  <el-input :disabled="isCheck" v-model.trim="basicForm.phoneNum" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"
                            type="tel"
                            placeholder="请输入11位手机号码"
                           ></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" prop="idNum">
                  <el-input :disabled="isCheck" v-model.trim="basicForm.idNum" maxlength="18" placeholder="请输入18位身份证号码"
                            show-word-limit></el-input>
                </el-form-item>
                <span
                  style="color: #606266;font-size: 14px;width: 420px;display: flex;justify-content: left;margin-bottom: 20px">
                上传身份证照片</span>
                <el-upload v-if="isCheck==false"
                  :class="{disabled:isMax}"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :limit="2"
                  :auto-upload="false"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-change="change"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  ref="upload">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <img style="width: 200px;height: 105px" :src="photoSrc" alt="" v-else>
                <el-dialog :visible.sync="dialogVisible" :modal="false">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </div>
            </div>
            <div class="room-information">
              <span class="drawer-agency-title">租赁信息</span>
              <div class="basic-information">
                <el-form-item label="租赁时间" prop="dateValue" style="text-align: left;">
                  <el-date-picker
                    :disabled="isCheck"
                    v-model="basicForm.dateValue"
                    :onclick="selectDate(basicForm.dateValue)"
                    size="small"
                    style="width: 300px"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="租赁金额" prop="leaseMoney">
                  <el-input :disabled="isCheck" v-model.trim="basicForm.leaseMoney" type="text">
                    <template slot="suffix">元/月</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="租赁押金" prop="deposit">
                  <el-input :disabled="isCheck" v-model.trim="basicForm.deposit" type="text">
                    <template slot="suffix">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="收租周期" prop="cycle">
                  <el-input :disabled="isCheck" v-model.trim="basicForm.cycle" type="text">
                    <template slot="suffix">个月</template>
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="room-information">
              <span class="drawer-agency-title">杂费信息</span>
              <div class="cost-Style" >
                <el-form-item label="选择费用类型" label-width="100px" style="width: 400px">
                  <el-select :disabled="isCheck" size="small" v-model="basicForm.costCheck"  multiple placeholder="请选择">
                    <el-option
                      v-for="i in costShow"
                      :key="i.id"
                      :label="i.name"
                      :value="i.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>

<!--            费用-->
            <div  v-for="itm in basicForm.costCheck" :key="itm" v-if="itm ==1">
            <span class="cost">水费</span>
            <div class="water">
              <div class="cost-Style">
                <el-form-item label="收费类型" label-width="80px" style="width: 210px">
                  <el-select :disabled="isCheck" size="small" v-model="basicForm.waterCostType" placeholder="请选择">
                    <el-option
                      v-for="item in CostWaterType"
                      :key="item.no"
                      :label="item.type"
                      :value="item.no">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='费用金额 ' label-width="80px"style="width: 200px" v-if="basicForm.waterCostType===1">
                  <el-input :disabled="isCheck" size="small" v-model="basicForm.waterCost"> <template slot="suffix">元/月</template></el-input></el-form-item>
                <el-form-item label='水费单价 ' label-width="80px"style="width: 200px" v-else>
                  <el-input :disabled="isCheck" size="small" v-model="basicForm.waterrentunit"> <template slot="suffix" >元/m³</template></el-input></el-form-item>
              </div>
              <div class="cost-Style" v-show="basicForm.waterCostType===2">
                <el-form-item label='当前读数 ' label-width="80px"style="width: 200px">
                  <el-input :disabled="isCheck" size="small" v-model="basicForm.waterReading"> <template slot="suffix">m³</template></el-input></el-form-item>
                <el-form-item label='抄表日期 ' label-width="80px" style="width: 200px">
                  <el-date-picker
                    :disabled="isCheck"
                    v-model="basicForm.waterDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 120px"
                    placeholder="选择日期"
                  size="small">
                  </el-date-picker></el-form-item>
              </div>
            </div>
            </div>
            <div  v-for="itm in basicForm.costCheck" :key="itm" v-if="itm ==2">
            <span class="cost">电费</span>
            <div class="water">
              <div class="cost-Style">
                <el-form-item label="收费类型" label-width="80px" style="width: 210px">
                  <el-input placeholder="抄表收费" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label='电费单价 ' label-width="80px"style="width: 200px">
                  <el-input :disabled="isCheck" size="small" v-model="basicForm.electricity"> <template slot="suffix">元/度</template></el-input></el-form-item>
              </div>
              <div class="cost-Style">
                <el-form-item label='当前读数 ' label-width="80px"style="width: 200px">
                  <el-input :disabled="isCheck" size="small" v-model="basicForm.electricityReading"> <template slot="suffix">度</template></el-input></el-form-item>
                <el-form-item label='抄表日期 ' label-width="80px" style="width: 200px">
                  <el-date-picker
                    :disabled="isCheck"
                    v-model="basicForm.electricityDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 120px"
                    placeholder="选择日期"
                    size="small">
                  </el-date-picker></el-form-item>
              </div>
            </div>
            </div>
            <div  v-for="itm in basicForm.costCheck" :key="itm" v-if="itm ==3">
            <span class="cost">燃气费</span>
            <div class="water">
              <div class="cost-Style">
                <el-form-item label="收费类型" label-width="80px" style="width: 210px">
                  <el-input placeholder="抄表收费" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label='燃气单价 ' label-width="80px"style="width: 200px">
                  <el-input :disabled="isCheck" size="small" v-model="basicForm.gasCharges"> <template slot="suffix">元/Nm³</template></el-input></el-form-item>
              </div>
              <div class="cost-Style">
                <el-form-item label='当前读数 ' label-width="80px"style="width: 200px">
                  <el-input :disabled="isCheck" size="small" v-model="basicForm.gasReading"> <template slot="suffix">Nm³</template></el-input></el-form-item>
                <el-form-item label='抄表日期 ' label-width="80px" style="width: 200px">
                  <el-date-picker
                    :disabled="isCheck"
                    v-model="basicForm.gasDate"
                    type="date"
                    style="width: 120px"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    size="small">
                  </el-date-picker></el-form-item>
              </div>
            </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="button-agency">
<!--        <el-button size="medium" style="width: 200px" v-if="isEdit" @click="">编辑租约</el-button>-->
        <el-button size="medium" style="width: 200px" v-show="isEdit"  @click="drawerAgency=false">取消</el-button>
<!--        <el-button size="medium" style="width: 200px" v-if="isEdit" type="primary">确认编辑</el-button>-->
        <el-button size="medium" style="width: 200px" @click="signonfoOk" v-show="isEdit" type="primary">确定</el-button>
      </div>
    </el-drawer>
    <div class="right-zone">
      <div class="top-state">
        <el-button size="medium" :disabled="true">全部{{tableData.length}}</el-button>
        <el-button size="medium" :disabled="true">已租{{rented.length}}</el-button>
        <el-button size="medium" :disabled="true">空置{{vacant.length}}</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-badge :value="rentCollection.length" type="warning">
          <el-button :disabled="true" size="medium">临近收租</el-button>
        </el-badge>
        <el-badge :value="late.length" type="danger">
          <el-button :disabled="true" size="medium">逾期未交</el-button>
        </el-badge>
        <el-badge :value="comingSoon.length" type="info">
          <el-button :disabled="true"size="medium">即将到期</el-button>
        </el-badge>
        <el-select v-model="availabilityNo" placeholder="请选择房源" style="width: 200px" @change="selectByAvail">
          <el-option
            key="0"
            label="全部房源"
            value='0'>
          </el-option>
          <el-option
            v-for="items in allAvailability"
            :key="items.houseid"
            :label="items.housename"
            :value="items.houseid">
          </el-option>
        </el-select>
<!--        <el-input v-model="iputValue" style="width: 200px" prefix-icon="el-icon-search" placeholder="请输入房间号" @keyup.enter.native="selectByRoom"></el-input>-->
      </div>
      <div class="right-main">
        <el-table
          :data="tableData"
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
            align="center">
          </el-table-column>
          <el-table-column
            label="房间名"
            prop="roomname"
            align="center">
          </el-table-column>
          <el-table-column
            label="租户名"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.rentname !==null">{{scope.row.rentname}}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="开始日期"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.begindate !==null">{{scope.row.begindate.substr(0,10)}}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="截止日期"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.enddate !==null">{{scope.row.enddate.substr(0,10)}}</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收租周期"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.rentdate !==null">{{scope.row.rentdate}}个月</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="房间状态"
            align="center">
            <template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.roomstate==1">{{roomType[scope.row.roomstate-1]}}</el-tag>
              <el-tag type="danger" v-else-if="scope.row.roomstate==2">{{roomType[scope.row.roomstate-1]}}</el-tag>
              <el-tag type="info" v-else-if="scope.row.roomstate==3">{{roomType[scope.row.roomstate-1]}}</el-tag>
              <el-tag type="" v-else-if="scope.row.roomstate==4">{{roomType[scope.row.roomstate-1]}}</el-tag>
              <el-tag type="success" v-else>{{roomType[scope.row.roomstate-1]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.roomstate==4" size="small" type="info" @click="Agency(scope.row)" plain
                         icon="el-icon-edit-outline">签约
              </el-button>
              <el-button v-else size="small" type="info" plain icon="el-icon-chat-line-round" @click="selectSigninfo(scope.row)">租约
              </el-button>
              <i class="el-icon-delete" @click="deleteroom(scope.row)" style="margin-left: 5px"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    GetRentsList,
    AddRent,
    DeleteRent,
    AddSignInfo,
    editRent,
    SelectSign
  } from '@/assets/jsAPI/api'

  export default {
    name: "RentManage",
    data() {
      return {
        isEdit:false,
        showWater:false,
        showElectricity:false,
        showGas:false,
        dialog_editAvailability: false,
        drawer: false,
        users:{},
        dialog_addRoom: false,
        drawerAgency: false,
        dialogVisible: false,
        deleteRoomDialogShow:false,
        isCheck:false,
        isMax: false,
        costShow:[{id:1,name:'水费'},{id:2,name:'电费'},{id:3,name:'燃气费'}],
        agencyRow: {
          availabilityName:'',
          roomName:'',
          houseid:'',
          roomid:'',
          roomnum:'',
        },
        basicForm: {
          name: '',
          phoneNum: '',
          idNum: '',
          IDphoto: '',
          dateValue: '',
          leaseMoney: null,
          deposit: null,
          cycle: null,
          costCheck:[],
          waterCostType:1,
          waterCost:0,
          waterReading:0,
          waterDate:'',
          waterrentunit:0,
          electricity:0,
          electricityReading:0,
          electricityDate:'',
          gasCharges:0,
          gasReading:0,
          gasDate:'',
        },
        basicRules: {
          name: [
            {required: true, message: '请输入租客名称', trigger: 'blur'},
          ],
          phoneNum: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          idNum: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'}
          ],
          dateValue: [
            {required: true, message: '请选择租赁时间', trigger: 'blur'}
          ],
          leaseMoney: [
            {required: true, message: '请输入租赁金额', trigger: 'blur'}
          ],
          deposit: [
            {required: true, message: '请输入租赁押金', trigger: 'blur'}
          ],
          cycle: [
            {required: true, message: '请选择收租周期', trigger: 'blur'}
          ],
        },
        tableData: [],
        CostWaterType:[{no:1,type:'固定每月收费'},{no:2,type:'抄表收费'}],
        allAvailability: [],
        roomType: ['临近收租', '逾期未交', '即将到期', '空置房间', '状态正常'],
        availabilityNo: '',
        iputValue: '',
        rented:[],
        vacant:[],
        rentCollection:[],
        late:[],
        comingSoon:[],
        editAvailabilityName: '',
        inputName: '',
        roomValue: '',
        roomName: '',
        dialogImageUrl: '',
        titleName:'签约',
        defaroomstate:4,
        roomId:'',
        signinfo:'',
        imgResultOne:'',
        rentID:null,
        imgResult:'',
        photoSrc:'',
        editrents:{
          id:0,
          houseid: "",
          roomid: "",
          roomname: "",
          roomnum: "",
          rentname: '',
          begindate: '',
          enddate: '',
          rentdate: '',
          roomstate: '',
          signinfo: '',
        },
      }
    },
    methods: {
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
      },
      //根据房源id查询租务信息
      selectByAvail(){
        if (this.availabilityNo==0){
          this.$axios.post(GetRentsList, {}).then(res => {
            if (res.data.resultCode==0){
              this.tableData=res.data.data
            }else{
              this.$message.error(res.data.resultDesc)
            }
          }).catch(e => {

          })
        }else {
          this.$axios.post(GetRentsList, {
            houseid:this.availabilityNo
          }).then(res => {
            if (res.data.resultCode==0){
              this.tableData=res.data.data
            }else{
              this.$message.error(res.data.resultDesc)
            }
          }).catch(e => {

          })
        }
      },
      //根据房间查询租务信息列表
      selectByRoom(){
        this.$axios.post(GetRentsList, {
          roomname:this.iputValue
        }).then(res => {
          if (res.data.resultCode==0){
            this.tableData=res.data.data
          }else{
            this.$message.error(res.data.resultDesc)
          }
        }).catch(e => {

        })
      },
      //main-左侧菜单【修改房源】
      edit_availability(row) {
        this.editAvailabilityName = row.housename
        this.editrents.id=row.id
        this.editrents.houseid=row.houseid
          this.editrents. roomid=row.roomid
          this.editrents. roomname=row.roomname
          this.editrents.roomnum=row.roomnum
          this.editrents. rentname=row.rentname
          this.editrents. begindate=row.begindate
          this.editrents. enddate=row.enddate
          this.editrents. rentdate=row.rentdate
          this.editrents. roomstate=row.roomstate
          this.editrents. signinfo=row.signinfo
        this.dialog_editAvailability = true
      },

      //修改房源信息
      editRent(){
        this.$axios.post(editRent,{
          id:this.editrents.id,
          housename:this.editAvailabilityName,
          houseid: this.editrents.houseid,
          roomid: this.editrents. roomid,
          roomname: this.editrents. roomname,
          roomnum: this.editrents.roomnum,
          rentname: this.editrents. rentname,
          begindate: this.editrents. begindate,
          enddate: this.editrents. enddate,
          rentdate: this.editrents. rentdate,
          roomstate: this.editrents. roomstate,
          signinfo: this.editrents. signinfo,
        }).then(res =>{
          if (res.data.resultCode== 0) {
            this.dialog_editAvailability = false
            this.GetAvailabilityList()
            this.$message.success(res.data.resultDesc)
          }else{
            this.dialog_editAvailability = false
            this.$message.error(res.data.resultDesc)
          }
        })
      },
      cancel() {
        this.dialog_addAvailability = false
      },
      //【添加房间】
      addRoom() {
        this.dialog_addRoom = true
        this.roomValue=''
        this.roomName=''
        this.agencyRow.roomnum=''
      },
      //添加房间【确认】
      addRoomOk(){
        this.$axios.post(AddRent,{
          housename:this.roomValue,
          roomstate:this.defaroomstate,
          roomname:this.roomName,
          roomnum:this.agencyRow.roomnum
        }).then(res =>{
          if (res.data.resultCode== 0) {
            this.dialog_addRoom = false
            this.GetAvailabilityList()
            this.$message.success(res.data.resultDesc)
          }else{
            this.dialog_addRoom = false
            this.$message.error(res.data.resultDesc)
          }
        })
      },
      //删除房间deleteroom
      deleteroom(row){
        this.deleteRoomDialogShow=true
        this.roomId=row.roomid
        this.signinfo=row.signinfo
      },
      // 删除房间【确认】
      deleteRoomOk(){
        this.$axios.post(DeleteRent,{
          roomid:this.roomId,
          signinfo:this.signinfo,
          operator:this.users.username,
          refundmoney:500
        }).then(res =>{
          if (res.data.resultCode== 0) {
            this.deleteRoomDialogShow = false
            this.GetAvailabilityList()
            this.$message.success(res.data.resultDesc)
          }else{
            this.deleteRoomDialogShow = false
            this.$message.error(res.data.resultDesc)
          }
        })
      },
      //【签约】
      Agency(row) {
        // this.$refs.upload.clearFiles()
        this.isCheck=false
        this.isEdit=true
        this.imgResult=''
        this.titleName='签约'
        this.drawerAgency = true
        this.agencyRow.availabilityName=row.housename
        this.agencyRow.roomName=row.roomname
        this.agencyRow.houseid=row.houseid
        this.agencyRow.roomid=row.roomid
        this.agencyRow.roomnum=row.roomnum
        this.rentID=row.id
        this.basicForm={},
          this.photoSrc=row.iccimg
      },
      //【租约】 查看租约
      selectSigninfo(row){
        this.isCheck=true
        this.isEdit=false
        this.basicForm.costCheck=[]
        this.basicForm.dateValue=[]
        this.basicForm.cycle=row.rentdate
        this.basicForm.dateValue=[row.begindate,row.enddate]
        this.$axios.post(SelectSign,{
          id:row.signinfo
        }).then(res =>{
          if (res.data.resultCode== 0) {
            if (res.data.data.waterrenttype!==null||res.data.data.electricity!==0||res.data.data.gasCharges!==0){
              this.basicForm.costCheck=[1,2,3]
            }
          this.agencyRow.houseid=res.data.data.houseid,
             this.agencyRow.availabilityName=res.data.data.housename,
             this.agencyRow.roomid=res.data.data.roomid,
             this.agencyRow.roomnum=res.data.data.roomnum,
              this.basicForm.name=res.data.data.rentname,
             this.basicForm.phoneNum=res.data.data.phone,
             this.basicForm.idNum=res.data.data.icciddno,
             this.basicForm.leaseMoney=res.data.data.rentamount,
              this.basicForm.deposit=res.data.data.deposit,
             this.basicForm.waterCostType=res.data.data.waterrenttype,
             this.basicForm.waterCost=res.data.data.waterrent,
             this.basicForm.waterrentunit=res.data.data.waterrentunit,
             this.basicForm.waterReading=res.data.data.waterdegree,
             this.basicForm.waterDate=res.data.data.waterdate,
             this.basicForm.electricity=res.data.data.electricunit,
             this.basicForm.electricityReading=res.data.data.electricdegree,
             this.basicForm.electricityDate=res.data.data.electricdate,
              this.basicForm.gasCharges=res.data.data.gasunit,
             this.basicForm.gasReading=res.data.data.gasdegree,
             this.basicForm.gasDate=res.data.data.gasdate,
            this.photoSrc=res.data.data.iccimg
          }else{
            this.$message.error(res.data.resultDesc)
          }
        })
        this.titleName='查看租约'
        this.drawerAgency=true
      },
      //签约Drawer关闭
      closeDrawer() {
        this.basicForm = {}
        this.$refs.upload.clearFiles()
        this.isMax = false
        this.showWater=false
        this.showElectricity=false
        this.showGas=false
      },
      //上传图片
      handleRemove(file, fileList) {
        if (fileList.length < 1) {
          this.isMax = false
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      change: function (file, fileList) {
        if (fileList.length >= 1) {
          this.isMax = true
        }
        for (let i=0;i<fileList.length;i++){
          this.getBase64(fileList[i].raw).then(res => {
            this.imgResult=res
          });
        }
      },
      // 转图片为base64
      getBase64(file){

        return new Promise(function (resolve, reject) {
          let reader =new FileReader();
          reader.readAsDataURL(file);
          reader.onload=function () {
            this.imgResultOne=reader.result;
          };
          reader.onerror =function (error) {
            reject(error);
          };
          reader.onloadend =function () {
            resolve( this.imgResultOne);
          }
        })
      },
      //签约【确认】
      signonfoOk(){
        this.$axios.post(AddSignInfo,{
          rentinfo: {
            begindate:this.basicForm.dateValue[0]+' 00:00:00',
            enddate:this.basicForm.dateValue[1]+' 00:00:00',
            rentdate: this.basicForm.cycle,
            id:this.rentID
          },
          houseid:this.agencyRow.houseid,
          housename:this.agencyRow.availabilityName,
          roomid:this.agencyRow.roomid,
          roomnum:this.agencyRow.roomnum,
          rentname:this.basicForm.name,
          phone:this.basicForm.phoneNum,
          icciddno:this.basicForm.idNum,
          rentamount:parseFloat(this.basicForm.leaseMoney),
          deposit:parseFloat(this.basicForm.deposit),
          feetype:0,
          waterrenttype:parseInt(this.basicForm.waterCostType),
          waterrent:parseFloat(this.basicForm.waterCost),
          waterrentunit:parseFloat(this.basicForm.waterrentunit),
          waterdegree:parseFloat(this.basicForm.waterReading),
          waterdate:'2020-06-06  00:00:00',
          electricunit:parseFloat(this.basicForm.electricity),
          electricdegree:parseFloat(this.basicForm.electricityReading),
          electricdate:this.basicForm.electricityDate+' 00:00:00',
          gasunit:parseFloat(this.basicForm.gasCharges),
          gasdegree:parseFloat(this.basicForm.gasReading),
          gasdate:this.basicForm.gasDate+' 00:00:00',
          iccimg:this.imgResult
        }).then(res =>{
          console.log(this.$axios.request())
          if (res.data.resultCode== 0) {
            this. drawerAgency=false
            this.GetAvailabilityList()
            this.$message.success(res.data.resultDesc)
          }else{
            this. drawerAgency=false
            this.$message.error(res.data.resultDesc)
          }
        })
      },

      uploadSuccess(file, fileList) {
        this.$message.success('上传成功！')

      },
      uploadError(file, fileList) {
        this.$message.error('上传失败！')
        if (fileList.length >= 2) {
          this.isMax = true
        } else {
          this.isMax = false
        }

      },
      //选择租赁时间的回调
      selectDate(date) {
        this.basicForm.dateValue = date

      },
      //change费用类型
      showSelect(costCheck){

       /* for (let i =0; i<costCheck.length;i++) {
          if (costCheck[i]==2){
            this.showElectricity=true
          } else {
            this.showElectricity=false
          }
        }
        for (let i =0; i<costCheck.length;i++) {
          if (costCheck[i]==3){
            this.showGas=true
          } else {
            this.showGas=false
          }*/
        }
      /*  for (let i =0; i<costCheck.length;i++){
          console.log('燃气费显示：'+i)
          if (i[0]==1){this.showWater=true}else{this.showWater=false}
          if (i[1]==2){this.showElectricity=true}else {this.showWater=false}
          if (i[2]==3){this.showGas=true}else {this.showWater=false}
          console.log('燃气费显示：'+this.showGas)
        }*/
    },

    mounted() {
      this.GetAvailabilityList()
      let a= this.$store.state.isLogin
      this.users=a
    }
  }
</script>

<style scoped>
  .overall {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: #F2F2F2;
  }

  .sidebar {
    width: 200px;
    padding-left: 10px;
    padding-top: 5px;
    border-right: #CCCCCC 1px solid;
    background-color: #ffffff;
  }

  .right-zone {
    width: 100%;
  }

  .sidebar-title {
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-left: #333333 3px solid;
  }

  .availability-button {
    width: 200px;
    display: flex;
    border-bottom: #CCCCCC 2px dashed;
    padding-bottom: 5px;
    justify-content: space-around;
    margin-top: 10px;
  }

  .availability-children {
    padding-top: 10px;
    padding-left: 5px;
  }

  .top-state {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-bottom: #CCCCCC 1px solid;
    justify-content: space-around;
  }

  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 2em !important;
    background-color: #333333;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }

  .right-main {
    width: 100%;
    height: 400px;
  }

  .title-class {
    display: block;
    height: 17px;
    font-size: 17px;
    width: 100px;
    border-left: 3px #7aa9da solid;
    margin-left: 10px;
    font-weight: 600;
    text-align: left;
    padding-left: 5px;
    margin-bottom: 20px;
  }

  .drawer-all {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    flex-direction: column;
  }

  .input-name {
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
  }

  .input-title {
    display: inline-block;
    width: 150px;
    text-align: right;
    margin-right: 20px
  }

  .button-area {
    width: 100%;
    margin-top: 100px;
    display: flex;
    justify-content: space-around;
  }

  .agency-all {
    height: 550px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: left;
    padding-top: 20px;
    overflow: auto;
  }

  .button-agency {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }

  .room-information {
    width: 440px;
  }

  .drawer-agency-title {
    display: block;
    border-left: 4px solid #909399;
    text-align: left;
    font-size: 16px;
    height: 20px;
    line-height: 20px;
    padding-left: 5px;
    background-color: #d3d4d6;
  }

  .room-details {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    font-size: 14px;
  }

  .basic-information {
    padding: 10px;
  }

  .disabled >>> .el-upload--picture-card {
    display: none !important;
  }
  .cost{
    width: 100px;
    display: block;
    background-color: #d3d4d6;
    font-size: 14px;
  }
  .cost-Style{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }

</style>
