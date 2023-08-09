<script setup lang="ts">
// @ts-ignore [Vue] Property or method "useAppConfig" is not defined on the instance but referenced during render.
const app = useAppConfig()
// @ts-ignore [Vue] Property or method "useMagzyneDataFetcher" is not defined on the instance but referenced during render.
const { newsData, newsDataError, newsDataLoading } = useMagzyneDataFetcher();
</script>

<template>
  <div class="navbar bg-base-100 sticky top-0 z-50">
    <a class="btn btn-ghost normal-case text-xl">{{ app.site.name }}</a>
  </div>
  <section class="flex flex-wrap gap-4 items-center justify-center" v-if="!newsDataLoading && !newsDataError">
    <div class="lg:w-1/2">
      <article :key="news.url" v-for="news in newsData">
        <a :href="news.url" target="_blank"
          class="card md:card-side w-full bg-base-100 shadow-xl border border-primary hover:border-primary-focus m-2">
          <div class="card-body p-4">
            <h2 class="card-title">
              {{ news.title }}
            </h2>
            <p class="max-h-1/3 h-1/3 overflow-y-hidden">{{ news.description?.slice(0, 200) + "..." }}</p>
            <div class="badge badge-secondary text-sm">{{ news.source || "Unknown" }}</div>
          </div>
          <figure class="w-3/4" v-if="news.image != '-'"><img :src="news.image" :alt="'Cover image of' + news.title" />
          </figure>
        </a>
      </article>
    </div>
  </section>
</template>
