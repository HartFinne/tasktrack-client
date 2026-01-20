import { useState } from "react";

export function useCursorPagination() {
  const [lastUid, setLastUid] = useState(null);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);

  const nextPage = (newLastUid) => {
    if (newLastUid) {
      setHistory(prev => [...prev, lastUid]);
      setLastUid(newLastUid);
      setPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    const newHistory = [...history];
    const prevUid = newHistory.pop();
    setHistory(newHistory);
    setLastUid(prevUid || null);
    setPage(prev => Math.max(prev - 1, 1));
  };

  return {
    lastUid,
    page,
    hasPrev: history.length > 0,
    setLastUid,
    nextPage,
    prevPage,
  };
}
