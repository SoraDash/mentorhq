export const fetchLatestStats = async (): Promise<any> => {
  const response = await fetch('/api/latest-stats');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
