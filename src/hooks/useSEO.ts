import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SITE_NAME = "Evolve 2 Purpose";
export const BASE_URL = "https://evolve2purpose.com";
export const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/255f801d-7682-4f2b-894f-a92eb8be2585/id-preview-6e5b844a--78b9cfc3-6a84-4d5e-9f35-91efe17597b8.lovable.app-1771273688901.png";
export const TWITTER_HANDLE = "@evolve2purpose";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  schema?: Record<string, unknown> | Record<string, unknown>[];
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

// --- Base schemas available to every page ---

export const WEBSITE_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  description:
    "Life transformation coaching, purpose activation, and healing programs for women — founded by Sarah Adams.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const ORGANIZATION_SCHEMA: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#organization`,
  name: SITE_NAME,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  description:
    "Evolve 2 Purpose is a personal development coaching practice founded by Sarah Adams. We help women break generational cycles, heal their roots, and step fully into a life of love, accountability, and purpose.",
  founder: {
    "@type": "Person",
    name: "Sarah Adams",
    jobTitle: "Certified Life & Transformation Coach",
    url: `${BASE_URL}/about`,
  },
  serviceType: [
    "Life Coaching",
    "Purpose Coaching",
    "Transformation Coaching",
    "Healing Coaching",
    "Speaking Engagements",
  ],
  areaServed: "Worldwide",
  sameAs: [
    "https://instagram.com/evolve2purpose",
    "https://facebook.com/evolve2purpose",
    "https://youtube.com/@evolve2purpose",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "500",
  },
};

// --- The hook ---

const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema,
  noindex = false,
}: SEOConfig) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = canonical ?? `${BASE_URL}${pathname}`;

    // Document title
    document.title = fullTitle;

    // Core meta
    setMeta("name", "description", description);
    if (keywords) setMeta("name", "keywords", keywords);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("name", "author", "Sarah Adams — Evolve 2 Purpose");

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_US");

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);
    setMeta("name", "twitter:site", TWITTER_HANDLE);

    // Base schemas (WebSite + Organization) — always present
    setSchemaScript("ld-base-website", WEBSITE_SCHEMA);
    setSchemaScript("ld-base-org", ORGANIZATION_SCHEMA);

    // Page-specific schemas
    if (schema) {
      const list = Array.isArray(schema) ? schema : [schema];
      list.forEach((s, i) => setSchemaScript(`ld-page-${i}`, s));
      return () => {
        list.forEach((_, i) => removeSchemaScript(`ld-page-${i}`));
        document.title = SITE_NAME;
      };
    }

    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description, keywords, canonical, ogImage, ogType, noindex, pathname]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useSEO;
