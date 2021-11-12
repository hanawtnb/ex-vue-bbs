<template>
  <div class="container">
    <div v-for="article of currentArticleList" v-bind:key="article.id">
      投稿者名：{{ article.name }} 投稿内容：{{ article.content }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BaseballTeamList extends Vue {
  // 現在の記事一覧
  private currentArticleList = [];

  created(): void {
    this.currentArticleList = this["$store"].getters.getArticles;
  }
}
</script>

<style></style>
