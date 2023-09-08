"use client"

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function SwitchTheme() {
  const { setTheme } = useTheme()

  return (
    <Dropdown backdrop='blur'>
      <DropdownTrigger>
        <Button variant="light" size="sm" color='primary'>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem onClick={() => setTheme("light")}>
          Light
        </DropdownItem>
        <DropdownItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownItem>
        <DropdownItem onClick={() => setTheme("system")}>
          System
        </DropdownItem>

      </DropdownMenu>
    </Dropdown>

  )
}
