import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  }, // end state
  actions: {}, //end actions
  mutations: {
    /**
     * 記事を追加する.
     * @remarks 記事情報を受け取って記事一覧の最初に追加する.
     * @param state - ステートオブジェクト
     * @param payload - 記事情報
     */
    addArticle(state, payload) {
      state.articles.unshift(payload.article);
    },

    // addComment(state, payload) {
    //   return (payload: Comment) => {
    //     const articleID = payload.articleId;
    //     const hitArticles = [];
    //     for (const article of state.articles) {
    //       if (article.id === articleID) {
    //         hitArticles.push(article);
    //       }
    //     }
    //   };
    // },
  }, //end mutations
  getters: {
    /**
     * 全ての記事を取得して返す.
     * @param state - ステートオブジェクト。
     * @returns - 全ての記事を返す。
     */
    getArticles(state) {
      return state.articles;
    },
  }, //end getters
  modules: {}, //end modules
});
