import type { Metadata } from 'next';

export interface NavItem {
    icon?: string
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
}


interface SiteConfig {
    name: string
    description: string
    mainNav: NavItem[]
    links: {}
    footer: {
        about: {
            title: string
            description: string
        }
        utilities: {
            title: string
            links: NavItem[]
        }
        externalLinks: {
            title: string
            links: NavItem[]
        }
        contact: {
            title: string
            address: string
            phone: string
            email: string
        }
    }
}

export const getConfigFromEnv = () => {
    const config = {
        env: process.env.NEXT_PUBLIC_ENV || "",
        tenant: process.env.NEXT_PUBLIC_TENANT || "",
        isProd: process.env.NEXT_PUBLIC_ENV === "prod",
        keys: {
            google: {
                gToken: process.env[`NEXT_PUBLIC_GACAPTCHA`] || "",
            },
        },
    }

    return config
}

export const siteConfig: SiteConfig = {
    name: "Lakshadweep Tourism",
    description: "Lakshadweep Tourism",
    mainNav: [],
    links: {},
    footer: {
        about: {
            title: "About Us",
            description:
                "Lakshadweep Tourism is a tourism company based in Lakshadweep Island, India. We offer a range of services including hotel bookings, cruise bookings, and other tourism-related activities.",
        },
        utilities: {
            title: "Utilities",
            links: [],
        },
        externalLinks: {
            title: "External Links",
            links: [],
        },
        contact: {
            title: "Get in touch",
            address: "Garhwal Mandal Vikas Nigam Ltd., 74/1, Rajpur Road, Dehradun 248001",
            phone: "0135-2746817, 2749308, 9568006639",
            email: "heligmvn[at]gmail[dot]com",
        },
    },
}


export const metaConfig: Metadata = {
    title: "Lakshadweep Tourism",
    description:
        "Lakshadweep Tourism is a tourism company based in Lakshadweep Island, India. We offer a range of services including hotel bookings, cruise bookings, and other tourism-related activities.",
    keywords:
        "Lakshadweep Tourism, Lakshadweep Tourism, Tourism, Tourism in Lakshadweep, Lakshadweep Tourism",
    icons: "https://neon.ipsator.com/c/image/upload/v1698215170/irctc/icons/irctc-favicon.ico",
    publisher: "Ipsator",
    robots: "index, follow",
    themeColor: "light",
    other: {
        author: "Ipsator",
        "google-site-verification": "QiJ1ugBv6GoNJC3ukt_5ssDeXEu-rRbC1AHFJufjp0o",
    },
    // url: "https://heliyatra.irctc.co.in",
}

export const LakshdweepInfo = {
  text: "Book safe, official passenger ferries to every island in minutes.",
}