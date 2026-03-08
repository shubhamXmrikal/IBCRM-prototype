"use client"

import * as React from "react"
import { Command } from "cmdk"
import { 
  Search, 
  CreditCard, 
  PhoneCall, 
  Ticket, 
  Zap, 
  UserPlus, 
  Wrench,
  Clock,
  Package
} from "lucide-react"
import { useAgentStore } from "../../../store/useAgentStore"
import { cn } from "../../../lib/utils"

interface CommandPaletteProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const { setActiveActionDrawer, theme } = useAgentStore();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Palette"
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] max-w-[90vw] glass-card rounded-2xl p-2 z-[100] outline-none animate-in fade-in zoom-in duration-200 transition-colors duration-500",
        theme === 'dark' ? "text-slate-200" : "text-slate-900"
      )}
    >
      <div className={cn(
        "flex items-center border-b px-3 pb-2 mb-2",
        theme === 'dark' ? "border-white/10" : "border-slate-200"
      )}>
        <Search className="mr-2 h-4 w-4 text-slate-400 shrink-0" />
        <Command.Input
          placeholder="Type a command or search (e.g., 'recharge', 'last calls', 'raise ticket')..."
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 w-full"
        />
      </div>
      <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden px-2 pb-2 scrollbar-hide">
        <Command.Empty className="py-6 text-center text-sm text-slate-500">
          No actions found.
        </Command.Empty>

        <Command.Group heading="Frequently Used" className="text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-2">
          <CommandItem icon={Zap} label="Recharge Account" shortcut="⌘ R" onSelect={() => {}} />
          <CommandItem icon={Ticket} label="Raise Technical Call" shortcut="⌘ T" onSelect={() => setActiveActionDrawer('TROUBLESHOOTING')} />
          <CommandItem icon={CreditCard} label="View Statement of Account" shortcut="⌘ S" onSelect={() => setActiveActionDrawer('SOA')} />
        </Command.Group>

        <Command.Group heading="Subscriber Actions" className="text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-2">
          <CommandItem icon={Package} label="Package Management" onSelect={() => setActiveActionDrawer('PACKAGE_TOOL')} />
          <CommandItem icon={UserPlus} label="Update Contact Details" onSelect={() => setActiveActionDrawer('CONTACT_UPDATE')} />
          <CommandItem icon={Wrench} label="Swap Set-Top Box" />
          <CommandItem icon={Clock} label="Schedule Temporary Deactivation" />
        </Command.Group>

        <Command.Group heading="History & Search" className="text-xxs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-2">
          <CommandItem icon={PhoneCall} label="View Last 5 Interactions" onSelect={() => setActiveActionDrawer('COMPLAINTS')} />
          <CommandItem icon={Search} label="Global Subscriber Search" shortcut="⌘ F" />
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}

function CommandItem({ icon: Icon, label, shortcut, onSelect }: { icon: any, label: string, shortcut?: string, onSelect?: () => void }) {
  return (
    <Command.Item 
      onSelect={onSelect}
      className="group flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none aria-selected:bg-orange-600/20 aria-selected:text-orange-500 transition-colors"
    >
      <Icon className="mr-3 h-4 w-4 text-slate-400 group-aria-selected:text-orange-500" />
      <span>{label}</span>
      {shortcut && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-slate-500 group-aria-selected:text-orange-500/50">
          {shortcut}
        </kbd>
      )}
    </Command.Item>
  )
}
