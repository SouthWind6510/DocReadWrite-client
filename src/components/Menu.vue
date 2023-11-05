<template>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="1">折叠</el-radio-button>
        <el-radio-button :label="0">展开</el-radio-button>
    </el-radio-group>
    <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
    >
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location/>
                </el-icon>
                <span>任务书处理</span>
            </template>
            <el-menu-item-group>
                <template #title><span>任务书处理</span></template>

                <el-menu-item v-if="lockStudent" index="1-2">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/tasks">学生任务书列表</router-link>
                    </span>
                </el-menu-item>

                <el-menu-item v-if="lockTeacher" index="1-3">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/taskform">编辑任务书</router-link>
                    </span>
                </el-menu-item>

                <el-menu-item index="1-4">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/logout">退出系统</router-link>
                    </span>
                </el-menu-item>
            </el-menu-item-group>
<!--            <el-sub-menu index="1-4">-->
<!--                <template #title><span>item four</span></template>-->
<!--                <el-menu-item index="1-4-1">item one</el-menu-item>-->
<!--            </el-sub-menu>-->
        </el-sub-menu>

        <el-sub-menu  index="2">
            <template #title>
                <el-icon>
                    <flag/>
                </el-icon>
                <span>名单-签名-时间</span>
            </template>
            <el-menu-item-group>
                <template #title><span>名单-签名-时间</span></template>
                <el-menu-item v-if="false" index="2-1">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/uploadstudents">上传学生名单</router-link>
                    </span>
                </el-menu-item>
                <el-menu-item v-if="lockStudent" index="2-1">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/uploadstudentsheet">上传学生名单</router-link>
                    </span>
                </el-menu-item>

                <el-menu-item  index="2-2">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/uploadstudentsignature">上传学生签名或修改密码</router-link>
                    </span>
                </el-menu-item>

                <el-menu-item v-if="lockStudent" index="2-2">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/uploadsmajorunitedplan">上传工作进度</router-link>
                    </span>
                </el-menu-item>

                <el-menu-item v-if="lockStudent"  index="2-3">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/uploadteachersignature">导入教师签名</router-link>
                    </span>
                </el-menu-item>
                <el-menu-item v-if="lockStudent" index="2-4">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/studentsignature">毕设签名设置</router-link>
                    </span>
                </el-menu-item>

                <el-menu-item v-if="lockStudent" index="2-5">
                    <file-outlined/>
                    <span style="margin-left:15px">
                    <router-link to="/studentdate">毕设时间节点设置</router-link>
                    </span>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="3" disabled>
            <el-icon>
                <document/>
            </el-icon>
            <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting/>
            </el-icon>
            <template #title>Navigator Four</template>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting, Flag,
} from '@element-plus/icons-vue'

const lockStudent = ref(computed<boolean>(() => {
    return localStorage.getItem("loginRole") === "2" ? false : true
}))

const lockTeacher = ref(computed<boolean>(() => {
    return localStorage.getItem("loginRole") === "1" ? false : true
}))

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
