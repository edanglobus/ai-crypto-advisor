import { useQuery, useQueryClient } from '@tanstack/react-query';

import { dashboardApi } from '../api/dashboard.api';

export const DASHBOARD_QUERY_KEY = ['dashboard'] as const;

const MARKET_KEY = [...DASHBOARD_QUERY_KEY, 'market'];
const PRICES_KEY = [...DASHBOARD_QUERY_KEY, 'prices'];
const NEWS_KEY = [...DASHBOARD_QUERY_KEY, 'news'];
const INSIGHT_KEY = [...DASHBOARD_QUERY_KEY, 'insight'];

export function useMarket() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: MARKET_KEY,
    queryFn: () => dashboardApi.getMarket(),
    staleTime: 2 * 60 * 1000,
  });
  const refresh = () => queryClient.fetchQuery({ queryKey: MARKET_KEY, queryFn: () => dashboardApi.getMarket(true) });
  return { ...query, refresh };
}

export function usePrices() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: PRICES_KEY,
    queryFn: () => dashboardApi.getPrices(),
    staleTime: 60 * 1000,
  });
  // Force-refresh bypasses the server cache for fresh data.
  const refresh = () => queryClient.fetchQuery({ queryKey: PRICES_KEY, queryFn: () => dashboardApi.getPrices(true) });
  return { ...query, refresh };
}

export function useNews() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: NEWS_KEY,
    queryFn: () => dashboardApi.getNews(),
    staleTime: 5 * 60 * 1000,
  });
  const refresh = () => queryClient.fetchQuery({ queryKey: NEWS_KEY, queryFn: () => dashboardApi.getNews(true) });
  return { ...query, refresh };
}

export function useInsight() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: INSIGHT_KEY,
    queryFn: () => dashboardApi.getInsight(),
    staleTime: 30 * 60 * 1000,
  });
  const refresh = () => queryClient.fetchQuery({ queryKey: INSIGHT_KEY, queryFn: () => dashboardApi.getInsight(true) });
  return { ...query, refresh };
}

export function useMeme() {
  return useQuery({
    queryKey: [...DASHBOARD_QUERY_KEY, 'meme'],
    queryFn: dashboardApi.getMeme,
    staleTime: 0, // re-roll on every refresh
  });
}
