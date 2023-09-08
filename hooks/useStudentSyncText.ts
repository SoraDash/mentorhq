"use client"
import { useEffect, useState } from 'react';



const getRandomSyncMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * syncingTexts.length);
  return syncingTexts[randomIndex];
}
function useStudentSyncText(isSyncing: boolean): string {
  const [syncText, setSyncText] = useState<string>("Sync in progress");

  function animateSyncText() {
    setSyncText(getRandomSyncMessage());
  }

  useEffect(() => {
    let syncAnimation: NodeJS.Timeout | null = null;

    if (isSyncing) {
      syncAnimation = setInterval(animateSyncText, 1000);
    } else {
      if (syncAnimation) clearInterval(syncAnimation);
      setSyncText("Sync in progress");
    }

    return () => {
      if (syncAnimation) clearInterval(syncAnimation);
    };
  }, [isSyncing]);

  return syncText;
}


export default useStudentSyncText;


const syncingTexts = [
  "Gathering students",
  "Still at roll call",
  "No student left behind",
  "Giving them a quick pep talk",
  "Teaching them to line up",
  "Guiding the Git",
  "Coaching the code",
  "Syncing the students' skills",
  "Pairing the programmers",
  "Directing the database download",
  "Linking the learners",
  "Tutoring the tables",
  "Instructing the internet inputs",
];

