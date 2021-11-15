<template>
  <div class="container">
    <div class="form">
      <div class="card-panel amber lighten-5">
        <br />
        <div class="error">
          {{ errorMessageforCommentName }}
        </div>
        名前：<input v-model="commentName" type="text" maxlength="50" />
        <br /><br />
        <div class="error">{{ errorMessageforCommentContent }}</div>
        コメント：<textarea
          v-model="commentContent"
          cols="30"
          rows="50"
        ></textarea
        ><br />
      </div>
    </div>

    <button
      class="waves-effect waves-light btn"
      type="button"
      v-on:click="addComment()"
    >
      コメント投稿
    </button>
  </div>
</template>

<script lang="ts">
import { Comment } from "@/types/comment";
import { Prop, Component, Vue } from "vue-property-decorator";

@Component
export default class CommentInput extends Vue {
  //コメント者名
  private commentName = "";
  //コメント内容
  private commentContent = "";
  // コメント者名が未入力の時のエラーメッセージ
  private errorMessageforCommentName = "";
  // コメント内容が未入力の時のエラーメッセージ
  private errorMessageforCommentContent = "";

  @Prop()
  private articleId!: number;

  addComment(): void {
    let hasErrors = false;
    if (this.commentName == "") {
      this.errorMessageforCommentName = "名前を入力してください";
      hasErrors = true;
    } else if (this.commentName.length >= 50) {
      this.errorMessageforCommentName = "名前は50文字以下で入力してください";
      hasErrors = true;
      this.commentName = "";
    } else {
      this.errorMessageforCommentName = "";
    }

    if (this.commentContent == "") {
      this.errorMessageforCommentContent = "コメントを入力してください";
      hasErrors = true;
    } else {
      this.errorMessageforCommentContent = "";
    }

    if (hasErrors == true) {
      return;
    }

    this["$store"].commit("addComment", {
      comment: new Comment(
        // 存在しないIDを入れている。
        -1,
        this.commentName,
        this.commentContent,
        this.articleId
      ),
    });
    this.commentName = "";
    this.commentContent = "";
  }
}
</script>

<style scoped>
.error {
  color: red;
}

.container {
  text-align: center;
}

.form {
  display: inline-block;
  text-align: left;
}
</style>
