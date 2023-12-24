<template>
  <div>
    <div class="content-header">
      <h1>指导记录表学生信息</h1>
    </div>
    <div class="app-container">
      <div class="box">
        <div class="filter-container">
          <el-input placeholder="学号" v-model="taskData.pagination.studentNo" style="width: 200px;"
                    class="filter-item"></el-input>
          <el-input placeholder="姓名" v-model="taskData.pagination.studentName" style="width: 200px;"
                    class="filter-item"></el-input>
          <el-input placeholder="教师工号" v-model="taskData.pagination.teacherNo" style="width: 200px;"
                    class="filter-item"></el-input>
          <el-button v-on:click="getAll()" class="dalfBut">查询</el-button>
          <!--          <el-button type="primary" class="butT" v-on:click="handleCreate()">增加学生</el-button>-->
        </div>

        <el-table size="small" current-row-key="id" :data="taskData.dataList" stripe highlight-current-row>
          <el-table-column type="index" align="center" label="序号"></el-table-column>
          <el-table-column prop="schoolName" label="学院" align="center"></el-table-column>
          <el-table-column prop="major" label="专业" align="center"></el-table-column>
          <el-table-column prop="className" label="班级" align="center"></el-table-column>
          <el-table-column prop="sno" label="学号" align="center"></el-table-column>
          <el-table-column prop="studentName" label="学生姓名" align="center"></el-table-column>
          <el-table-column prop="teacherNo" label="教师工号" align="center"></el-table-column>
          <el-table-column prop="projectTitle" label="中文题目" align="center"></el-table-column>
          <el-table-column prop="englishTitle" label="英文题目" align="center"></el-table-column>


          <el-table-column prop="lockit" v-if="roleFlag" fixed="right" label="教师操作" width="250">
            <template #default="scope">
              <!--                            <div>{{ scope.row }}</div>-->
              <el-button
                  v-if="roleFlag"
                  link
                  type="primary"
                  size="small"
                  @click.prevent="handleUpdate(scope)"
              >
                编辑
              </el-button>

              <el-button
                  v-if="roleFlag"
                  link
                  type="danger"
                  size="small"
                  @click.prevent="handleDelete(scope)"
              >
                删除
              </el-button>

              <!--              <el-radio-group v-model="scope.row.lockTask" @change="handleLockOrNot(scope)">-->
              <!--                <el-radio :label="1">Lock</el-radio>-->
              <!--                <el-radio :label="2">Unlock</el-radio>-->
              <!--              </el-radio-group>-->

            </template>
          </el-table-column>


        </el-table>

        <!--分页组件-->
        <div class="pagination-container">
          <el-pagination
              class="pagiantion"
              @current-change="handleCurrentChange"
              :current-page="taskData.pagination.currentPage"
              :page-size="taskData.pagination.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="taskData.pagination.total">
          </el-pagination>
        </div>

        <!-- 新增标签弹层 -->


        <!-- 编辑标签弹层 -->

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import axios from 'axios'
import router from "@/router";


class person {
  name: string = "";
  age: number = 0;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const taskData = ref({

  dataList: [],//当前页要展示的列表数据
  dialogFormVisible: false,//添加表单是否可见
  dialogFormVisible4Edit: false,//编辑表单是否可见
  taskFormPlanList: {},//表单数据
  rules: {//校验规则
    type: [{required: true, message: '类别为必填项', trigger: 'blur'}],
    name: [{required: true, message: '名称为必填项', trigger: 'blur'}]
  },
  pagination: {//分页相关模型数据
    currentPage: 1,//当前页码
    pageSize: 10,//每页显示的记录数
    total: 0,//总记录数
    studentName: null,
    studentNo: null,
    teacherNo: null
  }
});
//计算属性 ref 分角色，分功能
const roleFlag = ref(computed<boolean>(() => {
  return localStorage.getItem("loginRole") === "2" ? false : true
}))
//钩子函数，VUE对象初始化完成后自动执行
onMounted(() => {
  getAll()
})

//列表
const getAll = () => {
  let param = "?q"
  if (taskData.value.pagination.studentName != null) {
    param += "&studentName=" + taskData.value.pagination.studentName
    taskData.value.pagination.studentName = null
  }
  if (taskData.value.pagination.studentNo != null) {
    param += "&sno=" + taskData.value.pagination.studentNo
    taskData.value.pagination.studentNo = null
  }
  if (taskData.value.pagination.teacherNo != null) {
    param += "&email=" + taskData.value.pagination.teacherNo
    taskData.value.pagination.teacherNo = null
  }
  const url = "/tasks/" + localStorage.getItem("userName") + "/" + taskData.value.pagination.currentPage + "/" + taskData.value.pagination.pageSize + param
  // const url = "/tasks/" + taskData.value.pagination.currentPage + "/" + taskData.value.pagination.pageSize + param

  axios.get(url).then((res) => {
    taskData.value.pagination.currentPage = res.data.current
    taskData.value.pagination.pageSize = res.data.size
    taskData.value.pagination.total = res.data.total;
    taskData.value.dataList = res.data.records
  })
};

//弹出添加窗口
const handleCreate = () => {
  resetForm()
  taskData.value.dialogFormVisible = true
};

//重置表单
const resetForm = () => {
  taskData.value.taskFormPlanList = {}
  // console.log("radioData.value.formData...............", radioData.value.formData)
};

//添加
const handleAdd = () => {
  taskData.value.dialogFormVisible = true;
  // console.log("formData---------------", taskData.value.taskFormPlanList)

  axios.post("/tasks", taskData.value.taskFormPlanList).then((res) => {
    if (res.data.flag) {
      taskData.value.dialogFormVisible = false
      alert("add ok")
    } else {
      alert("add fail.")
    }
  }).finally(() => {
    getAll()
  })
};

//取消
const cancel = () => {
  taskData.value.dialogFormVisible = false
  taskData.value.dialogFormVisible4Edit = false
  // this.$message.info("cancel now!")
};

// 删除
const handleDelete = (row: any) => {

  // console.log("row------", row.row.id)
  axios.delete("/users/" + row.row.id).then((res) => {
    if (res.data.flag) {
      alert("delete ok!")
    } else
      alert("delete fail!")
  }).finally(() => {
    getAll()
  })
}
const handleLockOrNot = (row) => {
  // console.log(row)
  const url = "/taskform/lockornot/" + row.row.sno + "/" + row.row.lockTask
  // console.log(url)
  axios.put(url).then((res) => {
    // console.log(res)
    if (res.data.code == 200) {
      getAll()
      alert(row.row.studentName + "任务书锁定或解锁成功！")
    } else
      alert(row.row.studentName + "任务书锁定或解锁失败！")

  })

};
//弹出编辑窗口
const handleUpdate = (row) => {
  localStorage.setItem("currentStudentSno", row.row.sno)
  sessionStorage.setItem("currentStudentName", row.row.studentName)
  router.push("/instruction-record-form")
};

// 修改
const handleEdit = () => {
  axios.put("/tasks", taskData.value.taskFormPlanList).then((res) => {
    if (res.data.flag) {
      taskData.value.dialogFormVisible4Edit = false
      alert("数据更新成功！")
    } else {
      alert("数据更新失败！")
    }
  }).finally(() => {
    getAll()
  })
};

const handleCurrentChange = (currentPage: number) => {
  taskData.value.pagination.currentPage = currentPage
  getAll()
}
</script>

