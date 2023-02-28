<template>
  <div id="home">
    <el-container>
      <el-aside width="200px">
        <SideMenu></SideMenu>
      </el-aside>
      <el-container>
        <el-header style="height: 55px;">
          <strong> Admin management system</strong>
          <div class="header-avatar block">
            <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
            <el-dropdown>
						<span class="el-dropdown-link">{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-link href="https://w3.ibm.com" target="_blank">ibm网站</el-link>
          </div>
        </el-header>
        <el-main>
          <Tabs></Tabs>
          <div style="margin: 0 15px;">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideMenu from "@/views/SideMenu";
import Tabs from "@/views/Tabs"
export default {
  name: "Home",
  components:{
    SideMenu,
    Tabs
  },
  data(){
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo(){
      this.$axios.get("/sys/userInfo").then(res => {
        this.userInfo = res.data.data
      })
    },
    logout(){
      this.$axios.post("/logout").then(res => {
        console.log(res.data.data)
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit("resetState")
        this.$router.push("/login")
      })
    }
  }
}
</script>

<style scoped>

.el-header {
  background-color: lightblue;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  padding: 1px;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

a {
  text-decoration: none;
}

.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

#home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>