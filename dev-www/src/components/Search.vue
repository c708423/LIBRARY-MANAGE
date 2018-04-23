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
                          <Option value="shuhao">书号</Option>
                          <Option value="leibie">类别</Option>
                          <Option value="shuming">书名</Option>
                          <Option value="chubanshe">出版社</Option>
                          <Option value="zuozhe">作者</Option>
                      </Select>
                    </Input>
                </FormItem>
              </Col>
              <Col span='6' :style = "{'padding-left':'20px'}">
                <Button type="primary" shape="circle" icon="ios-search" long>Search</Button>
              </Col>
            </Row>
            <Row :gutter="16">
                <Col span = '12'>
                    <FormItem label = "价格范围">
                        <Input v-model="value12" placeholder='价格的起始范围，默认为0' class='aline'>
                        </Input>
                        <Input v-model="value12" placeholder='价格的截止范围，默认为无穷'>
                        </Input>
                    </FormItem>
                </Col>
                <Col span = '12'>
                    <FormItem label = "年份">
                        <Input v-model="value12" placeholder='价格的起始范围，默认为0' class='aline'>
                        </Input>
                        <Input v-model="value12" placeholder='价格的截止范围，默认为无穷'>
                        </Input>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <br/>
        <Booktable></Booktable>
    </Card>
</template>
<script>
import Booktable from './booktable'
export default {
  components: {
    'Booktable': Booktable
  }
}
</script>
