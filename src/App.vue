<script setup>
import MenuVue from './components/Menu.vue';
import {watch, ref} from "vue";
import {useRoute} from 'vue-router'


const mainPageVisable = ref(true)
const loginPageVisable = ref(true)
const route = useRoute()
watch(() => {
    const routerName = route.name;
    if (routerName == "login") {
        mainPageVisable.value = false;
        loginPageVisable.value = true;
    } else {
        mainPageVisable.value = true;
        loginPageVisable.value = false;
    }
})
</script>

<template>
    <el-container class="root" v-if="mainPageVisable">
        <el-aside class="sider" width="240px">
            <MenuVue></MenuVue>
        </el-aside>
        <el-main class="content">
            <router-view></router-view>
        </el-main>
    </el-container>
    <div>
        <el-main v-if="loginPageVisable">
            <router-view></router-view>
        </el-main>
    </div>
</template>

<style scoped>
.root {
    min-height: 950px;
    height: auto;
}

.sider {
    background-color: rgb(245, 245, 246);
}

.content {
    background-color: rgb(255, 255, 255);;
}
</style>
