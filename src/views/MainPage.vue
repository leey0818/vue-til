<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <loading-spinner v-if="isLoading"></loading-spinner>
      <ul v-else>
        <post-list-item
          v-for="postItem in postItems"
          :key="postItem._id"
          :item="postItem"
        ></post-list-item>
      </ul>
    </div>
    <router-link to="/add" class="create-button">
      <i class="fas fa-plus"></i>
    </router-link>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import PostListItem from '@/components/posts/PostListItem.vue';
import { fetchPosts } from '@/api';

export default {
  components: {
    LoadingSpinner,
    PostListItem,
  },
  data() {
    return {
      postItems: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;

      const { data } = await fetchPosts();
      this.postItems = data.posts;
      this.isLoading = false;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
