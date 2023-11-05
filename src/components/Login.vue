<template>

    <div class="main">
        <div class="title" v-show="!loginVisable">
            <h1 class="animate__animated animate__backInLeft">我的毕设文档</h1>
            <h3 class="animate__animated animate__backInRight">简易又方便的网上文档整理工具，快来体验吧！</h3>
            <br/>
            <el-button class="animate__animated animate__backInUp" type="primary" size="large"
                       style="border-radius: 10px;"
                       @click="handleLoginVisable">开始体验
            </el-button>


        </div>
        <div style="padding-top: 250px;display:flex;justify-content: center;" v-show="loginVisable"
             class="animate__animated animate__backInDown">
            <div style="
          width: 430px;
          height: 530px;
          box-shadow: rgb(0 0 0 /20%) 0px 2px 15px;
        ">
                <div class="logo">
                    <h1>
                        <img src="../assets/icon/favicon.svg" style="width: 60px"/><span
                            style="margin-left: 10px;">毕设文档处理</span>
                    </h1>
                </div>

                <div style="display:flex; justify-content: center;margin-bottom: 30px">


                    <el-radio-group v-model="formState.loginRole">
                        <el-radio-button label="1">教师登录</el-radio-button>
                        <el-radio-button label="2">学生登录</el-radio-button>
                    </el-radio-group>
                </div>

                <el-form name="nest-messages" style="display:flex; justify-content: center;margin-bottom: 30px">
                    <!-- 账号登陆 -->
                    <div>
                        <el-form-item label="账号" name="userName"
                                      :rules="[{ required: true, message: '初始账号为教工编号或学号' }]">
                            <el-input  placeholder="初始账号为教工编号或学号(11位)" v-model="formState.userName" style="width: 250px">
                                <template #prefix>
                                    <UserOutlined/>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码" name="password"
                                      :rules="[{ required: true, message: 'placeholder=初始密码123456' }]">
                            <el-input
                                    type=password v-model="formState.password" placeholder="初始密码123456" style="width: 250px">
                                <template #prefix>
                                    <LockOutlined class="site-form-item-icon"/>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" block size="large" html-type="submit"
                                       style="width: 250%;border-radius: 10px;"
                                       v-on:click="onFinish">登录
                            </el-button>
                        </el-form-item>
                    </div>
                </el-form>

            </div>
        </div>
    </div>


</template>

<script lang="ts" setup>
import {
    LockOutlined,
    UserOutlined,
} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";
import {ref, onMounted, computed} from "vue";
import {useRouter} from "vue-router";
import {getCurrentInstance} from "@vue/runtime-core";
import axios from 'axios'

const router = useRouter();
const formState = ref({
        loginRole: "1",//1为教师，2为学生
        password: "",
        userName: "",
        currentStudentSno: "",
    }
);

// 计算属性 ref 分角色，分功能
const roleFlag = ref(computed<boolean>(() => {
    return localStorage.getItem("loginRole") === "2" ? false : true
}))

const lockStudent = ref(computed<boolean>(() => {
    return localStorage.getItem("loginRole") === "2" ? false : true
}))
const loginVisable = ref(false);

const lastTime = ref(60);


const lockTeacher = ref(computed<boolean>(() => {
    return localStorage.getItem("loginRole") === "1" ? false : true
}))
let handleLoginVisable = () => {
    loginVisable.value = true;
};

const cancel = () => {
    loginVisable.value = true;
    // this.$message.info("cancel now!")
};


const start = () => {
    loginVisable.value = false;
    if (lockStudent.value)
        router.push("/tasks");
    else
        router.push("/taskform")
};

//登录验证完成后执行
const onFinish = () => {
    //账号登陆
    if (formState.value.loginRole === "1") {
        axios.post("/teacher/login/", {
            loginRole: formState.value.loginRole,
            userName: formState.value.userName,
            password: formState.value.password,
        }).then((res) => {
            if (res.data.code == 200) {
                console.log(res)
                localStorage.clear()
                localStorage.setItem("userName", formState.value.userName);
                localStorage.setItem("password", formState.value.password);
                localStorage.setItem("teacherName",res.data.data.teacherName)
                localStorage.setItem("loginRole", formState.value.loginRole);
                start();
            }
            else if(res.data.code == 201){
                console.log(res)
                localStorage.clear()
                localStorage.setItem("userName", formState.value.userName);
                localStorage.setItem("password", formState.value.password);
                localStorage.setItem("teacherName",res.data.data.teacherName)
                localStorage.setItem("loginRole", formState.value.loginRole);
                message.info(res.data.msg,2)
                router.push("/uploadteachersignature")
            }
            else {
                message.error(res.data.msg, 5);
            }
        });
    } else if (formState.value.loginRole === "2") {
        console.log("1234121521")
        axios.post("/login/student", {
            loginRole: formState.value.loginRole,
            userName: formState.value.userName,
            password: formState.value.password,
        }).then((res) => {
            if (res.data.code == 200) {
                localStorage.clear()
                localStorage.setItem("userName", formState.value.userName);
                localStorage.setItem("password", formState.value.password);
                localStorage.setItem("loginRole", formState.value.loginRole);
                localStorage.setItem("currentStudentSno", formState.value.userName)
                sessionStorage.setItem("currentStudentName", res.data.data.studentName)
                start();
            }else if (res.data.code ==201){//学生首次登录
                localStorage.clear()
                localStorage.setItem("userName", formState.value.userName);
                localStorage.setItem("password", formState.value.password);
                localStorage.setItem("loginRole", formState.value.loginRole);
                localStorage.setItem("currentStudentSno", formState.value.userName)
                sessionStorage.setItem("currentStudentName", res.data.data.studentName)
                alert(res.data.msg)
                router.push("/uploadstudentsignature")
            }
            else {
                message.error(res.data.msg, 5);
            }
        });
    }
};
</script>
<style scoped>
.main {
    height: 1000px;
    width: 100%;
    background: url("//src//assets/icon//loginFisrt.svg") center center / cover no-repeat;
}

.title {
    text-align: center;
    padding-top: 300px;
}

.title h1 {
    font-family: "华文行楷";
    font-size: 80px;
}

.title h4 {
    color: #00000073;
}

.logo {
    margin-bottom: 20px;
    text-align: center;
    margin-top: 50px;
}

.logo h1 {
    font-family: "华文行楷";
    font-size: 45px;
    font-weight: 800;
}

.logo img {
    width: 30px;
}
</style>
