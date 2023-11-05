<template>
    <div style="align-items: center; border:1px solid #000 ;max-width:100%">
        <br/>
        <el-form
            ref="ruleFormRef"
            status-icon
            label-width="160px"
            class="demo-ruleForm"
        >
            <el-form-item>
                <el-upload
                    ref="photoRef"
                    :auto-upload="false"
                    :http-request="upload"
                    :limit="1"
                    :on-exceed="handleExceed"
                    accept=".xls,.xlsx"
                    drag="true"
                >
                    <template #trigger>
                        <el-button type="primary">上传专业工作统一进度要求Excel文件</el-button>
                    </template>
                    <template #tip>
                        <div class="el-upload__tip" style="color: red">
                            文件格式：xls或xlsx 小于50kb，否则拒绝上传
                        </div>
                    </template>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交上传
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import axios from "axios";

import {genFileId} from 'element-plus'
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'

let photoRef = ref()

const handleExceed: UploadProps['onExceed'] = (files) => {
    photoRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    photoRef.value!.handleStart(file)
}

function upload(params) {
    let formData = new FormData()
    formData.append('photoRef', params.file)
    let item = localStorage.getItem("userName");
    formData.append('teacherNo',item);
    axios({
        url: '/taskdate/uploadmajorunitedplan',
        method: 'post',
        data: formData,
    }).then((resp) => {
        alert(resp.data.msg)
    })
}

function submitForm() {
    photoRef.value.submit()
}
</script>
<style>
</style>
