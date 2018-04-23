<template>
<Card>
    <p slot="title">
        <Icon type="card"></Icon>
        书卡管理
    </p>
    <Form :label-width = '80'>
        <Row>
            <Col span = '18'>
                <FormItem label = '卡号'>
                    <Input v-model = 'cardid'></Input>
                </FormItem>
            </Col>
            <Col span = '3' :style = "{'padding-left':'20px','padding-right':'20px'}">
                <Button type="success" shape="circle" icon="arrow-return-right" @click='addcard' long>添加</Button>
            </Col>
            <Col span = '3' :style = "{'padding-left':'20px','padding-right':'20px'}">
                <Button type="error" shape="circle" icon="arrow-return-left" @click='deletecard' long>删除</Button>
            </Col>
            <Col span = '12'>
                <FormItem label = '单位'>
                    <Input v-model='danwei'></Input>
                </FormItem>
            </Col>
            <Col span = '12'>
                <FormItem label = '姓名'>
                    <Input v-model = 'name'></Input>
                </FormItem>
            </Col>
            <Col span = '12'>
                <FormItem label = '类别'>
                    <Input v-model = 'leibie'></Input>
                </FormItem>
            </Col>
        </Row>
    </Form>
</Card>
</template>
<script>
export default {
    methods:{
        addcard:function(){
            this.$http.post(this.GLOBAL.postSite + 'addcard',{
                name      : localStorage.getItem('username'),
                password  : localStorage.getItem('password'),
                cardid    : this.cardid,
                com       : this.danwei,
                type      : this.leibie,
                cardname  : this.name
            }).then(function(res){
                if (res.body.ret_code == 0 ){
                    this.$Message.success(res.body.ret_msg);
                } else {
                    this.$Message.error(res.body.ret_msg);
                }
            })
        },
        deletecard:function(){
            this.$http.post(this.GLOBAL.postSite + 'deletecard',{
                name     : localStorage.getItem('username'),
                password : localStorage.getItem('password'),
                cardid   : this.cardid
            }).then(function(res){
                if (res.body.ret_code == 0){
                    this.$Message.success(res.body.ret_msg);
                } else {
                    this.$Message.error(res.body.ret_msg);
                }
            })
        }

    }
}
</script>
