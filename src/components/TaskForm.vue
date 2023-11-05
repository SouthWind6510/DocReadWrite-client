<template>
  <!-- 编辑表头-->
    <div class="bold">
        <div>题目:{{ taskData.taskHeadformData.projectTitle }}</div>
        <div>英文题目:{{ taskData.taskHeadformData.englishTitle }}</div>
        <div>学部（院）:{{ taskData.taskHeadformData.schoolName }}</div>
        <div>专业:{{ taskData.taskHeadformData.major }}</div>
        <div>班级:{{ taskData.taskHeadformData.className }}</div>
        <div style="color: blue">姓名:{{ taskData.taskHeadformData.studentName }}</div>
        <div>学号:{{ taskData.taskHeadformData.sno }}</div>
        <div style="color: red">锁定状态: {{ showlockState }}</div>
        <el-divider/>
    </div>
    <div class="bold">
        一、课题主要研究(设计)内容：
    </div>
    <div style="margin: 20px 0"/>
    <el-input
            v-model="taskData.studyContent"
            :autosize="{ minRows: 2, maxRows: 20 }"
            type="textarea"
            placeholder="Please input"
    />
    <el-divider/>
    <div class="bold">
        二、工作进度要求：
    </div>
    <el-table current-row-key="id" :data="taskData.planList" style="width: 100%" stripe highlight-current-row>
        <el-table-column prop="sno" label="序号" width="100"/>
        <el-table-column prop="task" label="设计（论文）各阶段名称" width="400"/>
        <el-table-column prop="dateBegin" label="开始日期" width="100"/>
        <el-table-column prop="dateEnd" label="结束日期" width="100"/>
        <el-table-column prop="remark" label="备注" width="300"/>
        <el-table-column fixed="right" label="操作" width="250">


            <template #default="scope">
                <el-button v-if="roleFlag" link type="primary" size="small" @click.prevent="handleAdd(scope)">新增
                </el-button>
                <el-button link type="warning" size="small" @click.prevent="handleEnterEditForm(scope)">编辑</el-button>
                <el-button link type="danger" size="small" @click.prevent="handleDelete(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>


  <!-- 编辑标签弹层 -->
    <div class="add-form">
        <el-dialog title="编辑工作进度条目" v-model="taskData.dialogFormVisible4Edit">
            <el-form ref="dataEditForm" v-model="taskData.taskFormPlanList" :rules="rules" label-position="right"
                     label-width="200px">
                <el-form-item prop="sno" label="序号">
                    <el-input disabled v-model="taskData.taskFormPlanList.sno"/>
                </el-form-item>
                <el-form-item prop="studentNo" label="学号">
                    <el-input disabled v-model="taskData.taskFormPlanList.studentNo"/>
                </el-form-item>

                <!--                <el-form-item prop="studentName" label="学生姓名">-->
                <!--                    <el-input v-model="taskData.taskFormPlanList.studentName"/>-->
                <!--                </el-form-item>-->


                <el-form-item prop="task" label="设计（论文）各阶段名称">
                    <el-input v-model="taskData.taskFormPlanList.task"/>
                </el-form-item>

                <el-form-item prop="dateBegin" label="开始日期">
                    <el-input v-model="taskData.taskFormPlanList.dateBegin"/>
                </el-form-item>

                <el-form-item prop="dateEnd" label="结束日期">
                    <el-input v-model="taskData.taskFormPlanList.dateEnd"/>
                </el-form-item>

                <el-form-item prop="remark" label="备注">
                    <el-input v-model="taskData.taskFormPlanList.remark"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-button @click="cancel()">取消</el-button>
                <el-button type="primary" @click="handleformEdit()">确定</el-button>
            </div>
        </el-dialog>
    </div>


    <el-divider/>
    <div class="bold">
        三、应查阅的主要参考文献：
    </div>
    <div style="margin: 20px 0"/>
    <el-input
            v-model="taskData.literature"
            :autosize="{ minRows: 2, maxRows: 20 }"
            type="textarea"
            placeholder="Please input"
    />
    <el-divider/>

    <div class="bold">
        四、毕业设计（论文）预期成果或结论性观点：
    </div>
    <div style="margin: 20px 0"/>
    <el-input
            v-model="taskData.expectedConclusion"
            :autosize="{ minRows: 2, maxRows: 20 }"
            type="textarea"
            placeholder="Please input"
    />
    <el-divider/>
    <div class="bold">
        五、毕业设计（论文）完成提交材料清单：（设计、作品照片、实物、模型、技术文档或论文、含有技术文档或论文的光盘等）
    </div>
    <div style="margin: 20px 0"/>
    <el-input
            v-model="taskData.billofMaterials"
            :autosize="{ minRows: 2, maxRows: 20 }"
            type="textarea"
            placeholder="Please input"
    />
    <el-divider/>

    <div class="bold">
        六、任务执行日期：
    </div>
    <div style="margin: 20px 0"/>
    <el-input disabled
              v-model="taskData.execDate"
              :autosize="{ minRows: 2, maxRows: 20 }"
              type="textarea"
              placeholder="Please input"
    />
    <el-divider/>
    <div align="center">
        <!--        :disabled = -->
        <el-button :disabled="lockFlag" size="large" type="success" @click="insertorupdate">保存修改</el-button>
        <el-button size="large" type="success" @click="showPDF">文档预览</el-button>
        <el-button size="large" type="success" @click="downloadWord">下载Word版</el-button>
        <el-button size="large" type="success" @click="downloadPDF">下载PDF版</el-button>
        <el-button size="large" type="success" @click="showvuePDF">vue文档预览</el-button>
    </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from 'vue'
