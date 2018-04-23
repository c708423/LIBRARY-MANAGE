<template>
    <Card>
        <p slot="title">
            <Icon type="checkmark"></Icon>
            图书入库
        </p>
        <Collapse v-model="value1">
        <Panel name='1'>
            单本入库
            <p slot="content">
              <Form :label-width = '80'>
            <Row :gutter="16">
                <Col span = '12'>
                <FormItem label = '书号'>
                    <Input v-model='shuhao'></Input>
                </FormItem>
                </Col>
                <Col span = '12'>
                <FormItem label = '书名'>
                    <Input v-model='shuming'></Input>
                </FormItem>
                </Col>
                <Col span = '12'>
                <FormItem label = '类别'>
                    <Input v-model='leibie'></Input>
                </FormItem>
                </Col>
                <Col span = '12'>
                <FormItem label = '出版社'>
                    <Input v-model='bookpress'></Input>
                </FormItem>
                </Col>
                <Col span = '12'>
                <FormItem label = '年份'>
                    <Input v-model='year'></Input>
                </FormItem>
                </Col>
                <Col span = '12'>
                <FormItem label = '作者'>
                    <Input v-model='author'></Input>
                </FormItem>
                </Col>
                <Col span = '12'>
                <FormItem label = '价格'>
                    <Input v-model='price'></Input>
                </FormItem>
                </Col>
                <Col span = '6'>
                  <Button type="primary" shape="circle" icon="arrow-return-right" @click='addnewbook' long>入库</Button>
                </Col>
            </Row>
        </Form>
            </p>
        </Panel>
        <Panel name='2'>
            批量入库
            <p slot="content">
              <Button type="primary">csv格式</Button>
              <Button type="primary">..,..,...格式</Button>
            </p>
        </Panel>
        </Collapse>
    </Card>
</template>
<script>
export default {
  data(){
      return {

      }
  },
  methods:{
      addnewbook:function(){

          this.$http.post(this.GLOBAL.postSite + 'addbook',{
              name      : localStorage.getItem('username'),
              password  : localStorage.getItem('password'),
              bo_id     : this.shuhao,
              bo_name   : this.shuming,
              bo_type   : this.leibie,
              bo_press  : this.bookpress,
              bo_year   : this.year,
              bo_author : this.author,
              bo_price  : this.price,
              bo_num    : 1
          }).then(function(res){
              console.log(res.body.ret_code);
              if (res.body.ret_code == 0 ){
                  this.$Message.success(res.body.ret_msg);
              } else {
                  this.$Message.error(res.body.ret_msg);
              }
          });
      }
  }
}
</script>
