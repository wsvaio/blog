import { type DataType, type LoadMoreBaseOptions, useLoadMore } from "vue-request";

export default <T extends { total: number; list: any[]; page: number }>(
  service: (page: number) => Promise<T>,
  options?: LoadMoreBaseOptions<DataType>
) => {
  const {
    dataList,
    noMore,
    loadingMore,
    data,
    refreshAsync: _refreshAsync,
    loading,
    loadMoreAsync: _loadMoreAsync,
  } = useLoadMore(
    async data => {
      const result = await service((data?.page || 0) + 1);
      return {
        list: result.list,
        total: result.total,
        page: result.page,
      };
    },
    {
      isNoMore: data => !!data && data?.list?.length >= data.total,

      ...options,
    }
  );

  const loadmoreStatus = computed(() => {
    if (loading.value || loadingMore.value)
      return "loading";
    if (data.value && data.value.total == 0)
      return "empty";
    if (noMore.value)
      return "nomore";
    return "loadmore";
  });

  const refreshing = ref(false);
  const refreshAsync = async () => {
    refreshing.value = true;
    await _refreshAsync().finally(() =>
      setTimeout(() => {
        refreshing.value = false;
      }, 200)
    );
  };

  const loadMoreAsync = async () => {
    noMore.value || _loadMoreAsync();
  };

  return {
    dataList,
    loadmoreStatus,
    loadMoreAsync,
    reload: _refreshAsync,
    refreshAsync,
    refreshing,
    loading,
    loadingMore,
    data,
    noMore,
  };
};
