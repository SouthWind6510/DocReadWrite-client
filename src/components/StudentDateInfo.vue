<template>
    <div class="bold">
        学生毕设时间节点
    </div>
    <el-table current-row-key="id" :data="studentDateInfoData.StudentDatelist" style="width: 100%" stripe
              highlight-current-row>
        <el-table-column prop="studentNo" label="学号" width="110"/>
        <el-table-column prop="studentName" label="学生姓名" width="80"/>
        <el-table-column prop="taskBeginDate" label="任务书开始日期" width="125"/>
        <el-table-column prop="taskEndDate" label="任务书结束日期" width="125"/>
        <el-table-column prop="researchProposalTeacherDate" label="开题老师日期" width="110"/>
        <el-table-column prop="researchProposalDepartmentDate" label="开题系日期" width="110"/>
        <el-table-column prop="midCheckDate" label="中期检查时间" width="110"/>
        <el-table-column prop="handbookBeginDate" label="手册开始时间" width="110"/>
        <el-table-column prop="handbookEndDate" label="手册结束时间" width="110"/>
        <el-table-column prop="adviseReviewDate" label="指导老师评阅日期" width="140"/>
        <el-table-column prop="reviewDate" label="评阅日期" width="110"/>
        <el-table-column prop="defenseDate" label="答辩日期" width="110"/>
        <el-table-column prop="committeeDate" label="委员会日期" width="110"/>
        <el-table-column prop="paperCoverDate" label="论文封面日期" width="110"/>
        <el-table-column fixed="right" label="操作" width="60">
            <template #default="scope">
                <el-button link type="warning" size="small" @click.prevent="handleEnterEditForm(scope)">编辑
                </el-button>
            </template>
        </el-table-column>
    </el-table>

  <!--   编辑标签弹层-->
    <div class="add-form">
        <el-dialog style="width: 350px" title="设置毕设相关日期"
                   v-model="studentDateInfoData.dialogFormVisible4Edit">
            <el-form ref="dataEditForm" v-model="studentDateInfoData.StudentDatelist" :rules="studentDateInfoData.rules"
                     label-position="right"
                     label-width="150px">

                <el-form-item v-if="false" prop="studentNo" label="学生学号">
                    <el-input disabled v-model="studentDateInfoData.selectStudentDate.StudentNo"/>
                </el-form-item>
                <el-form-item prop="studentName" label="学生姓名">
                    <el-input disabled v-model="studentDateInfoData.selectStudentDate.StudentName"/>
                </el-form-item>

                <el-form-item v-if="false" prop="teacherNo" label="教师工号">
                    <el-input disabled v-model="studentDateInfoData.selectStudentDate.teacherNo"/>
                </el-form-item>

                <el-form-item label="任务书开始日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.taskBeginDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="任务书结束日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.taskEndDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="开题老师日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.researchProposalTeacherDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="开题系日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.researchProposalDepartmentDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="中期检查时间">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.midCheckDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="手册开始时间">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.handbookBeginDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="手册结束时间">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.handbookEndDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="指导老师评阅日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.adviseReviewDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="评阅日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.reviewDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="答辩日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.defenseDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="委员会日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.committeeDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

                <el-form-item label="论文封面日期">
                    <el-date-picker
                            v-model="studentDateInfoData.selectStudentDate.paperCoverDate"
                            type="date"
                            placeholder="Pick a day"
                            :size="size"
                    />
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer" align="center">
                <el-checkbox v-model="studentDateInfoData.same" label="本组相同"
                             size="large"
                             style="color: red;padding-right: 10px"/>
                <el-button @click="studentDateInfoData.dialogFormVisible4Edit=false">取消</el-button>
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

const size = ref<'default' | 'large' | 'small'>('default')
const studentDateInfoData = ref(
    {
        dialogFormVisible: false,//添加表单是否可见
        dialogFormVisible4Edit: false,//编辑表单是否可见
        dialogFormVisible5Edit: false,//选择教师签名list是否可见
        StudentDatelist: [],
        value: '',
        same: false,//是否设置全体学生签名相同
        selectStudentDate: {
            StudentNo: '',//学号
            StudentName: '',//姓名
            taskBeginDate: '',//任务书开始日期
            taskEndDate: '',//任务书结束日期
            researchProposalTeacherDate: '',//开题老师日期
            researchProposalDepartmentDate: '',//开题系日期
            midCheckDate: '',//中期检查时间
            handbookBeginDate: '',//手册开始时间
            handbookEndDate: '',//手册结束时间
            adviseReviewDate: '',//指导老师评阅日期
            reviewDate: '',//评阅日期
            defenseDate: '',//答辩日期
            committeeDate: '',//委员会日期
            paperCoverDate: '',//论文封面日期
        },//表单数据
        rules: {//校验规则
            type: [{required: true, message: '类别为必填项', trigger: 'blur'}],
            name: [{required: true, message: '名称为必填项', trigger: 'blur'}]
        },
    }
)
onMounted(() => {
        getallStudentDate();
    }
);
const setallthesame = () => {
    studentDateInfoData.value.dialogFormVisible4Edit = true
}
const changethevalue = () => {
    if (studentDateInfoData.value.same == false) {
        let url = "/studentdate/updateonestudentdate/"
        axios.post(url, studentDateInfoData.value.selectStudentDate
        ).then((res) => {
        }).finally(
            () => {
                studentDateInfoData.value.dialogFormVisible4Edit = false
                getallStudentDate()
            }
        )
    } else {
        let url = "/studentdate/updateallthestudentdate/"

        axios.post(url, studentDateInfoData.value.selectStudentDate
        ).then((res) => {
        }).finally(
            () => {
                studentDateInfoData.value.dialogFormVisible4Edit = false
                getallStudentDate()

            }
        )
    }
}

const getallStudentDate = () => {
    // if (localStorage.getItem("loginRole") === "1") {
    let url = "/studentdate/teacher/" + localStorage.getItem("userName")

    axios.get(url).then((res) => {
        studentDateInfoData.value.StudentDatelist = res.data.data
    })
};

const handleEnterEditForm = (row) => {
    studentDateInfoData.value.same = false
    studentDateInfoData.value.dialogFormVisible4Edit = true
    const url = "/studentdate/student/" + row.row.studentNo

    axios.get(url).then((res) => {

        if (res.data.data.studentNo == row.row.studentNo) {
            studentDateInfoData.value.selectStudentDate = res.data.data
            studentDateInfoData.value.dialogFormVisible4Edit = true
        } else {
            alert("数据编辑不成功！")
        }
    }).finally(() => {
        getallStudentDate()
    })
}

</script>
<style scoped>
.bold {
    font-weight: bold
}
</style>
