"use client"

import * as React from "react"
import { buildClassNames } from "@utils/classnames";
import { PanelLeft } from "lucide-react"
import { Input } from "@components/ui/input"
import { useLiveAPIContext } from "@contexts/LiveAPIContext"
import { useLoggerStore } from "../../../../../voice-ai-lib/store-logger";
import Logger from "../logger/Logger";
import { PdfUploader } from './PdfUploader';

// Constants
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_COLLAPSED = "3rem"

// Context type and creation
interface SidebarContext {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

// Custom hook for accessing sidebar context
export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Add this custom hook at the top level with other hooks
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

// Main Sidebar component
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function Sidebar({ children, className, ...props }: SidebarProps) {
  // State management
  const isSmallScreen = useMediaQuery('(max-width: 768px)') // Adjust breakpoint as needed
  const [collapsed, setCollapsed] = React.useState(isSmallScreen)
  const [textInput, setTextInput] = React.useState("")
  const [pdfContext, setPdfContext] = React.useState<string | null>(null)
  
  // Contexts and refs
  const { connected, client } = useLiveAPIContext()
  const loggerRef = React.useRef<HTMLDivElement>(null)
  const { log, logs } = useLoggerStore()

  // Effects
  React.useEffect(() => {
    // Auto-scroll logger to bottom when new logs arrive
    if (loggerRef.current) {
      const el = loggerRef.current
      el.scrollTop = el.scrollHeight
    }
  }, [logs])

  React.useEffect(() => {
    // Set up log event listeners
    client.on("log", log)
    return () => {
      client.off("log", log)
    }
  }, [client, log])

  // Add this effect to update collapsed state when screen size changes
  React.useEffect(() => {
    setCollapsed(isSmallScreen)
  }, [isSmallScreen])

  // Event handlers
  const handlePdfUpload = React.useCallback((pdfContent: string) => {
    setPdfContext(pdfContent)
    
    // Send initial context to the model
    client.send([{
      text: `I have uploaded a PDF document. Here's its content:\n${pdfContent}`
    }])
  }, [client])

  const handleSubmit = () => {
    if (textInput.trim()) {
      client.send([{ 
        text: pdfContext 
          ? `Context from PDF:\n${pdfContext}\n\nUser message:\n${textInput}`
          : textInput 
      }])
      setTextInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div
        className={buildClassNames(
          "h-full flex-shrink-0 flex flex-col border-r border-white/40 bg-black/95 transition-all duration-300",
          collapsed ? "w-[3rem]" : "w-[16rem]",
          "fixed md:relative left-0 top-0 z-20",
          className
        )}
        {...props}
      >
        <div className="flex h-10 items-center border-b border-white/40 px-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-cyan-200 hover:bg-neutral-800 hover:text-cyan-100"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
          {!collapsed && (
            <div className={buildClassNames("streaming-indicator ml-2 text-xs", connected ? "connected" : "disconnected")}>
              <span className="text-neutral-200">
                {connected ? "Streaming" : "Paused"}
              </span>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <>
            <div 
              className="flex-1 overflow-auto p-1.5 text-xs" 
              ref={loggerRef}
              style={{
                fontSize: '11px',
                lineHeight: '1.3'
              }}
            >
              <Logger filter="none" />
            </div>
            
            <div className={buildClassNames(
                "flex flex-col gap-2 p-1.5",
                !connected ? "opacity-50 pointer-events-none" : ""
              )}
            >
              <PdfUploader onPdfUpload={handlePdfUpload} />
              <div className="relative">
                <Input
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask your questions here..."
                  rows={3}
                  className="text-white"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </SidebarContext.Provider>
  )
}

// Helper components
export function SidebarSection({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={buildClassNames("px-2 py-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarItem({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar()
  
  return (
    <div
      className={buildClassNames(
        "flex items-center rounded-md px-2 py-2 text-neutral-200 hover:bg-neutral-800 hover:text-cyan-200 transition-colors",
        collapsed ? "justify-center" : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
