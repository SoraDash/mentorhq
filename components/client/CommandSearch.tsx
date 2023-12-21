'use client';

'use strict';

import { CommandLoading } from 'cmdk';
import { GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation'; // updated from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';

import { getAllMentorsAdmin } from '@/lib/admin/mentors';
import { getUser } from '@/lib/auth/auth';
import { ADMIN_MENU, MAIN_MENU } from '@/lib/menu';
import { getAllStudents } from '@/lib/students';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

type SearchableItem = {
  action: () => void;
  icon?: React.ComponentType<{ className: string }>;
  label: string;
  type: 'menu' | 'student' | 'mentor';
};

function IconForType({
  icon: Icon,
  type,
}: {
  icon?: React.ComponentType<{ className: string }>;
  type: 'menu' | 'student' | 'mentor';
}) {
  if (Icon) {
    return <Icon className="mr-2 h-4 w-4" />;
  }

  switch (type) {
    case 'menu':
      return <GraduationCap className="mr-2 h-4 w-4" />;
    case 'student':
      return <GraduationCap className="mr-2 h-4 w-4" />;
    case 'mentor':
      return <FaChalkboardTeacher className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
}

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [unifiedData, setUnifiedData] = useState<SearchableItem[]>([]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const user = await getUser();

      const fetchedStudents = await getAllStudents();
      const fetchedMentors = await getAllMentorsAdmin();

      const mainMenuData = MAIN_MENU.map(
        (item): SearchableItem => ({
          type: 'menu',
          label: item.label,
          action: () => {
            router.push(item.href);
            setOpen(false);
          },
          icon: item.icon,
        }),
      );

      const studentData = fetchedStudents.map(
        (student): SearchableItem => ({
          type: 'student',
          label: student.name,
          action: () => {
            router.push(`/student/${student.id}`);
            setOpen(false);
          },
        }),
      );

      let mentorData: SearchableItem[] = [];
      let adminMenuData: SearchableItem[] = [];

      if (user?.role === 'ADMIN') {
        mentorData = fetchedMentors.map(
          (mentor): SearchableItem => ({
            type: 'mentor',
            label: mentor.name || '',
            action: () => {
              router.push(`/admin/mentor/${mentor.id}`);
              setOpen(false);
            },
          }),
        );

        adminMenuData = ADMIN_MENU.map(
          (item): SearchableItem => ({
            type: 'menu',
            label: item.label,
            action: () => {
              router.push(item.href);
              setOpen(false);
            },
            icon: item.icon,
          }),
        );
      }

      setUnifiedData([
        ...mainMenuData,
        ...studentData,
        ...mentorData,
        ...adminMenuData,
      ]);
      setLoading(false);
    }

    fetchData();
  }, [router]);

  const filteredData = unifiedData.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <CommandDialog onOpenChange={setOpen} open={open} shouldFilter={false}>
      <CommandInput
        onValueChange={setSearchTerm}
        placeholder="Type a command or search..."
        value={searchTerm}
      />
      <CommandList>
        {loading && <CommandLoading>Loading...</CommandLoading>}
        {filteredData.length === 0 && (
          <CommandEmpty>No matches found</CommandEmpty>
        )}
        <CommandGroup heading="Navigation">
          {filteredData
            .filter((item) => item.type === 'menu')
            .map((item) => (
              <CommandItem key={item.label} onSelect={item.action}>
                <IconForType icon={item.icon} type={item.type} />
                <span>{item.label}</span>
              </CommandItem>
            ))}
        </CommandGroup>

        {/* Grouping by Student */}
        <CommandGroup heading="Students">
          {filteredData
            .filter((item) => item.type === 'student')
            .map((item) => (
              <CommandItem key={item.label} onSelect={item.action}>
                <IconForType icon={item.icon} type={item.type} />
                <span>{item.label}</span>
              </CommandItem>
            ))}
        </CommandGroup>

        {/* Grouping by Mentor */}
        <CommandGroup heading="Mentors">
          {filteredData
            .filter((item) => item.type === 'mentor')
            .map((item) => (
              <CommandItem key={item.label} onSelect={item.action}>
                <IconForType icon={item.icon} type={item.type} />
                <span>{item.label}</span>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
