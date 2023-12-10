<template>
  <!-- 编辑表头-->
  <div class="bold">
    <div>题目:{{ formData.formHeaderData.projectTitle }}</div>
    <div>英文题目:{{ formData.formHeaderData.englishTitle }}</div>
    <div>学部（院）:{{ formData.formHeaderData.schoolName }}</div>
    <div>专业:{{ formData.formHeaderData.major }}</div>
    <div>班级:{{ formData.formHeaderData.className }}</div>
    <div style="color: blue">姓名:{{ formData.formHeaderData.studentName }}</div>
    <div>学号:{{ formData.formHeaderData.sno }}</div>
    <div style="color: red">锁定状态: {{ showlockState }}</div>
    <el-divider/>
  </div>

  <el-row justify="space-between">
    <el-col :span="2">
      <el-text class="mx-1" size="large">指导记录：</el-text>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" :icon="CirclePlus" @click.prevent="handleEnterAddForm(scope)">添加记录</el-button>
    </el-col>
  </el-row>
  <el-table current-row-key="id" :data="formData.recordList" style="width: 100%" stripe highlight-current-row>
    <el-table-column prop="sno" label="序号" width="100"/>
    <el-table-column prop="instructionContent" label="指导内容" width="1000"/>
    <el-table-column prop="createTime" label="日期" width="200"/>
    <el-table-column fixed="right" label="操作" width="100">
      <template #default="scope">
        <el-button link type="warning" size="small" @click.prevent="handleEnterEditForm(scope)">编辑</el-button>
        <el-button link type="danger" size="small" @click.prevent="handleDelete(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-divider/>
  <div align="center">
    <el-button size="large" type="success" @click="showPDF">文档预览</el-button>
    <el-button size="large" type="success" @click="downloadWord">下载Word版</el-button>
    <el-button size="large" type="success" @click="downloadPDF">下载PDF版</el-button>
    <el-button size="large" type="success" @click="showvuePDF">vue文档预览</el-button>
  </div>

  <!-- 编辑指导记录对话框 -->
  <div class="add-form">
    <el-dialog title="编辑指导记录" v-model="formData.dialogFormVisible4Edit">
      <el-form ref="dataEditForm" v-model="formData.instructionRecord" :rules="formData.rules" label-position="right"
               label-width="200px">
        <el-form-item prop="sno" label="序号">
          <el-input disabled v-model="formData.instructionRecord.sno"/>
        </el-form-item>
        <el-form-item prop="studentNo" label="学号">
          <el-input disabled v-model="formData.instructionRecord.studentNo"/>
        </el-form-item>
        <el-form-item prop="instructionRecord" label="指导记录">
          <el-input
              v-model="formData.instructionRecord.instructionContent"
              :autosize="{ minRows: 1, maxRows: 4 }"
              type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="handleRecordEdit()">确定</el-button>
      </div>
    </el-dialog>
  </div>

  <!-- 添加指导记录对话框 -->
  <div class="add-form">
    <el-dialog title="添加指导记录" v-model="formData.dialogFormVisible">
      <el-form ref="dataEditForm" v-model="formData.instructionRecord" :rules="formData.rules" label-position="right"
               label-width="200px">
        <el-form-item prop="studentNo" label="学号">
          <el-input disabled v-model="formData.instructionRecord.studentNo"/>
        </el-form-item>
        <el-form-item prop="instructionRecord" label="指导记录">
          <el-input
              v-model="formData.instructionRecord.instructionContent"
              :autosize="{ minRows: 1, maxRows: 4 }"
              type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="handleRecordAdd()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue'
import axios from 'axios'
import {useRouter} from "vue-router";
import {CirclePlus} from '@element-plus/icons-vue'

const router = useRouter()
const formData = ref({
  recordList: [],// 指导记录列表

  dialogFormVisible: false,//表单是否可见
  dialogFormVisible4Edit: false,//编辑表单是否可见
  formHeaderData: {
    className: '',
    englishTitle: '',
    enterpriseTeacher: '',
    major: '',
    password: '',
    projectTitle: '',
    schoolName: '',
    sno: '',
    studentName: '',
    teacherNo: '',
    token: '',
    lockTask: 2
  },//表单数据
  instructionRecord: {
    id: '',
    sno: '',
    studentNo: '',
    instructionContent: '',
  },//指导记录表单数据
  rules: {//校验规则
    type: [{required: true, message: '类别为必填项', trigger: 'blur'}],
    name: [{required: true, message: '名称为必填项', trigger: 'blur'}]
  },
});

