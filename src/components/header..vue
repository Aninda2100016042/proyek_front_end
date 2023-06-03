<template>
<div class="w-full bg-gray-100">
    <div class="flex justify-between items-center h-[50px]">
        <div class="p-4 cursor-pointer hover:bg-gray-50" @click="clickHambuger">
            <i class="pi pi-bars"></i>
        </div>
            <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />

        </div>
    </div>

</template>
    
<script>
export default {
    props:{
        dataOpenSideBar:Boolean,
        clickHambuger: Function
    },
 data(){
    return{
        items: [] // Definisikan properti "items" dengan nilai awal yang sesuai 
    };
 },
 methods:{
    toggle(event){
        this.$refs.menu.toggle(event);
    },
 }

}
</script>
    
<style>
    
</style>