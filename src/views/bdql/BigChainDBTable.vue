<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">
        Export
      </el-button>

    </div>

     
    <el-table :data="list" border fit highlight-current-row style="width: 100%;" >
             
      <el-table-column v-for="item in tableFields" :key="item" :label="item" align="center">
                 
        <template slot-scope="scope">
                      <span>{{ scope.row[item] }}</span>
                   
        </template>
               
      </el-table-column>
         
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="tempField" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">

        <el-form-item v-for="(item) in tempField" :label="item.field" >
          <el-input  v-model="item.value"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="createData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {fetchPv} from '../../api/article'
    import {getTableData}from '../../api/bigchaindb'
    import waves from '../../directive/waves' // waves directive
    import Pagination from '../../components/Pagination' // secondary package based on el-pagination

    export default {
        name: 'BigChainDBTable',
        components: {Pagination},
        directives: {waves},
        data() {
            return {
                tableKey: 0,
                list: [],
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },


                tempField: [],
                tempCount: 1,

                dialogFormVisible: false,
                dialogFormTitle:'添加信息',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                dialogPvVisible: false,
                pvData: [],
                downloadLoading: false,
                tableFields: []
            }
        },
        created() {
            this.getList()
        },
        methods: {
            /**
             * 调用api查
             */
            getList() {
                this.listLoading = true
                getTableData().then(response => {

                    this.list = response.data.data
                    this.total = response.data.total
                    this.tableFields = response.data.field
                    console.log(this.tableFields);
                    for (var i = 0; i < response.data.field.length; i++) {
                        this.tempField.push({'value': '', 'field': response.data.field[i]});
                    }
                    console.log(this.tempField);
                    // Just to simulate the time of the request
                    setTimeout(() => {
                        this.listLoading = false
                    }, 1.5 * 1000)
                })

            },



            handleModifyStatus(row, status) {
                this.$message({
                    message: '操作Success',
                    type: 'success'
                })
                row.status = status
            },

            handleCreate() {

                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            createData() {//添加按钮
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        console.log(this.tempField)
                    }
                })
            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.temp.timestamp = new Date(this.temp.timestamp)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleDelete(row, index) {
                this.$notify({
                    title: 'Success',
                    message: 'Delete Successfully',
                    type: 'success',
                    duration: 2000
                })
                this.list.splice(index, 1)
            },
            handleFetchPv(pv) {
                fetchPv(pv).then(response => {
                    this.pvData = response.data.pvData
                    this.dialogPvVisible = true
                })
            },
            handleDownload() { //下载表中的数据
                this.downloadLoading = true
                import('../../vendor/Export2Excel').then(excel => {
                    const tHeader = this.tableFields
                    const filterVal = this.tableFields
                    const data = this.formatJson(filterVal)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'table-list'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.list.map(v => filterVal.map(j => {
                    return v[j]
                }))
            },
            getSortClass: function (key) {
                const sort = this.listQuery.sort
                return sort === `+${key}` ? 'ascending' : 'descending'
            }
        }
    }
</script>
