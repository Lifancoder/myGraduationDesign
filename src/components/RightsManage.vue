<template>
  <div style="text-align: left; padding-left: 20px;padding-right: 20px;background-color: #F2F2F2;padding-top: 8px;height: 100%">
    <div style="margin: 8px 0 20px 0px; border-left: #333333 3px solid;height: 20px;line-height: 20px;padding-left: 8px">权限管理</div>
    <div id="role" style="background-color: #ffffff">
      <el-tabs tab-position="left" v-model="activeName" style="max-height: 600px" @tab-click="handleClick(activeName)">
        <el-tab-pane label="角色管理" name="1">
          <div style="text-align:left">
            <div>
              <div style="margin-top: 10px">
                <el-button type="primary" style="width:100px;" size="small" @click="addRole()">新建角色</el-button>
              </div>
              <div style="margin-top: 20px;">
                <el-table
                  size="small"
                  :data="role_list"
                  :header-cell-style="{'background-color': '#F7F3FB'}"
                  width="100%"
                  style="margin-bottom: 50px"
                  stripe>
                  <el-table-column
                    label="角色名称"
                    align="center"
                    min-width="15%"
                    prop="rolename"></el-table-column>
                  <el-table-column
                    label="员工数量"
                    align="center"
                    min-width="15%"
                    prop="rolenum"></el-table-column>
                  <el-table-column
                    label="创建人"
                    align="center"
                    min-width="15%"
                    prop="createname"></el-table-column>
                  <el-table-column
                    label="创建时间"
                    align="center"
                    min-width="15%">
                    <template slot-scope="scope">
                      <span v-if="scope.row.createdate!==null">{{scope.row.createdate.substr(0,10)}}</span>
                      <span v-else>-</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    min-width="25%"
                    label="操作">
                    <template slot-scope="scope">
                      <el-button type="primary" plain size="mini" @click.stop="manageRole(scope.row)">编辑</el-button>
                      <el-button type="primary" plain size="mini" @click.stop="deleteRoleshow(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="员工管理" name="2">
          <div style="text-align: left;">
            <div style="margin-top: 10px">
              <el-select v-model="EmplOne.roleValue" size="small" @change="selectRole(EmplOne.roleValue)">
                <el-option  :key="0" value="" label="全部角色"></el-option>
                <el-option v-for="i in role_list" :key="i.id" :value="i.rolename"
                           :label="i.rolename"></el-option>
              </el-select>
              <el-button size="small" type="primary" plain @click="addEmpl">添加员工</el-button>
            </div>
            <div style="margin-top: 20px;">
              <el-table
                size="small"
                :data="empl_list"
                style="margin-bottom: 50px"
                :header-cell-style="{'background-color': '#F7F3FB'}"
                width="100%"
                stripe>
                <el-table-column
                  label="员工姓名" prop="username" min-width="20%"></el-table-column>
                <el-table-column
                  label="角色名称" prop="rolename" min-width="20%" align="center">
                  <!--<template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.roleNameList.join('、')" placement="right">
                      <span class="a-line-table">{{scope.row.roleNameList.join('、')}}</span>
                    </el-tooltip>
                  </template>-->
                </el-table-column>
                <el-table-column
                  label="登录账号"
                  prop="loginno"
                  min-width="20%"
                  align="center"></el-table-column>
                <el-table-column
                  label="登录密码"
                  prop="password"
                  min-width="20%"
                  align="center"></el-table-column>
                <el-table-column
                  label="创建人"
                  prop="createname"
                  min-width="20%"
                  align="center"></el-table-column>
                <el-table-column
                  label="创建时间"
                  prop="createtime"
                  min-width="20%"
                  align="center"></el-table-column>
                <el-table-column
                  label="操作"
                  min-width="40%"
                  align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain @click.stop="editEmplShow(scope.row)">编辑</el-button>
                    <el-button size="mini" type="primary" plain @click.stop="showDeleteEmpl(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
