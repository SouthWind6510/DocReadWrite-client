<template>
    <div class="bold">
        学生签名管理
    </div>
    <el-table current-row-key="id" :data="studentSignatureInfoData.StudentSignaturelist" style="width: 100%" stripe
              highlight-current-row :row-class-name="tableRowClassName">
        <el-table-column prop="studentNo" label="学号" width="110"/>
        <el-table-column prop="studentName" label="学生姓名" width="80"/>
        <el-table-column prop="teacherNo" label="指导教师" width="180"/>
        <el-table-column prop="professionalOfficer" label="专业主任" width="180"/>
        <el-table-column prop="paperreViewer" label="评阅人" width="180"/>
        <el-table-column prop="respondentRecorder" label="答辩记录人" width="180"/>
        <el-table-column prop="defenseTeamLeader" label="答辩组长" width="180"/>
        <el-table-column prop="defenseTeacher1" label="答辩教师1" width="180"/>
        <el-table-column prop="defenseTeacher2" label="答辩教师2" width="180"/>
        <el-table-column prop="chairmanoftheDefenseCommittee" label="答辩委员会主任" width="180"/>
        <el-table-column prop="enterpriseTeacher" label="企业导师" width="180"/>
        <el-table-column fixed="right" label="操作" width="60">
            <template #default="scope">
                <el-button link type="warning" size="small" @click.prevent="handleEnterEditForm(scope)">编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>
  <!-- 编辑标签弹层 -->
    <div class="add-form">
        <el-dialog style="width: 350px" title="设置毕设对应签名教师"
                   v-model="studentSignatureInfoData.dialogFormVisible4Edit">
            <el-form ref="dataEditForm" v-model="studentSignatureInfoData.selectStudentSignature" :rules="rules"
                     label-position="right"
                     label-width="150px">
                <el-form-item prop="studentNo" label="学号">
                    <el-input disabled v-model="studentSignatureInfoData.selectStudentSignature.studentNo"/>
                </el-form-item>

                <el-form-item prop="studentName" label="学生姓名">
                    <el-input disabled v-model="studentSignatureInfoData.selectStudentSignature.studentName"/>
                </el-form-item>

                <el-form-item prop="teacherNo" label="教师工号">
                    <el-input disabled v-model="studentSignatureInfoData.selectStudentSignature.teacherNo"/>
                </el-form-item>


                <el-form-item prop="enterpriseTeacher" label="企业导师">
                    <el-select
                            v-model="studentSignatureInfoData.selectStudentSignature.enterpriseTeacher"
                            filterable
                            placeholder="">
                        <el-option
                                v-for="item in studentSignatureInfoData.teachers"
                                :key="item.teacherNo"
                                :label="item.teacherName"
                                :value="item.teacherNo"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item prop="professionalOfficer" label="专业主任">
                    <el-select
                            v-model="studentSignatureInfoData.selectStudentSignature.professionalOfficer"
                            filterable
                            placeholder="">
                        <el-option
                                v-for="item in studentSignatureInfoData.teachers"
                                :key="item.teacherNo"
                                :label="item.teacherName"
                                :value="item.teacherNo"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item prop="paperreViewer" label="评阅人">
                    <el-select
                            v-model="studentSignatureInfoData.selectStudentSignature.paperreViewer"
                            filterable
                            placeholder="">
                        <el-option
                                v-for="item in studentSignatureInfoData.teachers"
                                :key="item.teacherNo"
                                :label="item.teacherName"
                                :value="item.teacherNo"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item prop="respondentRecorder" label="答辩记录人">
                    <el-select
                            v-model="studentSignatureInfoData.selectStudentSignature.respondentRecorder"
                            filterable
                            placeholder="">
                        <el-option
                                v-for="item in studentSignatureInfoData.teachers"
                                :key="item.teacherNo"
                                :label="item.teacherName"
                                :value="item.teacherNo"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item prop="defenseTeamLeader" label="答辩组长">
                    <el-select
                            v-model="studentSignatureInfoData.selectStudentSignature.defenseTeamLeader"
                            filterable
                            placeholder="">
                        <el-option
                                v-for="item in studentSignatureInfoData.teachers"
                                :key="item.teacherNo"
                                :label="item.teacherName"
                                :value="item.teacherNo"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item prop="defenseTeacher1" label="答辩教师1">
                    <el-select
                            v-model="studentSignatureInfoData.selectStudentSignature.defenseTeacher1"
                            filterable
                            placeholder="">
                        <el-option
                                v-for="item in studentSignatureInfoData.teachers"
                                :key="item.teacherNo"
                                :label="item.teacherName"
                                :value="item.teacherNo"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item prop="defenseTeacher2" label="答辩教师2">
                    <el-select
                            v-model="studentSignatureInfoData.selectStudentSignature.defenseTeacher2"
                            filterable
                            placeholder="">
                        <el-option
                                v-for="item in studentSignatureInfoData.teachers"
                                :key="item.teacherNo"
                                :label="item.teacherName"
                                :value="item.teacherNo"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item prop="chairmanoftheDefenseCommittee" label="答辩委员会主任">
                    <el-select
                            v-model="studentSignatureInfoData.selectStudentSignature.chairmanoftheDefenseCommittee"
                            filterable
                            placeholder="">
                        <el-option
                                v-for="item in studentSignatureInfoData.teachers"
                                :key="item.teacherNo"
                                :label="item.teacherName"
                                :value="item.teacherNo"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-checkbox v-model="studentSignatureInfoData.same" label="本组全体学生相同，危险！！！想好了再勾选"
                             size="large"
                             border style="color: red;padding-right: 10px"/>
                <el-button @click="studentSignatureInfoData.dialogFormVisible4Edit=false">取消</el-button>
                <el-button type="primary" @click="changethevalue">确定</el-button>
            </div>
        </el-dialog>
    </div>

