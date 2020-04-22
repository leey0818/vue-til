<template>
  <!-- <h1 class="page-header">Create Post</h1> -->
  <el-card>
    <el-form
      ref="postForm"
      :model="value"
      :rules="rules"
      status-icon
      hide-required-asterisk
      @submit.native.prevent
    >
      <el-form-item label="Title" prop="title">
        <el-input
          autofocus
          :readonly="loading"
          :value="value.title"
          @input="text => inputValue('title', text, false)"
          @blur="evt => inputValue('title', evt.target.value, true)"
        />
      </el-form-item>
      <el-form-item label="Content" prop="content">
        <el-input
          type="textarea"
          rows="6"
          :readonly="loading"
          :value="value.content"
          @input="text => inputValue('content', text, false)"
          @blur="evt => inputValue('content', evt.target.value, true)"
        />
      </el-form-item>
      <div style="text-align:right">
        <el-button type="primary" :loading="loading" @click="submitForm">
          {{ submitText }}
        </el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
      validator(value) {
        return value.title !== undefined && value.content !== undefined;
      },
    },
    submitText: {
      type: String,
      default: 'Submit',
    },
    loading: Boolean,
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: 'Title is required.', trigger: 'blur' }],
        content: [
          { required: true, message: 'Content is required.', trigger: 'blur' },
          {
            max: 300,
            message: 'Content length must be less than 300.',
            trigger: ['change', 'blur'],
          },
        ],
      },
    };
  },
  methods: {
    inputValue(prop, value, trimValue) {
      const model = Object.assign({}, this.value, {
        [prop]: trimValue ? value.trim() : value,
      });

      this.$emit('input', model);
    },
    validateForm() {
      return this.$refs.postForm.validate().catch(() => Promise.resolve(false));
    },
    async submitForm() {
      const isValid = await this.validateForm();
      if (!isValid) return;

      this.$emit('submit');
    },
  },
};
</script>
