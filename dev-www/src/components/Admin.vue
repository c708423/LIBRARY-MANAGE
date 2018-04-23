<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        height:540px;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{height:'100%'}">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" >
                <Menu active-name="1-1" theme="dark" height="100%" width="auto" :class="menuitemClasses">
                    <router-link to="/search">
                        <MenuItem name="1-1">
                            <Icon type="search"></Icon>
                            <span>图书查询</span>
                        </MenuItem>
                    </router-link>
                    <router-link to="/addbook">
                        <MenuItem name="1-2">
                            <Icon type="ios-plus"></Icon>
                            <span>图书入库</span>
                        </MenuItem>
                    </router-link>
                    <router-link to='borrow'>
                        <MenuItem name="1-3">
                            <Icon type="ios-book"></Icon>
                            <span>图书借还</span>
                        </MenuItem>
                    </router-link>
                    <router-link to='cardmanage'>
                        <MenuItem name="1-4">
                            <Icon type="card"></Icon>
                            <span>借书证</span>
                        </MenuItem>
                    </router-link>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import LoginForm from './LoginForm'
    export default {
        mounted(){
            console.log("ok");

        },
        data () {
            return {
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        },
        components: {
            'LoginForm' : LoginForm
        }
    }
</script>
