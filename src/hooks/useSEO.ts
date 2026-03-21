import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SITE_NAME = "Evolve 2 Purpose";
export const BASE_URL = "https://evolve2purpose.com";
export const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/H8AneifdGjQ2j40rrjWnVOC9h2S2/social-images/social-1772758406705-Screenshot_2026-03-05_at_6.52.46_PM.webp";
export const TWITTER_HANDLE = "@evolve2purpose";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article" | "product";
  schema?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
}

// --- DOM helpers ---

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setSchemaScript(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data, null, 0);
}

function removeSchemaScript(id: string) {
  document.getElementById(id)?.remove();
}

// --- Shared entity: Sarah Adams (Person) ---

export const SARAH_PERSON_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#sarah-adams`,
  name: "Sarah Adams",
  givenName: "Sarah",
  familyName: "Adams",
  url: `${BASE_URL}/about`,
  image: DEFAULT_OG_IMAGE,
  jobTitle: "Christian Counselor, Prophetess & Transformation Coach",
  description:
    "Sarah Adams is a Christian counselor, prophetess, seer, transformation coach, and internationally recognized speaker. She is the founder of Evolve 2 Purpose — a faith-based healing movement dedicated to helping women break generational cycles, heal their roots, and walk fully in their God-given purpose.",
  knowsAbout: [
    "Generational Cycle Breaking",
    "Trauma-Informed Healing",
    "Life Transformation Coaching",
    "Christian Counseling",
    "Purpose Activation",
    "Emotional Trigger Management",
    "Accountability Coaching",
    "Women's Empowerment",
    "Spiritual Healing and Prophetic Ministry",
    "Healing from Abandonment and Betrayal",
    "Breaking Toxic Relationship Patterns",
    "Faith-Based Identity Restoration",
  ],
  worksFor: {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Evolve 2 Purpose",
    url: BASE_URL,
  },
  founder: {
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Evolve 2 Purpose",
    url: BASE_URL,
  },
  sameAs: [
    "https://instagram.com/evolve2purpose",
    "https://facebook.com/evolve2purpose",
    "https://youtube.com/@evolve2purpose",
  ],
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Life Transformation Coach",
      occupationLocation: { "@type": "AdministrativeArea", name: "Worldwide" },
      skills: "Trauma healing, generational cycle breaking, purpose activation, accountability coaching",
    },
    {
      "@type": "Occupation",
      name: "Inspirational Speaker",
      occupationLocation: { "@type": "AdministrativeArea", name: "Worldwide" },
      skills: "Women's conferences, church events, corporate retreats, healing intensives",
    },
  ],
  performerIn: {
    "@type": "Event",
    name: "Women's Healing & Purpose Conference",
    description: "Live speaking engagements, healing intensives, and women's conferences led by Sarah Adams.",
  },
};

// --- Base schemas ---

export const WEBSITE_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: SITE_NAME,
  url: BASE_URL,
  description:
    "Life transformation coaching, purpose activation, and healing programs for women — founded by Sarah Adams.",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const ORGANIZATION_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "Organization"],
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Evolve 2 Purpose",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${BASE_URL}/#logo`,
    url: `${BASE_URL}/logo.png`,
    contentUrl: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
    caption: "Evolve 2 Purpose",
  },
  image: DEFAULT_OG_IMAGE,
  description:
    "Evolve 2 Purpose is a faith-based personal development coaching practice founded by Sarah Adams. We help women break generational cycles, heal their roots, and step fully into a life of love, accountability, and purpose through the proven 4-Step Transformation Framework.",
  slogan: "Break cycles. Heal your roots. Step into purpose.",
  founder: { "@id": `${BASE_URL}/#sarah-adams` },
  employee: { "@id": `${BASE_URL}/#sarah-adams` },
  serviceType: [
    "Life Coaching",
    "Purpose Coaching",
    "Transformation Coaching",
    "Healing Coaching",
    "Christian Counseling",
    "Speaking Engagements",
    "Group Coaching Programs",
    "Online Community for Women",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Coaching Programs & Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "1:1 Deep-Dive Coaching",
          description: "Private, personalized life transformation coaching with Sarah Adams.",
          provider: { "@id": `${BASE_URL}/#organization` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Evolve 2 Purpose Group Program",
          description: "8-week guided transformation journey walking the full 4-Step Framework in a powerful group setting.",
          offers: {
            "@type": "Offer",
            price: "497",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          provider: { "@id": `${BASE_URL}/#organization` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Purpose Clarity Session",
          description: "90-minute breakthrough intensive to get rapid clarity and your personalized action plan.",
          offers: {
            "@type": "Offer",
            price: "197",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          provider: { "@id": `${BASE_URL}/#organization` },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Healing Intensive Weekend",
          description: "Deep-dive weekend retreat for accelerated healing and breakthrough.",
          provider: { "@id": `${BASE_URL}/#organization` },
        },
      },
    ],
  },
  areaServed: { "@type": "Place", name: "Worldwide" },
  knowsAbout: [
    "Generational Cycle Breaking",
    "Trauma Healing",
    "Purpose Coaching",
    "Emotional Trigger Management",
    "Accountability Coaching",
    "Christian Counseling",
    "Women's Empowerment",
    "Spiritual Healing",
    "Life Transformation",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "hello@evolve2purpose.com",
    availableLanguage: "English",
    areaServed: "Worldwide",
  },
  sameAs: [
    "https://instagram.com/evolve2purpose",
    "https://facebook.com/evolve2purpose",
    "https://youtube.com/@evolve2purpose",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "500",
    reviewCount: "500",
  },
};

// --- BreadcrumbList builder ---

function buildBreadcrumb(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${BASE_URL}${item.url}`,
      })),
    ],
  };
}

// --- The hook ---

const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  ogType = "website",
  schema,
  breadcrumbs,
  noindex = false,
}: SEOConfig) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = canonical ?? `${BASE_URL}${pathname}`;
    const imageAlt = ogImageAlt ?? `${title} — ${SITE_NAME}`;

    // Document title
    document.title = fullTitle;

    // Core meta
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
    setMeta("name", "author", "Sarah Adams — Evolve 2 Purpose");

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:alt", imageAlt);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_US");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:image:alt", imageAlt);
    setMeta("name", "twitter:site", TWITTER_HANDLE);
    setMeta("name", "twitter:creator", TWITTER_HANDLE);

    // Base schemas — always present on every page
    setSchemaScript("ld-base-website", WEBSITE_SCHEMA);
    setSchemaScript("ld-base-org", ORGANIZATION_SCHEMA);
    setSchemaScript("ld-base-person", SARAH_PERSON_SCHEMA);

    // Page-specific schemas + breadcrumbs
    const allPageSchemas: Record<string, unknown>[] = [
      ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
      ...(breadcrumbs ? [buildBreadcrumb(breadcrumbs)] : []),
    ];

    if (allPageSchemas.length > 0) {
      allPageSchemas.forEach((s, i) => setSchemaScript(`ld-page-${i}`, s));
      return () => {
        allPageSchemas.forEach((_, i) => removeSchemaScript(`ld-page-${i}`));
        document.title = SITE_NAME;
      };
    }

    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description, keywords, canonical, ogImage, ogImageAlt, ogType, noindex, pathname]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSEO;
