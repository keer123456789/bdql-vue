<template>
  <div class="components-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
          <el-row v-if="activeName==='table'">
            <div style="margin-bottom:50px;">
              <el-col :span="8" class="text-center">
                <label class="label">数据集类型:
                  <el-select ref="select" v-model="collection" placeholder="请选择">
                    <el-option v-for="item in collections" :key="item.value" :label="item.label" :value="item.value"/>
                  </el-select>
                </label>
              </el-col>

              <el-col :span="8" class="text-center">
                <label class="label">数据表类型:
                  <el-select v-if="collection==='CREATE'" ref="select" v-model="table" placeholder="请选择">
                    <el-option v-for="item in asset_tables" :key="item.value" :label="item.label"
                               :value="item.value"/>
                  </el-select>
                  <el-select v-else ref="select" v-model="table" placeholder="请选择">
                    <el-option v-for="item in metadata_tables" :key="item.value" :label="item.label"
                               :value="item.value"/>
                  </el-select>
                </label>
              </el-col>
              <el-col :span="8" class="text-center">
                <el-button type="primary">
                  查询
                </el-button>
              </el-col>
            </div>
          </el-row>
          <el-row v-else>

            <div style="width: 90%;margin-left: 5%;">
              <textarea class="el-textarea" style="padding:8px" rows="3" placeholder="请输入"></textarea>

            </div>
            <div class="clearfix" style="margin-top: 2%;margin-left: 90%;">
              <el-button type="primary" style="margin-right: 100%;">
                查询
              </el-button>
            </div>

          </el-row>

        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <el-card class="box-card" style="margin-top: 50px">
      <div slot="header" class="clearfix">
        <span>数据展示</span>
      </div>
      <ComplexTable></ComplexTable>
    </el-card>

  </div>
</template>

<script>
    import ComplexTable from "./BigChainDBTable";

    export default {
        name: "query",
        components: {ComplexTable},
        data() {
            return {
                collections: [
                    {value: 'CREATE', label: '关键数据'},
                    {value: 'TRANSFER', label: '附加数据集'}
                ],
                asset_tables: [
                    {value: 'people', label: 'people'},
                    {value: 'school', label: 'school'}
                ],
                metadata_tables: [
                    {value: 'score', label: 'score'},
                    {value: 'event', label: 'event'}
                ],
                collection: '',
                table: '',
                tabMapOptions: [
                    {label: '表查询', key: 'table'},
                    {label: 'BDQL查询', key: 'BDQL'}
                ],
                activeName: 'table',

            }
        }

    }
</script>

<style scoped>

</style>
