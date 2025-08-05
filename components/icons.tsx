import {
    CalendarCheck,
    CheckCircle,
    FileSpreadsheet,
    Globe,
    HelpCircle,
    Home,
    Laptop,
    ListChecks,
    LogIn,
    LucideProps,
    Menu,
    MinusCircle,
    Moon,
    Newspaper,
    Plane,
    PlusCircle,
    Pointer,
    Sailboat,
    Search,
    Send,
    Settings2,
    SunMedium,
    Twitter,
    User,
    type Icon as LucideIcon,
  } from "lucide-react"
  
  import { cn } from "@/lib/utils"
  
  export type Icon = LucideIcon
  
  // https://lucide.dev/?search=
  export const Icons = {
    sun: SunMedium,
    moon: Moon,
    laptop: Laptop,
    twitter: Twitter,
    globe: Globe,
    plane: Plane,
    send: Send,
    user: User,
    home: Home,
    menu: Menu,
    pointer: Pointer,
    setting: Settings2,
    delete: MinusCircle,
    add: PlusCircle,
    check: CalendarCheck,
    check2: CheckCircle,
    fees: Newspaper,
    sailboat: Sailboat,
    "help-circle": HelpCircle,
    "list-checks": ListChecks,
    "file-spreadsheet": FileSpreadsheet,
  
    circleUser: (
      props: LucideProps // old User,
    ) => (
      <span className={cn("rounded-full border-2 border-slate-600 group-hover:border-slate-900", props.className)}>
        <User size={18} />
      </span>
    ),
    login: LogIn,
    search: Search,
    flightSeat: ({ fill = "#475569" }) => (
      <svg width="22" height="22" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g mask="url(#mask0_2749_4189)">
          <path
            d="M9.33398 8.9668C8.96732 8.9668 8.65343 8.83624 8.39232 8.57513C8.13121 8.31402 8.00065 8.00013 8.00065 7.63346V4.30013C8.00065 3.93346 8.13121 3.61957 8.39232 3.35846C8.65343 3.09735 8.96732 2.9668 9.33398 2.9668H10.6673C11.034 2.9668 11.3479 3.09735 11.609 3.35846C11.8701 3.61957 12.0007 3.93346 12.0007 4.30013V7.63346C12.0007 8.00013 11.8701 8.31402 11.609 8.57513C11.3479 8.83624 11.034 8.9668 10.6673 8.9668H9.33398ZM9.33398 7.63346H10.6673V4.30013H9.33398V7.63346ZM6.33398 12.3001C6.03398 12.3001 5.76732 12.214 5.53398 12.0418C5.30065 11.8696 5.13954 11.639 5.05065 11.3501L3.33398 5.63346V2.9668H4.66732V5.63346L6.33398 10.9668H12.0007V12.3001H6.33398ZM5.33398 14.3001V12.9668H12.0007V14.3001H5.33398Z"
            fill={fill}
          />
        </g>
      </svg>
    ),
    logo: (
      props: LucideProps // old Heading,
    ) => (
      <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlSpace="preserve" {...props}>
        <style>{".st2{fill:#4f5d73}.st6{opacity:.2;fill:#231f20}"}</style>
        <circle
          cx={32}
          cy={32}
          r={32}
          style={{
            fill: "#e0995e",
          }}
        />
        <path className="st2" d="M44 54H30c-1.1 0-2-.9-2-2s.9-2 2-2h14c1.1 0 2 .9 2 2s-.9 2-2 2z" />
        <g
          style={{
            opacity: 0.2,
          }}
        >
          <path
            d="M50 20H22c-1.1 0-2-.9-2-2s.9-2 2-2h28c1.1 0 2 .9 2 2s-.9 2-2 2z"
            style={{
              fill: "#231f20",
            }}
          />
        </g>
        <path
          style={{
            fill: "#4f5d73",
            stroke: "#fff",
            strokeWidth: 3,
            strokeLinecap: "round",
            strokeMiterlimit: 10,
          }}
          d="M50 16.5H22"
        />
        <path
          className="st6"
          d="M37 25.5c0-.5 0-1 .1-1.5H37c-3.9 0-7.4 1.5-10 3.9-.4.4-1.3 1.1-2.6 1.1-3.1 0-14.4-3.6-14.4 0 0 3 2 3.9 2 3.9l8.6 4.1s1.4.7 1.4 2c0 8.3 6.7 11 15 11 7.3 0 14.1-2.6 14.7-10.1C43.4 39 37 34 37 25.5z"
        />
        <path
          className="st2"
          d="M37 23.5c0-.5 0-1 .1-1.5H37c-3.9 0-7.4 1.5-10 3.9-.4.4-1.3 1.1-2.6 1.1H10l2 3.9 8.6 4.1s1.4.7 1.4 2c0 8.3 6.7 11 15 11 7.3 0 13.4-1.2 14.7-8.1C43.4 39 37 32 37 23.5z"
        />
        <path className="st6" d="M13 27c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1m0-4c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z" />
        <path
          d="M13 24c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0-3c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"
          style={{
            fill: "#fff",
          }}
        />
        <path
          d="M37.1 22c0 .5-.1 1-.1 1.5C37 32 43.4 39 51.7 39.9c.2-.9.3-1.9.3-2.9 0-8.3-6.7-15-14.9-15z"
          style={{
            fill: "#e0e0d1",
          }}
        />
      </svg>
    ),
  }
  