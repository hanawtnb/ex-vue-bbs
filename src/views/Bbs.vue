<template>
  <div class="container">
    <div class="bbs">
      <div class="articlePost">
        <div class="error">
          {{ errorMessageforArticleName }}
        </div>
        投稿者名：<input
          type="text"
          v-model="articleName"
          maxlength="50"
        /><br /><br />
        <div class="error">{{ errorMessageforArticleContent }}</div>
        投稿内容：<textarea
          cols="30"
          rows="50"
          v-model="articleContent"
        ></textarea>
        <br />
      </div>
      <button
        class="waves-effect waves-light btn"
        type="button"
        v-on:click="addArticle"
      >
        記事投稿
      </button>
    </div>
    <div class="card-panel teal lighten-5">
      <div
        v-for="(article, index) of currentArticleList"
        v-bind:key="article.id"
      >
        <br />
        投稿者名：{{ article.name }} <br />
        投稿内容：{{ article.content }}
        <br />
        <button
          class="waves-effect waves-light btn"
          type="button"
          v-on:click="deleteArticle(index)"
        >
          記事削除
        </button>

        <div
          class="commentContent"
          v-for="comment of article.commentList"
          v-bind:key="comment.id"
        >
          <br />
          コメント者名：{{ comment.name }} <br />
          コメント内容：{{ comment.content }}
        </div>
        <div class="card-panel amber lighten-5">
          <br />
          <CommentInput v-bind:article-id="article.id"></CommentInput>

          <!-- 名前：<input v-model="commentName" type="text" /> <br /><br />
            コメント：<textarea
              v-model="commentContent"
              cols="30"
              rows="10"
            ></textarea
            ><br /> -->
          <!-- 
            <button
              class="waves-effect waves-light btn"
              type="button"
              v-on:click="addComment(article.id)"
            >
              コメント投稿
            </button> -->
        </div>
      </div>
    </div>

    <br />
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
import CommentInput from "@/components/CommentInput.vue";

@Component({
  components: { CommentInput },
})
export default class BaseballTeamList extends Vue {
  // 現在の記事一覧
  private currentArticleList = new Array<Article>();
  // 投稿者名
  private articleName = "";
  // 投稿内容
  private articleContent = "";
  //コメント者名
  private commentName = "";
  //コメント内容
  private commentContent = "";
  // 投稿者名が未入力の時のエラーメッセージ
  private errorMessageforArticleName = "";
  // 投稿内容が未入力の時のエラーメッセージ
  private errorMessageforArticleContent = "";

  created(): void {
    this.currentArticleList = this["$store"].getters.getArticles;
  }
  /**
   * 記事を追加する.
   */
  addArticle(): void {
    let hasErrors = false;
    let articleId = 0;
    if (this.articleName == "") {
      this.errorMessageforArticleName = "投稿者名を入力してください";
      hasErrors = true;
    } else if (this.articleName.length >= 50) {
      this.errorMessageforArticleName = "投稿者名は50文字以下で入力して下さい";
      hasErrors = true;
      this.articleName = "";
    } else {
      this.errorMessageforArticleName = "";
    }

    if (this.articleContent == "") {
      this.errorMessageforArticleContent = "投稿内容を入力してください";
      hasErrors = true;
    } else {
      this.errorMessageforArticleContent = "";
    }

    if (hasErrors == true) {
      return;
    }

    if (this.currentArticleList.length == 0) {
      articleId = 1;
    } else {
      articleId = this.currentArticleList[0].id + 1;
    }
    this["$store"].commit("addArticle", {
      article: new Article(
        articleId,
        this.articleName,
        this.articleContent,
        []
      ),
    });
    this.articleName = "";
    this.articleContent = "";
  }

  // addComment(articleId: number): void {
  //   this["$store"].commit("addComment", {
  //     comment: new Comment(
  //       // 存在しないIDを入れている。
  //       -1,
  //       this.commentName,
  //       this.commentContent,
  //       articleId
  //     ),
  //   });
  //   this.commentName = "";
  //   this.commentContent = "";
  // }

  deleteArticle(articleIndex: number): void {
    console.log(articleIndex);
    this["$store"].commit("deleteArticle", {
      article: { articleIndex: articleIndex },
    });
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}
.bbs {
  text-align: left;
  display: inline-block;
}
.error {
  color: red;
}
</style>
