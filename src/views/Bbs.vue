<template>
  <div class="container">
    <div class="bbs">
      <div class="articlePost">
        投稿者名：<input type="text" v-model="articleName" /><br /><br />
        投稿内容：<textarea
          cols="30"
          rows="10"
          v-model="articleContent"
        ></textarea>
        <br />
        <button
          class="waves-effect waves-light btn"
          type="button"
          v-on:click="addArticle"
        >
          記事投稿
        </button>
      </div>
      <hr />
      <div class="articleContent">
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
          <div class="comment">
            <br />
            名前：<input v-model="commentName" type="text" /> <br /><br />
            コメント：<textarea
              v-model="commentContent"
              cols="30"
              rows="10"
            ></textarea
            ><br />

            <button
              class="waves-effect waves-light btn"
              type="button"
              v-on:click="addComment(article.id)"
            >
              コメント投稿
            </button>
          </div>
          <hr />
        </div>
      </div>

      <br />

      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import { Component, Vue } from "vue-property-decorator";

@Component
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

  created(): void {
    this.currentArticleList = this["$store"].getters.getArticles;
  }
  /**
   * 記事を追加する.
   */
  addArticle(): void {
    let articleId = this.currentArticleList[0].id + 1;
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

  addComment(articleId: number): void {
    this["$store"].commit("addComment", {
      comment: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        articleId
      ),
    });
    this.commentName = "";
    this.commentContent = "";
  }

  deleteArticle(articleIndex: number): void {
    this["$store"].commit("deleteArticle", {
      articleIndex: articleIndex,
    });
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
.bbs {
  text-align: left;
  display: inline-block;
}
.comment {
  background-color: rgb(223, 236, 232);
}
</style>