const showlockState = ref(computed<String>(() => {
  return formData.value.formHeaderData.lockTask == 1 ? "指导记录修改锁定" : "指导记录修改解锁"
}))

const lockFlag = ref(computed<boolean>(() => {
  return formData.value.formHeaderData.lockTask == 1
}))
// 计算属性 ref 分角色，分功能
const roleFlag = ref(computed<boolean>(() => {
  return localStorage.getItem("loginRole") === "2" ? false : true
}))
let ipurl = "localhost:80"
const downloadWord = () => {
  // insertorupdate()
  setTimeout(() => {
    let url = ipurl + "/taskform/downloadword/" + "?userName=" + localStorage.getItem("currentStudentSno")
    let path = window.location.protocol + '//' + url
    // window.location.href = path
    window.open(path, "_blank")
  }, 500)
}

const downloadPDF = () => {

  // insertorupdate()
  setTimeout(() => {
    let url = ipurl + "/taskform/downloadpdf/" + "?userName=" + localStorage.getItem("currentStudentSno")
    let path = window.location.protocol + '//' + url
    // window.location.href = path
    window.open(path, "_blank")
  }, 500)


}


const showPDF = () => {
  // insertorupdate()
  setTimeout(() => {
    let url = ipurl + "/taskform/showpdf/" + "?userName=" + localStorage.getItem("currentStudentSno")
    let path = window.location.protocol + '//' + url
    // window.location.href = path
    window.open(path, "_blank")
  }, 1000);
}


const showvuePDF = () => {
  const url = "/taskform/vuepdf/" + localStorage.getItem("currentStudentSno")
  console.log(url)
  axios.post(url).then((res) => {
    console.log(res)
    const blob = new Blob([res.data])
    const a = document.createElement('a')
    const href = window.URL.createObjectURL(blob) // 下载链接
    a.href = href
    // a.download = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1]) // 获取后台设置的文件名称
    a.download = new Date().getTime() + '.pdf'
    document.body.appendChild(a)
    a.click() // 点击下载
    document.body.removeChild(a) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  })
}


//钩子函数，VUE对象初始化完成后自动执行
onMounted(() => {
  getTaskHeadOne()
  getCurrentStudentData()
})


const getCurrentStudentData = () => {
  let url = "/instruction_record/student_record/" + localStorage.getItem("currentStudentSno")
  axios.get(url).then((res) => {
    console.log(url)
    formData.value.recordList = res.data
    formData.value.recordList.forEach(function (item: any) {
      let create_time = item.createTime;
      create_time = create_time.split('T')[0]
      item.createTime = create_time
    })
  })
};

const handleEnterEditForm = (row: any) => {
  formData.value.dialogFormVisible4Edit = true
  formData.value.instructionRecord = formData.value.recordList[row.$index]
}

const handleEnterAddForm = (row: any) => {
  formData.value.instructionRecord = {
    id: '',
    sno: '',
    studentNo: formData.value.formHeaderData.sno,
    instructionContent: '',
  }
  console.log('record: %o', formData.value.instructionRecord)
  formData.value.dialogFormVisible = true
}

const handleRecordEdit = () => {
  axios.put("/instruction_record/update_record/", formData.value.instructionRecord).then((res) => {
    if (res.data.code == 200) {
      formData.value.dialogFormVisible4Edit = false
      alert("记录更新成功！")
    } else {
      alert("记录更新失败！")
    }
  }).finally(() => {
    getCurrentStudentData()
  })
}

const handleRecordAdd = () => {
  axios.post("/instruction_record/add_record/", formData.value.instructionRecord).then((res) => {
    if (res.data.code == 200) {
      formData.value.dialogFormVisible = false
      alert("记录添加成功！")
    } else {
      alert("记录添加失败！")
    }
  }).finally(() => {
    getCurrentStudentData()
  })
}

const handleDelete = (row: any) => {
  const record_id = formData.value.recordList[row.$index]['id']
  axios.delete("/instruction_record/delete_record/" + record_id).then((res) => {
    if (res.data.code == 200) {
      alert("记录删除成功！")
    } else {
      alert("记录删除失败！")
    }
  }).finally(() => {
    getCurrentStudentData()
  })
}

//取消
const cancel = () => {
  formData.value.dialogFormVisible = false
  formData.value.dialogFormVisible4Edit = false
};

const getTaskHeadOne = () => {
  const url = "/tasks/gettaskheadone/" + localStorage.getItem("currentStudentSno")
  axios.get(url).then((res) => {
    formData.value.formHeaderData = res.data
  })
}
</script>

<style scoped>
.bold {
  font-weight: bold
}
</style>