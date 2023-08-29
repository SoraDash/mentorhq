"use client"

export const fetchLatestStats = async (): Promise<any> => {
  const response = await fetch('/api/billing/latest-stats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};