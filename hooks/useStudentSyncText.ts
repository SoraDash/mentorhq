'use client';

import { useEffect, useState } from 'react';

import { LOADING_TEXT } from '@/constants/loading-text';

const getRandomSyncMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * LOADING_TEXT.length);

  return LOADING_TEXT[randomIndex];
};

function useStudentSyncText(isSyncing: boolean): string {
  const [syncText, setSyncText] = useState<string>('Sync in progress');

  function animateSyncText() {
    setSyncText(getRandomSyncMessage());
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let syncAnimation: NodeJS.Timeout | null = null;

    if (isSyncing) {
      syncAnimation = setInterval(animateSyncText, 1000);
    } else {
      if (syncAnimation) clearInterval(syncAnimation);
      setSyncText('Sync in progress');
    }

    return () => {
      if (syncAnimation) clearInterval(syncAnimation);
    };
  }, [isSyncing]);

  return syncText;
}

export default useStudentSyncText;
