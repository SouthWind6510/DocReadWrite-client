import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import LoginView from '../components/Login.vue'
import TaskView from '../components/Task.vue'
import UploadStudentS from "../components/UploadStudentSignature.vue";
import TaskForm from "../components/TaskForm.vue";
import LogoutView from "../components/Logout.vue";
import UploadTeacherSignature from "../components/UploadTeacherSignature.vue";
import StudentSignatureInfo from "../components/StudentSignatureInfo.vue"
import StudentDateInfo from "../components/StudentDateInfo.vue"
import UploadStudentSheet from "../components/UploadStudentSheet.vue"
import UploadMajorUnitedPlan from "../components/UploadMajorUnitedPlan.vue"
import UploadStudentSignature from "../components/UploadStudentSignature.vue"
import InstructionRecordForm from "../components/InstructionRecordForm.vue"

const routes: Array<RouteRecordRaw> = [


    {
        path: "/uploadstudentsignature",
        component: UploadStudentSignature,
        name: "UploadStudentSignature"
    },

    {
        path: "/uploadsmajorunitedplan",
        component: UploadMajorUnitedPlan,
        name: "UploadMajorUnitedPlan"
    },


    {
        path: "/uploadstudentsheet",
        component: UploadStudentSheet,
        name: "UploadStudentSheet"
    },


    {
        path: "/studentdate",
        component: StudentDateInfo,
        name: "StudentDateInfo"
    },
    {
        path: "/studentsignature",
        component: StudentSignatureInfo,
        name: "StudentSignatureInfo"
    },
    {
        path: "/uploadteachersignature",
        component: UploadTeacherSignature,
        name: "UploadTeacherSignature"
    },

    {
        path: "/",
        component: LoginView,
        name: "login"
    },
    {
        path: "/tasks",
        component: TaskView,
        name: "Task"
    },
    {
        path: "/uploadstudents",
        component: UploadStudentS,
        name: "UploadStudentS"
    },

    {
        path: "/taskform",
        component: TaskForm,
        name: "TaskForm"
    },
    {
        path: "/instruction-record-form",
        component: InstructionRecordForm,
        name: "InstructionRecordForm"
    },

    {
        path: "/logout",
        component: LogoutView,
        name: "LogoutView"
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to, from) => {
    if (to.name == 'login') {
        if (localStorage.getItem("userName") != null || localStorage.getItem("userName") != undefined) {
            router.push("/tasks");
            return true;
        }
    } else if (localStorage.getItem("userName") == null || localStorage.getItem("userName") == undefined) {
        router.push("/");
        return true
    }
    return true
});

router.afterEach(() => {})


export default router
