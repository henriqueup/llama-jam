import { useGlobalStore } from "./globalStore";

export const setGlobalLoading = (isLoading: boolean) =>
  useGlobalStore.setState(() => ({ isLoading }));
