 <style scoped>
.aline{
  padding-top:10px;
  padding-bottom:10px;
}
</style>
<template>
    <Card class = 'inputcard'>
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            图书查询
        </p>
        <Form :label-width="80">
            <Row>
              <Col span='18'>
                <FormItem label='查询项目'>
                    <Input v-model="value12">
                      <Select v-model="select2" slot="append" style="width: 70px">
                          <Option value="id">书号</Option>
                          <Option value="bo_type">类别</Option>
                          <Option value="bo_name">书名</Option>
                          <Option value="bo_press">出版社</Option>
                          <Option value="bo_author">作者</Option>
                      </Select>
                    </Input>
                </FormItem>
              </Col>
              <Col span='6' :style = "{'padding-left':'20px'}">
                <Button type="primary" shape="circle" icon="ios-search" @click = 'searchbook'long>Search</Button>
              </Col>
            </Row>
            <Row :gutter="16">
                <Col span = '12'>
                    <FormItem label = "价格范围">
                        <Input v-model="price_low" placeholder='价格的起始范围，默认为0'  @on-change = 'rangechange' class='aline' number>
                        </Input>
                        <Input v-model="price_high"  placeholder='价格的截止范围，默认为无穷' @on-change = 'rangechange' number>
                        </Input>
                    </FormItem>
                </Col>
                <Col span = '12'>
                    <FormItem label = "年份">
                        <Input v-model="year_low" placeholder='价格的起始范围，默认为0' @on-change = 'rangechange' class='aline' number >
                        </Input>
                        <Input v-model="year_high" placeholder='价格的截止范围，默认为无穷' @on-change = 'rangechange' number>
                        </Input>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <br/>
        <Booktable v-bind:data7 = "usedata"></Booktable>
    </Card>
</template>
<script>
import Booktable from './booktable'
function changetoint(num){
    if (typeof(num) == "string") return 0;
}
export default {
  data (){
      return{
          formdata : [],
          usedata : [],
          value12  : '',
          select2  : 'id',
          price_low : this.GLOBAL.price_zero,
          price_high : this.GLOBAL.price_inf,
          year_low  : this.GLOBAL.year_zero,
          year_high : this.GLOBAL.year_inf,
      }
  },
  components: {
    'Booktable': Booktable
  },
  methods: {
    rangechange: function(){
      var newArr = [],anArr = this.formdata;
      for (var value of anArr){
          if (Number(value.bo_price) >= this.price_low  && Number(value.bo_price) <= this.price_high
              && Number(value.bo_year) >= this.year_low && Number(value.bo_year) <= this.year_high){
                  newArr.push(value);
              }
      }
      this.usedata = newArr;
    },
    searchbook: function(){
        this.$http.post(this.GLOBAL.postSite + 'searchbook',
        { type:this.select2, content:this.value12}).then(function(res){
          console.log(res);
          this.formdata = res.body;
          this.rangechange();
        });
    }
  }
}
</script>
