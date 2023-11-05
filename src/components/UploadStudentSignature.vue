<template>
    <div class="centerlocated" style="border:1px solid #000 ;max-width:100%">
        <br/>
        <el-form
                ref="ruleFormRef"
                status-icon
                label-width="160px"
                class="demo-ruleForm"
        >
            <el-form-item>
                <div style="color: red">请上传学生签名和修改密码!</div>
            </el-form-item>
            <el-form-item label="学号">
                <el-input disabled style="width:400px;" v-model="StudentSignatureForm.StudentNo" type="text"
                          autocomplete="off"/>
            </el-form-item>
            <el-form-item label="学生姓名">
                <el-input disabled style="width:400px;"
                          v-model="StudentSignatureForm.StudentName"
                          type="text"
                          autocomplete="off"
                />
            </el-form-item>
            <el-form-item label="旧密码">
                <el-input type="password" style="width:400px;"
                          v-model="StudentSignatureForm.oldpassword"
                          autocomplete="off"
                          placeholder="输入原密码，初始密码123456"
                          show-password
                />
            </el-form-item>
            <el-form-item label="新密码">
                <el-input type="password" style="width:400px;"
                          v-model="StudentSignatureForm.newpassword"
                          autocomplete="off"
                          placeholder="大于8位，含大写字母、小写字母、数字和特殊符号！"
                          show-password
                />
            </el-form-item>

            <el-form-item>
                <el-upload
                        ref="photoRef"
                        :auto-upload="false"
                        :http-request="upload"
                        :limit="1"
                        :on-exceed="handleExceed"
                        accept=".png,.jpg"
                        drag="true"
                >
                    <template #trigger>
                        <el-button type="primary">选择学生签名文件</el-button>
                    </template>
                    <template #tip>
                        <div class="el-upload__tip" style="color: red">
                            文件格式：jpg或png 小于50kb，否则拒绝上传
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交上传
                </el-button>
                <el-button @click="resetForm()">重置表单</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import axios from "axios";
import {genFileId, UploadProps, UploadRawFile} from "element-plus";
import router from "@/router";

const StudentSignatureForm = reactive({
    StudentNo: '',
    StudentName: '',
    oldpassword: '',
    newpassword: ''
})
let photoRef = ref()
// :auto-upload="false"  表示选择完文件后不自动上传，后续需要点击按钮手动上传
// ref="photoRef"  当调用submit()方法，会自动调用上传方法
//     :http-request="upload"  定义上传方法
// #流程：点击上传按钮触发submitUpload()调用 photoRef.value.submit()会自动调用上传方法（自定义:http-request）绑定的方法upload(params)，
// 接收参数为封装文件对象 file属性可与取得文件对象


// StudentSignatureForm.StudentNo = localStorage.getItem("CurrentStudentName")
onMounted(() => {
    StudentSignatureForm.StudentNo = localStorage.getItem("currentStudentSno")
    StudentSignatureForm.StudentName = sessionStorage.getItem("currentStudentName")
    localStorage.clear()
    sessionStorage.clear()
})

const handleExceed: UploadProps['onExceed'] = (files) => {
    photoRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    photoRef.value!.handleStart(file)
}

function upload(params) {
    let formData = new FormData()
    formData.append('photoRef', params.file)
    formData.append('StudentNo', StudentSignatureForm.StudentNo)
    formData.append("StudentName", StudentSignatureForm.StudentName)
    formData.append("oldpassword", StudentSignatureForm.oldpassword)
    formData.append("newpassword", StudentSignatureForm.newpassword)

    axios({
        url: '/uploadstudentsignature/upload',
        method: 'post',
        data: formData,
    }).then((resp) => {
        console.log(resp)
        if (resp.data.code == 400) {
            alert(resp.data.msg)
            localStorage.clear()
            sessionStorage.clear()
            router.push("/uploadstudentsignature")
        } else {
            localStorage.clear()
            sessionStorage.clear()
            alert(resp.data.msg)
            router.push("/")
        }
    })
}

function submitForm() {
    photoRef.value.submit()
}

const resetForm = () => {
    // StudentSignatureForm.StudentNo = ''
    StudentSignatureForm.newpassword = ''
    StudentSignatureForm.oldpassword = ''
}
</script>
<style>
.centerlocated{
    width: 600px;
    height: 600px;
    background-color: white;
    /* 水平垂直居中 */
    margin: 50px auto;
}
</style>
