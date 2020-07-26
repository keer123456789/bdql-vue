<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="chainHash" align="center">
      <template slot-scope="scope">
        {{ scope.row.chainHash }}
      </template>
    </el-table-column>
    <el-table-column label="blockHeight" align="center">
      <template slot-scope="scope">
        {{ scope.row.blockHeight  }}
      </template>
    </el-table-column>

    <el-table-column label="collection" align="center">
      <template slot-scope="scope">
        {{scope.row.collection }}
      </template>
    </el-table-column>
    <el-table-column label="Operation" align="center">
      <template slot-scope="scope">
        {{ scope.row.operation }}
      </template>
    </el-table-column>
    <el-table-column label="txHash" align="center">
      <template slot-scope="scope">
        {{ scope.row.txHash }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
    import {getStatisticData} from '../../../api/bigchaindb'


    export default {
        data() {
            return {
                list: null
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                getStatisticData().then(response => {
                    this.list = response.data.data
                })
            }
        }
    }
</script>