</template>


<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const router = useRouter()
const tableRowClassName = ({
                               rowIndex,
                           }: {
    rowIndex: number
}) => {
    // console.log(rowIndex)
    if (rowIndex % 2 == 0) {
        console.log(rowIndex % 2)
        return 'warning-row'
    } else if (rowIndex % 2 == 1) {
        return 'success-row'
    }
    return ''
}

const studentSignatureInfoData = ref(
    {
        dialogFormVisible: false,//添加表单是否可见
        dialogFormVisible4Edit: false,//编辑表单是否可见
        dialogFormVisible5Edit: false,//选择教师签名list是否可见
        StudentSignaturelist: [],
        teachers: [],
        value: '',
        same: false,//是否设置全体学生签名相同
        selectStudentSignature: {
            studentNo: '',//学号
            teacherNo: '',//教师工号
            studentName: '',
            professionalOfficer: '',//专业主任
            paperreViewer: '',  //评阅人
            respondentRecorder: '',//答辩记录人
            defenseTeamLeader: '',//答辩组长
            defenseTeacher1: '',//答辩教师1
            defenseTeacher2: '',//答辩教师2
            chairmanoftheDefenseCommittee: '', //答辩委员会主任
            enterpriseTeacher: '', //企业导师
            lockSignature: 2,//1LOCK, 2UNLOCK
        },//表单数据
        rules: {//校验规则
            type: [{required: true, message: '类别为必填项', trigger: 'blur'}],
            name: [{required: true, message: '名称为必填项', trigger: 'blur'}]
        },
    }
)
onMounted(() => {
        getCurrentStudentSignature();
        getallteacherSignature();
    }
);

const setallthesame = () => {
    studentSignatureInfoData.value.dialogFormVisible4Edit = true
}
const changethevalue = (val) => {
    if (studentSignatureInfoData.value.same == false) {
        let url = "/studentsignature/updateonestudentSignature/"
        console.log("url: ", url)
        axios.post(url, studentSignatureInfoData.value.selectStudentSignature
        ).then((res) => {
            console.log(res)
        }).finally(
            () => {
                getCurrentStudentSignature();
                getallteacherSignature();
                studentSignatureInfoData.value.dialogFormVisible4Edit = false
            }
        )
    } else {
        let url = "/studentsignature/updateallthestudentSignature/"
        console.log("url: ", url)
        axios.post(url, studentSignatureInfoData.value.selectStudentSignature
        ).then((res) => {

            console.log(res)

        }).finally(
            () => {
                getCurrentStudentSignature();
                getallteacherSignature();
                studentSignatureInfoData.value.dialogFormVisible4Edit = false
            }
        )
    }
}

const getallteacherSignature = () => {
    let url = "/uploadteachersignature/getallteacherSignature/"
    axios.get(url).then((res) => {
        console.log(res)
        studentSignatureInfoData.value.teachers = res.data.data
    })
};

const getCurrentStudentSignature = () => {
    // if (localStorage.getItem("loginRole") === "1") {
    let url = "/studentsignature/teacher/" + localStorage.getItem("userName")
    axios.get(url).then((res) => {
        studentSignatureInfoData.value.StudentSignaturelist = res.data.data
    })
};


const lockFlag = ref(computed<boolean>(() => {
    return studentSignatureInfoData.value.selectStudentSignature.lockSignature != 1
}))

const handleEnterEditForm = (row) => {
    studentSignatureInfoData.value.same = false
    const url = "/studentsignature/student/" + row.row.studentNo
    axios.get(url).then((res) => {
        if (res.data.sno == row.row.sno) {
            studentSignatureInfoData.value.selectStudentSignature = res.data.data
            studentSignatureInfoData.value.dialogFormVisible4Edit = true
        } else {
            alert("数据编辑不成功！")
        }
    }).finally(() => {
        getCurrentStudentSignature
    })
}

</script>
<style scoped>
.bold {
    font-weight: bold
}

.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-text-color-regular);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

</style>
