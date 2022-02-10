import { useState, useCallback, useEffect } from "react";

export const useOpenAlertState = () => {
  const [isAlertOpen, setIsAlertopen] = useState(false);

  const openAlert = useCallback(() => setIsAlertopen(true), []);
  const closeAlert = useCallback(() => setIsAlertopen(false), []);

  return { openAlert, closeAlert, isAlertOpen };
};

export const useOpenDeleteAlertState = () => {
  const [isDeleteAlertOpen, setIsDeleteAlertopen] = useState(false);

  const openDeleteAlert = useCallback(() => setIsDeleteAlertopen(true), []);
  const closeDeleteAlert = useCallback(() => setIsDeleteAlertopen(false), []);

  return { openDeleteAlert, closeDeleteAlert, isDeleteAlertOpen };
};

export const useOpenDrawerState = () => {
  const [isDrawerOpen, setIsDraweropen] = useState(false);

  const openDrawer = useCallback(() => setIsDraweropen(true), []);
  const closeDrawer = useCallback(() => setIsDraweropen(false), []);

  return { openDrawer, closeDrawer, isDrawerOpen };
};

export const useOpenModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const open = useCallback(() => setIsModalOpen(true), []);
  const close = useCallback(() => setIsModalOpen(false), []);

  return { open, close, isModalOpen };
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = (evt) => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);
  return matches;
};
