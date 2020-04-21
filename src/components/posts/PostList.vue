<template>
  <div class="flex-box" v-loading="loading">
    <post-list-item
      v-for="item in items"
      :key="item._id"
      :item="item"
      @delete="deleteItem"
    ></post-list-item>
  </div>
</template>

<script>
import PostListItem from '@/components/posts/PostListItem.vue';

export default {
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PostListItem,
  },
  methods: {
    deleteItem(id) {
      if (confirm('Do you want to delete this post?')) {
        this.$emit('deleteItem', id);
      }
    },
  },
};
</script>

<style scoped>
.flex-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
