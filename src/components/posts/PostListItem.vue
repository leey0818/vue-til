<template>
  <el-card :body-style="{ height: '100%', boxSizing: 'border-box' }">
    <div class="flex-wrap">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="content">
        {{ item.contents }}
      </div>
      <div class="footer">
        <span class="text">{{ item.createdAt | datetime }}</span>
        <i class="icon-btn el-icon-edit-outline" @click="editItem"></i>
        <i class="icon-btn el-icon-delete" @click="deleteItem"></i>
      </div>
    </div>
  </el-card>
</template>

<script>
import { datetime } from '@/utils/filters';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  filters: {
    datetime,
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

<style scoped>
.el-card {
  width: 320px;
  height: 220px;
  flex-grow: 1;
  margin: 7px;
}
.flex-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.flex-wrap > .title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
}
.flex-wrap > .content {
  flex-grow: 1;
}
.flex-wrap > .footer {
  position: relative;
  bottom: -10px;
  right: -10px;
  text-align: right;
  font-size: 14px;
}
.footer > .text {
  color: #616161;
}
.footer > .icon-btn {
  font-size: 1.1em;
  margin-left: 3px;
  cursor: pointer;
}
</style>
