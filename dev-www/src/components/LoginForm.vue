<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 540px;
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
    <div class="layout">
        <Card :style="{width:'50%',margin:'auto','margin-top':'5%'}">
            <p slot="title">登陆</p>
            <Layout :style="{padding: '0 50px',background:'white'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <BreadcrumbItem></BreadcrumbItem>
                </Breadcrumb>
                <Row type="flex" justify="center" class="code-row-bg">
                    <Col :style="{'text-align': 'center'}" span="24">
                        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                            <Row>
                              <FormItem :style="{width:'50%'}" prop="user">
                                  <Input type="text" v-model="formInline.user" placeholder="Username" >
                                      <Icon type="ios-person-outline" slot="prepend"></Icon>
                                  </Input>
                              </FormItem>
                            </Row>
                            <Row>
                              <FormItem :style="{width:'50%'}" prop="password">
                                  <Input type="password" v-model="formInline.password" placeholder="Password">
                                      <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                  </Input>
                              </FormItem>
                            </Row>
                            <FormItem >
                                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Layout>
        </Card>
    </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      LoginStatus : false,
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      console.log(this.formInline.user);
      if (localStorage.getItem('username') != null){
          this.$Message.error('已登陆');
          return;
      }
      this.$http.post(this.GLOBAL.postSite + 'Login',{name:this.formInline.user,password:this.formInline.password}).then(
            function (res) {
                // 处理成功的结果
                console.log(res.body);
                if (res.body.ret_code == 0){
                    this.$Message.success('成功登陆');
                    this.GLOBAL.LoginStatus = true;
                    console.log(localStorage.getItem('username'));
                    localStorage.setItem('username',this.formInline.user);
                    localStorage.setItem('password',this.formInline.password);
                } else if (res.body.ret_code == 1){
                    this.$Message.error('密码错误')
                } else if (res.body.ret_code == 3) {
                    this.$Message.error('账号不存在');
                } else {
                    this.$Message.error('未知错误');
                }
            },
            function (res) {
                this.$Message.error('未能与服务器取得连接');
            });
    }
  }
}
</script>
