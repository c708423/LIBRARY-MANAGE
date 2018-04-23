<style>
.cardstyle{
    margin-left:20px;
}
</style>
<template>
    <Layout class = 'cardstyle'>
        <Table :columns="columns8" :data="data7" size="small" ref="table"></Table>
        <Page :total="100" show-sizer></Page>
    </Layout>
</template>
<script>
export default {
    data(){
        return{
            columns8: [
                {
                    "title":"书号",
                    "key":"num",
                    "fixed":"left",
                    "width": 200
                },
                {
                    "title": "书名",
                    "key": "bookname",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "类别",
                    "key": "booktype",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "出版社",
                    "key": "bookpress",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "年份",
                    "key": "year",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "作者",
                    "key": "author",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "价格",
                    "key": "price",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "总藏书量",
                    "key": "allstore",
                    "width": 150,
                    "sortable": true,
                },
                {
                    "title": "库存",
                    "key": "stock",
                    "width": 150,
                    "sortable": true,
                }
            ]
        }
    }
}
</script>
