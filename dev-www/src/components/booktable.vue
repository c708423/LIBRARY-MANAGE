<style>
.cardstyle{
    margin-left:20px;
}
</style>
<template>
    <Layout class = 'cardstyle'>
        <Table :columns="columns8" :data="data" size="small" ref="table"></Table>
        <Page :current="Curpage" :total="dataCount" :page-size="pageSize" show-total @on-change = 'changeme'></Page>
    </Layout>
</template>
<script>
export default {
    props:['data7'],
    data:function(){
        return{
            Curpage : 1,
            pageSize : 10,
            dataCount: 0,
            pagenum : 1,
            data : [],
            columns8: [
                {
                    "title":"书号",
                    "key":"id",
                    "fixed":"left",
                    "width": 200
                },
                {
                    "title": "书名",
                    "key": "bo_name",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "类别",
                    "key": "bo_type",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "出版社",
                    "key": "bo_press",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "年份",
                    "key": "bo_year",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "作者",
                    "key": "bo_author",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "价格",
                    "key": "bo_price",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "总藏书量",
                    "key": "bo_sum",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "库存",
                    "key": "bo_store",
                    "width": 150,
                    "sortable": true,
                }
            ]
        }
    },
    watch: {
      data7:'datachange'
    },
    methods:{
        datachange:function(){
            console.log('data7',this.data7.length);
            this.Curpage = 1;
            this.dataCount = this.data7.length;
            if (this.data7.length != 0){
                this.data = this.data7.slice(0,10);
            }else{
              this.data = [];
            }
        },
        changeme(page){
            console.log(page);
            let _start = (page - 1) * 10;
            let _end   = _start + 10;
            this.data = this.data7.slice(_start,_end);
        }
    },
    computed: {
        nowpage_row : function(){

        }
    }
}
</script>
