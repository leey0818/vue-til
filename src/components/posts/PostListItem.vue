<template>
  <li>
    <div class="post-title">
      {{ item.title }}
    </div>
    <div class="post-contents">
      {{ item.contents }}
    </div>
    <div class="post-time">
      {{ item.createdAt }}
      <span class="icon"><i class="fa fa-edit"></i></span>
      <span class="icon" @click="deleteItem"><i class="fa fa-trash"></i></span>
    </div>
  </li>
</template>

<script>
import { deletePost } from '@/api/posts.api';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteItem() {
      const response = await deletePost(this.item._id);
      console.log(response);
    },
  },
};
</script>

<style></style>
