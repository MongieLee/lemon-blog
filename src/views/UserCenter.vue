<template>
  <div class="container">
    <div>
      <el-form :model="userForm" status-icon :rules="formRules" ref="ruleForm" label-width="120px">
        <el-form-item label="头像">
          <el-avatar :size="160" :src="userForm.avatar || '/avatar/default.png'"></el-avatar>
          <el-upload action="" :before-upload="uploadFile" :show-file-list="false">
            <el-button size="small" type="primary">修改头像</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input style="width:220px;" v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import fileApi from '@/api/file';
import userApi from '@/api/user';
import { mapGetters } from 'vuex';
const checkFileType = (file) => {
  return !/\.(jpg|jpeg|peg|png|GIF|JPG|PNG)$/.test(file.name);
};

export default {
  data() {
    return {
      userForm: {},
      formRules: {
        username: [
          {
            required: true,
            message: '昵称不能为空',
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    this.userForm = JSON.parse(JSON.stringify(this.user));
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          userApi.update(this.userForm).then((res) => {
            console.log(res);
            this.$message({
              type: 'success',
              message: '更新成功',
            });
          });
        }
      });
    },
    uploadFile(file) {
      if (checkFileType(file)) {
        this.$message({
          type: 'error',
          message: '只能上传jpg和png格式的图片!',
        });
        return Promise.reject();
      }
      if (file.size > 512000) {
        this.$message({
          type: 'error',
          message: '图片大于500kb!',
        });
        return Promise.reject();
      }
      const fd = new FormData();
      fd.append('file', file);
      fileApi.uploadFile(fd).then((res) => {
        this.userForm.avatar = res.data.data.filePath;
      });
      return Promise.reject();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
