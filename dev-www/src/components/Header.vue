<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
            <Row type="flex" justify="end" class="code-row-bg">
                <Col span="2">
                  <Dropdown>
                      <a href="javascript:void(0)">
                        <Avatar icon="person" />
                      </a>
                      <DropdownMenu slot="list">
                          <router-link to="/login"><DropdownItem>登陆</DropdownItem></router-link>
                          <DropdownItem>修改密码</DropdownItem>
                          <DropdownItem>用户资料</DropdownItem>
                          <a @click="Logout"><DropdownItem divided>登出</DropdownItem></a>
                      </DropdownMenu>
                  </Dropdown>
                </Col>
            </Row>
        </Menu>
    </Header>
</template>
<script>
export default {
  methods:{
      Logout:function(){
          console.log(localStorage.getItem('username'));
          if (localStorage.getItem('username') == null){
              this.$Message.error("尚未登陆");
          } else {
              this.$Message.success("成功登出");
              localStorage.clear();
          }
        /*
          if (localStorage.getItem('username')){
              this.$Message.error("尚未登陆");
          } else {
              this.$Message.success("成功登出");
              this.GLOBAL.LoginStatus = false;
              localStorage.clear();
          }*/
      }
  }
}
</script>
