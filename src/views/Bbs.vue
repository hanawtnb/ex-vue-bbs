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
        <div v-for="article of currentArticleList" v-bind:key="article.id">
          <br />
          投稿者名：{{ article.name }} <br />
          投稿内容：{{ article.content }}

          <div
            class="comment"
            v-for="comment of article.commentList"
            v-bind:key="comment.id"
          >
            <br />
            コメント者名：{{ comment.name }} <br />
            コメント内容：{{ comment.content }}
          </div>
          <hr />
        </div>
      </div>

      <br />
      <div class="comment">
        名前：<input type="text" /> <br /><br />
        コメント：<textarea cols="30" rows="10"></textarea><br />

        <button class="waves-effect waves-light btn" type="button">
          コメント投稿
        </button>
      </div>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BaseballTeamList extends Vue {
  // 現在の記事一覧
  private currentArticleList = new Array<Article>();
  // 投稿者名
  private articleName = "";
  // 投稿内容
  private articleContent = "";

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
  }
}
</script>

<style>
.container {
  text-align: center;
}
.bbs {
  text-align: left;
  display: inline-block;
}
</style>
