<template>
  <div class="home">
    <InfiniteScroll />
  </div>
</template>

<script>
import InfiniteScroll from '@/components/InfiniteScroll.vue';

export default {
  name: 'HomeView',
  components: {
    InfiniteScroll
  }
};
</script>

<style scoped>
.home {
  padding: 16px;
}
</style>
