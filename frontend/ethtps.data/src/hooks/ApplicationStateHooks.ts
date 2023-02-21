import { setApplicationDataLoaded } from "../slices/ApplicationStateSlice";
import { useAppSelector, store } from "../store";

export const useGetApplicationDataLoadedFromAppStore = () => {
  return useAppSelector(
    (state) => state.applicationState.applicationDataLoaded
  );
};

export const useMarkApplicationDataLoaded = () => {
  store.dispatch(setApplicationDataLoaded(true));
};
