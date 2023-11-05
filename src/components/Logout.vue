<script setup lang="ts">
import {useRouter} from "vue-router";
import {LockOutlined, UserOutlined} from "@ant-design/icons-vue";
const router = useRouter()
const logout = () => {
    if(confirm("really?")) {
        localStorage.clear();
        router.push("/")
    }
}
</script>

<template>
    <el-form name="nest-messages" style="display:flex; justify-content: center;margin-bottom: 30px">
        <!-- 账号logout -->
        <div>
             <el-form-item >
                <el-button type="primary" block size="large" html-type="submit"
                           style="width: 250%;border-radius: 10px;"
                           v-on:click="logout">退出系统
                </el-button>
            </el-form-item>
        </div>
    </el-form>

</template>>


<style scoped>

.home-wrapper {
    min-width: 720px;
    height: 100%;


    .el-header{
        background-color:#222d32;
        color: #fff;
        text-align: center;
        line-height: 60px;
        padding: 0;
    }
    .header-font{
        color: #fff;
        font-size: 20px;
    }

    .header-logout a{
        font-size:14px;
        color: #fff;
    }
    a{
        text-decoration: none;
    }


    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }


    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }


}

</style>>