import axios from 'axios'
import {useRouter} from "vue-router";

const router = useRouter()
const taskData = ref({
    studyContent: '',//一、课题主要研究(设计)内容：
    planList: [],//二、工作进度要求：
    literature: '',//三、应查阅的主要参考文献：
    expectedConclusion: '',//四、毕业设计（论文）预期成果或结论性观点：
    billofMaterials: '',//五、毕业设计（论文）完成提交材料清单：（设计、作品照片、实物、模型、技术文档或论文、含有技术文档或论文的光盘等）
    execDate: '',    //六、任务执行日期：

    dialogFormVisible: false,//添加表单是否可见
    dialogFormVisible4Edit: false,//编辑表单是否可见
    taskHeadformData: {
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
    taskFormPlanList: {
        sno: '',
        studentNo: '',
        studentName: '',
        task: '',
        dateBegin: '',
        dateEnd: '',
        remark: ''
    },//表单数据
    rules: {//校验规则
        type: [{required: true, message: '类别为必填项', trigger: 'blur'}],
        name: [{required: true, message: '名称为必填项', trigger: 'blur'}]
    },
});

const showlockState = ref(computed<String>(() => {
    return taskData.value.taskHeadformData.lockTask == 1 ? "任务书修改锁定" : "任务书修改解锁"
}))

const lockFlag = ref(computed<boolean>(() => {
    return taskData.value.taskHeadformData.lockTask == 1
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
    axios.post(url).then((res)=>{
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
    getCurrentStudent()
    getTaskExecDate()
})

const getTaskExecDate = () => {
    let url = "/studentdate/gettaskexecdate"
    console.log(url)
    axios.post(url, {currentStudentSno: localStorage.getItem("currentStudentSno")}
    ).then((res) => {
        console.log(res)
        taskData.value.execDate = res.data.data
    })
}
const getCurrentStudent = () => {
    let url = "/taskdate/gettaskdate/" + localStorage.getItem("currentStudentSno")
    axios.get(url).then((res) => {
        console.log(url)
        taskData.value.planList = res.data
    })
    url = "/taskform/gettaskdata"
    axios.post(url, {currentStudentSno: localStorage.getItem("currentStudentSno")}
    ).then((res) => {
        // console.log(res)
        taskData.value.studyContent = res.data.data.studyContent
        taskData.value.literature = res.data.data.literature
        // taskData.value.execDate = res.data.data.execDate
        taskData.value.billofMaterials = res.data.data.billofMaterials
        taskData.value.expectedConclusion = res.data.data.expectedConclusion
    })
};
const insertorupdate = () => {
    axios.post("/taskform/search", {
        currentStudentSno: localStorage.getItem("currentStudentSno")
    }).then((res) => {
        if (res.data.code == 200) { //update
            axios({
                url: "/taskform/update",
                method: "post",
                data: {
                    Sno: localStorage.getItem("currentStudentSno"),
                    execDate: taskData.value.execDate,
                    billofMaterials: taskData.value.billofMaterials,
                    expectedConclusion: taskData.value.expectedConclusion,
                    literature: taskData.value.literature,
                    studyContent: taskData.value.studyContent
                }
            }).then((res) => {
                // console.log(res)
                if (res.data.code == 200) {
                    // alert("ok");
                } else {
                    // alert("fail")
                }
            })
        } else if (res.data.code == 201)//insert
        {
            // console.log(taskData)
            axios({
                url: "/taskform/insert",
                method: "post",
                data: {
                    Sno: localStorage.getItem("currentStudentSno"),
                    execDate: taskData.value.execDate,
                    billofMaterials: taskData.value.billofMaterials,
                    expectedConclusion: taskData.value.expectedConclusion,
                    literature: taskData.value.literature,
                    studyContent: taskData.value.studyContent
                }
            }).then((res) => {
                // console.log(res)
                if (res.data.code == 200) {
                    // alert("ok");
                } else {
                    // alert("fail")
                }
            })
        }
    })
}

const handleAdd = (row: any) => {
    // console.log('click')
}

const handleEnterEditForm = (row) => {
    console.log(row)
    axios.get("/taskdate/gettaskdateone/" + row.row.studentNo + "/" + row.row.sno).then((res) => {
        console.log(res)
        if (res.data.studentNo == row.row.studentNo) {
            taskData.value.taskFormPlanList = res.data
            taskData.value.dialogFormVisible4Edit = true
        } else {
            alert("数据编辑不成功！")
        }
    }).finally(() => {
        getCurrentStudent()
    })
}

const handleformEdit = () => {
    axios.put("/taskdate/updatetaskdateone/", taskData.value.taskFormPlanList).then((res) => {
        // console.log(res.data)
        if (res.data.code == 200) {
            taskData.value.dialogFormVisible4Edit = false
            alert("数据更新成功！")
        } else {
            alert("数据更新失败！")
            taskData.value.dialogFormVisible4Edit = false
        }
    }).finally(() => {
        getCurrentStudent()
    })
}
const handleDelete = (row: any) => {
    // console.log('click')
}

//取消
const cancel = () => {
    taskData.value.dialogFormVisible = false
    taskData.value.dialogFormVisible4Edit = false
};

const getTaskHeadOne = () => {
    const url = "/tasks/gettaskheadone/" + localStorage.getItem("currentStudentSno")
    axios.get(url).then((res) => {
        taskData.value.taskHeadformData = res.data
    })
}
</script>
<style scoped>
.bold {
    font-weight: bold
}
</style>