<!--      添加员工/编辑员工/修改密码-->
      <el-dialog
        :title="addEmplTitle"
        :visible.sync="addEmplDialogShow"
        width="30%">
        <div style="text-align: center;display: flex;flex-direction: column;justify-content: center;align-items: center">
          <div style="text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: center">
            <span>选择角色：</span>
            <el-select :disabled="isEdit" v-model="EmplOne.roleValue" placeholder="请选择" style="width: 200px">
              <el-option
                v-for="item in role_list"
                :key="item.id"
                :label="item.rolename"
                :value="item.rolename">
              </el-option>
            </el-select>
          </div>
          <div style="text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 10px">
            <span>员工名称：</span>
            <el-input  v-model.trim="EmplOne.EmplName" style="width: 200px"></el-input>
          </div>
          <div style="text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 10px">
            <span>登录账号：</span>
            <el-input  v-model.trim="EmplOne.account" style="width: 200px"></el-input>
          </div>
          <div style="text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 10px">
            <span>登录密码：</span>
            <el-input v-model.trim="EmplOne.pwd" style="width: 200px"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addEmplDialogShow=false">取 消</el-button>
        <el-button type="primary" @click.stop="addEmplOK">确 定</el-button>
      </span>
      </el-dialog>
      <!--             Dialog--新增角色/修改角色-->
      <el-dialog
        :title="addRoleTitle"
        :visible.sync="addRoleDialogShow"
        width="30%">
        <div style="text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: center">
          <span>角色名称：</span>
          <el-input v-model.trim="roleOne.newRoleName" style="width: 200px"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="releCancel">取 消</el-button>
        <el-button type="primary" @click.stop="roleAdd">确 定</el-button>
      </span>
      </el-dialog>
      <!--            Dialog--确认删除-->
      <el-dialog
        title="提示"
        :visible.sync="deleteRoleDialogShow"
        width="30%"
        center>
        <div style="text-align: center;">
          <span>确定删除该角色吗？</span>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="deleteRoleDialogShow = false">取 消</el-button>
        <el-button type="primary"  @click.stop="deleteRoleOk">确 定</el-button>
      </span>
      </el-dialog>
      <!--            Dialog--确认删除-->
      <el-dialog
        title="提示"
        :visible.sync="deleteEmplDialogShow"
        width="30%"
        center>
        <div style="text-align: center;">
          <span>确定删除该员工吗？</span>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="deleteEmplDialogShow = false">取 消</el-button>
        <el-button type="primary"  @click.stop="deleteEmpl">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
   import {GetRoleList,UpdateRole,AddRole,deleteRole,AddEmpl,GetEmplList,DeleteEmpl,EditEmpl} from '@/assets/jsAPI/api'

  export default {
    data() {
      return {
        activeName:'1',
        // 角色管理
        role_list: [],
        empl_list:[],
        addRoleTitle:'新建角色',
        addEmplTitle:'添加员工',
        pageSize: 10,
        allRole:'全部角色',
        users:{},
        roleOne:{
          id:0,
          rolename:'',
          newRoleName:'',
          rolenum:0
        },
        EmplOne:{
          id:0,
          roleValue:'',
          EmplName:'',
          account:'',
          pwd:''
        },
        addRoleDialogShow:false,
        deleteRoleDialogShow:false,
        addEmplDialogShow:false,
        deleteEmplDialogShow:false,
       isEdit:false,
      }
    },
    methods:{
      // 获取角色列表
     getRoleList(){
       let loading = this.$loading({target: '#role', text: '加载中...'})
       this.$axios.post(GetRoleList,{
       }).then(res =>{
         if (res.data.resultCode==0) {
           loading.close()
           this.role_list=res.data.data
         }else {
           this.$message.error(res.data.resultDesc)
           loading.close()
         }
       }).catch(e =>{this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~'),loading.close()})
     },
      // 获取员工列表
      getEmplList(){
        let loading = this.$loading({target: '#role', text: '加载中...'})
        if (this.EmplOne.roleValue==''){
          this.$axios.post(GetEmplList,{
          }).then(res =>{
            if (res.data.resultCode==0){
              loading.close()
              this.empl_list=res.data.data
            } else{
              this.$message.error(res.data.resultDesc)
              loading.close()
            }

          }).catch(e =>{
            this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~')
            loading.close()
          })
        }else {
          this.$axios.post(GetEmplList,{
            rolename:this.EmplOne.roleValue
          }).then(res =>{
            if (res.data.resultCode==0) {
              loading.close()
              this.empl_list=res.data.data
            }else {
              this.$message.error(res.data.resultDesc)
              loading.close()
            }
          }).catch(e =>{
            this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~')
            loading.close()
          })
        }
      },
      //角色校验
      checkRole(){
         if (this.roleOne.newRoleName=='') {
           return false
         }
         return true
      },

      //角色--【修改】
      manageRole(row){
       this.addRoleTitle='修改角色'
       this.addRoleDialogShow=true
        this.roleOne.id=row.id
        this.roleOne.rolename=row.rolename
        this.roleOne.newRoleName=row.rolename
        this.roleOne.rolenum=row.rolenum
      },
      //新建/修改角色取消
      releCancel(){
        this.addRoleDialogShow = false
        this.roleOne.id=null
        this.roleOne.rolename=''
        this.roleOne.newRoleName=''
        this.roleOne.rolenum=null
      },
      // 新建角色
      addRole(){
        this.addRoleTitle='新建角色'
        this.roleOne.newRoleName=''
        this.addRoleDialogShow=true
      },
      //新建角色/修改角色【确认】
      roleAdd(){
       if (!this.checkRole()){
         this.$message.error('请填写信息！')
         return false
       }
       if (this.addRoleTitle=='新建角色'){
         this.$axios.post(AddRole,{
           rolename:this.roleOne.newRoleName
         }).then(res =>{
           if (res.data.resultCode==0) {
             this.getRoleList()
             this.addRoleDialogShow=false
             this.$message.success(res.data.resultDesc)
           }else {
             this.$message.error(res.data.resultDesc)
             this.addRoleDialogShow=false
           }
         }).catch(e =>{this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~')})
       }else {
         this.$axios.post(UpdateRole,{
           id:this.roleOne.id,
           rolename:this.rolename,
           newrolename:this.roleOne.newRoleName,
           rolenum:this.roleOne.rolenum
         }).then(res =>{
           if (res.data.resultCode==0) {
             this.getRoleList()
             this.$message.success(res.data.resultDesc)
             this.addRoleDialogShow=false
           }else {
             this.$message.error(res.data.resultDesc)
             this.addRoleDialogShow=false
           }
         }).catch(e =>{this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~')})
       }
      },

      // 角色列表操作--【删除】
      deleteRoleshow(row){
       this.deleteRoleDialogShow=true
        this.roleOne.id=row.id
        this.roleOne.rolename=row.rolename
      },
      //删除角色【确认】
      deleteRoleOk(){
        this.$axios.post(deleteRole,{
          rolename:this.roleOne.rolename,
          id:this.roleOne.id
        }).then(res =>{
          if (res.data.resultCode==0) {
            this.getRoleList()
            this.$message.success(res.data.resultDesc)
            this.deleteRoleDialogShow=false
          }else {
            this.$message.error(res.data.resultDesc)
            this.deleteRoleDialogShow=false
          }
        }).catch(e =>{this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~')})
      },
      //【添加员工】
      addEmpl(){
       this.addEmplTitle='添加员工'
        this.isEdit=false
       this.addEmplDialogShow=true
        this.EmplOne.roleValue='',
          this.EmplOne.EmplName='',
          this.EmplOne.account='',
          this.EmplOne.pwd=''
    },
      // 员工管理-【编辑】
      editEmplShow(row){
        this.addEmplTitle='编辑员工'
        this.isEdit=true
        this.addEmplDialogShow=true
        this.EmplOne.id=row.id
        this.EmplOne.roleValue=row.rolename,
          this.EmplOne.EmplName=row.username,
          this.EmplOne.account=row.loginno,
          this.EmplOne.pwd=row.password
      },
      // 编辑员工校验
      checkEditEmpl(){
       if (this.EmplOne.EmplName=='') {
          return false
        }else if (this.EmplOne.account==''){
          return false
        }else if (this.EmplOne.pwd==''){
          return false
        }
        return true
      },

      //添加员工-校验
      checkEmpl(){
       if (this.EmplOne.roleValue==''){
         return false
       }else if (this.EmplOne.EmplName=='') {
         return false
       }else if (this.EmplOne.account==''){
         return false
       }else if (this.EmplOne.pwd==''){
         return false
       }
       return true
      },
      //添加/编辑员工【确认】
      addEmplOK(){
       if (this.addEmplTitle=='添加员工') {
         if (!this.checkEmpl()){
           this.$message.error('请填写信息！')
           return false
         }
         this.$axios.post(AddEmpl,{
           rolename:this.EmplOne.roleValue,
           username:this.EmplOne.EmplName,
           loginno:this.EmplOne.account,
           password:this.EmplOne.pwd,
           createname:this.users.username
         }).then(res =>{
           if (res.data.resultCode==0) {
             this.$message.success(res.data.resultDesc)
             this.addEmplDialogShow=false
             this.EmplOne.roleValue=''
             this.getEmplList()
           }else {
             this.$message.error(res.data.resultDesc)
             this.addEmplDialogShow=false
           }
         }).catch(e =>{this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~')})
       }else {
         if (!this.checkEditEmpl()){
           this.$message.error('请填写信息！')
         }
         this.$axios.post(EditEmpl,{
           id:this.EmplOne.id,
           username:this.EmplOne.EmplName,
           loginno:this.EmplOne.account,
           password:this.EmplOne.pwd
         }).then(res=>{
           if(res.data.resultCode==0){
             this.$message.success(res.data.resultDesc)
             this.addEmplDialogShow=false
             this.EmplOne.roleValue=''
             this.getEmplList()
           }else {
             this.$message.error(res.data.resultDesc)
             this.addEmplDialogShow=false
           }

         }).catch(e =>{this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~')})
       }
      },
      //员工按角色查询
      selectRole(){
       this.getEmplList()
      },
      //【删除】员工
      showDeleteEmpl(row){
       this.deleteEmplDialogShow=true
        this.EmplOne.id=row.id
        this.EmplOne.EmplName=row.username,
          this.EmplOne.account=row.loginno
      },
      //删除员工【确定】
      deleteEmpl(){
       this.$axios.post(DeleteEmpl,{
         id:this.EmplOne.id,
         username:this.EmplOne.EmplName,
         loginno:this.EmplOne.account
       }).then(res =>{
         if (res.data.resultCode==0) {
           this.getEmplList()
           this.$message.success(res.data.resultDesc)
           this.deleteEmplDialogShow=false
         }else {
           this.$message.error(res.data.resultDesc)
           this.deleteEmplDialogShow=false
         }
       }).catch(e =>{this.$message.error('服务器丢失哟/(ㄒoㄒ)/~~')})
      },
      //选择【角色管理】、【员工管理】
      handleClick(activeName){
       if (activeName==1){
         let a= this.$store.state.isLogin
         this.users=a
         this.getRoleList()
       }else {
         let a= this.$store.state.isLogin
         this.users=a
         this.getEmplList()
       }
      },

    },
    mounted() {
      this.getRoleList()
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


