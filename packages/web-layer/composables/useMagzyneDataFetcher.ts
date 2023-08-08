export type NewsItem = {
  title: string;
  description?: string;
  url: string;
  image?: string;
  source: string;
  date?: Date;
};

export type NewsItemRaw = NewsItem & {
  date?: string;
};

export default function () {
  const { dataSource } = useAppConfig();

  const newsData = ref<NewsItem[]>([]);
  const newsDataLoading = ref(false);
  const newsDataError = ref<Error | null>(null);

  const { ghRepoUsername, ghRepoName, ghDsIssueNumber } = dataSource;

  const pageNo = ref(1);

  const hasMorePages = ref(true);

  const fetchPage = () => {
    newsDataLoading.value = true;
    useFetch<Record<string, any>[]>(
      `https://api.github.com/repos/${ghRepoUsername}/${ghRepoName}/issues/${ghDsIssueNumber}/comments?direction=desc&page=${pageNo.value}`
    )
      .then((res) => {
        const data = res.data.value as Record<string, any>[];
        if (data.length === 0) {
          hasMorePages.value = false;
          return;
        }
        const fetchedNewsData: NewsItem[] = [];

        for (let index = 0; index < data.length; index++) {
          const comment = data[index].body as string;
          const newsItemsSerialized = comment.split(";;;");

          for (let index2 = 0; index2 < newsItemsSerialized.length; index2++) {
            const newsItemSerialized = newsItemsSerialized[index2].split(";;");
            const newsItemRaw: NewsItem = {
              title: newsItemSerialized[0],
              description: newsItemSerialized[1],
              image: newsItemSerialized[2],
              url: newsItemSerialized[3],
              source: newsItemSerialized[4],
              date: newsItemSerialized[5]
                ? new Date(newsItemSerialized[5])
                : undefined,
            };

            fetchedNewsData.push(newsItemRaw);
          }

          newsData.value = [...newsData.value, ...fetchedNewsData];
        }
      })
      .catch((err) => {
        newsDataError.value = err;
      })
      .finally(() => {
        newsDataLoading.value = false;
      });
  };

  fetchPage();

  const fetchNextPage = () => {
    if (!hasMorePages.value) return;
    pageNo.value++;
    fetchPage();
  };

  return {
    newsData,
    newsDataLoading,
    newsDataError,
    fetchNextPage,
    hasMorePages,
  };
}
