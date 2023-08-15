<script setup lang="ts">
const app = useAppConfig()
const { newsData, newsDataError, newsDataLoading } = useMagzyneDataFetcher();
</script>

<template>
  <nav class="navbar">
    <h1 class="navbar-title">{{ app.site.name }}</h1>
  </nav>
  <section class="article-grid" v-if="!newsDataLoading && !newsDataError">
      <article :key="news.url" class="article" v-for="news in newsData">
        <a :href="news.url" target="_blank"
          class="">
          <img :src="news.image" :alt="'Cover image of' + news.title" v-if="news.image != '-'"/>
          <h2>{{ news.title }}</h2>
          <p>{{ news.description?.slice(0, 200) + "..." }}</p>
          <p class="article-source">{{ news.source }}</p>
        </a>
      </article>
  </section>
</template>
