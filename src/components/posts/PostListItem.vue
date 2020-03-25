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
      <span class="icon" @click="editItem"><i class="fa fa-edit"></i></span>
      <span class="icon" @click="deleteItem"><i class="fa fa-trash"></i></span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteItem() {
      this.$emit('delete', this.item._id);
    },
    editItem() {
      this.$router.push(`/post/${this.item._id}`);
    },
  },
};
</script>

<style></style>
