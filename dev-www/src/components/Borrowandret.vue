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
                        <Input></Input>
                    </FormItem>
                </Col>
                <Col span = '6' :style = "{'padding-left':'20px','padding-right':'20px'}">
                    <Button type="primary" shape="circle" icon="ios-search" long>Search</Button>
                </Col>
                <Col span = '18'>
                    <FormItem label = '书号'>
                        <Input></Input>
                    </FormItem>
                </Col>
                <Col span = '3' :style = "{'padding-left':'20px','padding-right':'20px'}">
                    <Button type="primary" shape="circle" icon="arrow-return-right" long>借阅</Button>
                </Col>
                <Col span = '3' :style = "{'padding-left':'20px','padding-right':'20px'}">
                    <Button type="primary" shape="circle" icon="arrow-return-left" long>归还</Button>
                </Col>
            </Row>
        </Form>
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
