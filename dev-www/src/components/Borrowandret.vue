<template>
    <Card>
        <p slot="title">
            <Icon type="pin"></Icon>
            图书借还
        </p>
        <Form :label-width = '80'>
            <Row>
                <Col span = '18'>
                    <FormItem label = '借书证号'>
                        <Input v-model = 'cardid'></Input>
                    </FormItem>
                </Col>
                <Col span = '6' :style = "{'padding-left':'20px','padding-right':'20px'}">
                    <Button type="primary" shape="circle" icon="search" @click='searchcard' long>查询</Button>
                </Col>
            </Row>
            <Row>
                <Col span = '12' :style = "{'padding-left':'20px','padding-right':'20px'}">
                  <FormItem label = '姓名'>
                  <Input disabled v-model = 'input1'></Input>
                  </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span = '12' :style = "{'padding-left':'20px','padding-right':'20px'}">
                  <FormItem label='类型'>
                  <Input disabled v-model = 'input2'></Input>
                  </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span = '12' :style = "{'padding-left':'20px','padding-right':'20px'}">
                  <FormItem label='单位'>
                  <Input disabled v-model = 'input3'></Input>
                  </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span = '18'>
                    <FormItem label = '书号'>
                        <Input v-model = 'bookid'></Input>
                    </FormItem>
                </Col>
                <Col span = '3' :style = "{'padding-left':'20px','padding-right':'20px'}">
                    <Button type="primary" shape="circle" icon="arrow-return-right" @click='borrow_book' long>借阅</Button>
                </Col>
                <Col span = '3' :style = "{'padding-left':'20px','padding-right':'20px'}">
                    <Button type="primary" shape="circle" icon="arrow-return-left" @click='return_book' long>归还</Button>
                </Col>
            </Row>
        </Form>
        <Booktable v-bind:data7 = "formdata"></Booktable>
    </Card>
</template>
<script>
import Booktable from './booktable'
export default {
  data() {
      return {
          input1 : '姓名',
          input2 : '类型',
          input3 : '单位',
          cardid : '',
          formdata : []
      }
  },
  components: {
    'Booktable': Booktable
  },
  methods: {
      return_book: function(){
          this.$http.post(this.GLOBAL.postSite + 'returnbook',{
            cardid : this.cardid,
            bookid : this.bookid,
            name      : localStorage.getItem('username'),
            password  : localStorage.getItem('password')
          }).then(function(res){
            if (res.body.ret_code == 0) {
                this.$Message.success(res.body.ret_msg);
            } else {
                this.$Message.error(res.body.ret_msg);
            }
          })
      },
      borrow_book: function(){
          this.$http.post(this.GLOBAL.postSite + 'borrowbook',{
            cardid : this.cardid,
            bookid : this.bookid,
            name      : localStorage.getItem('username'),
            password  : localStorage.getItem('password')
          }).then(function(res){
            if (res.body.ret_code == 0) {
                this.$Message.success(res.body.ret_msg);
            } else {
                this.$Message.error(res.body.ret_msg);
            }
          })
      },
      searchcard: function(){
          this.$http.post(this.GLOBAL.postSite + 'searchcard',{
              id : this.cardid,
              name      : localStorage.getItem('username'),
              password  : localStorage.getItem('password')
          }).then(function(res){
              if (res.body.ret_code == 1){
                  this.$Message.error(res.body.ret_msg);
              } else {
                  this.$Message.success(res.body.ret_msg);
                  this.input1 = res.body.name;
                  this.input2 = res.body.type;
                  this.input3 = res.body.com;
                  this.formdata = res.body.data;
              }
              //this.formdata = res.body.formdata
          });
      }
  }
}
</script>
