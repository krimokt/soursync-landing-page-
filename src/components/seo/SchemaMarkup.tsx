export function SchemaMarkup() {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SourSync",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "All-in-one sourcing management platform for sourcing agents. Manage quotations, orders, shipping tracking, payments, and client portals.",
    "url": "https://soursync.com",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "27",
      "bestRating": "5"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter Plan",
        "price": "25",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/PreOrder",
        "description": "Best for new or solo agents who want a professional system instead of WhatsApp + Excel"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "59",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/PreOrder",
        "description": "Full sourcing management platform for agents and small teams"
      },
      {
        "@type": "Offer",
        "name": "Agency Plan",
        "price": "199",
        "priceCurrency": "USD",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/PreOrder",
        "description": "White-label sourcing platform for agencies"
      }
    ]
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SourSync",
    "url": "https://soursync.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://soursync.com/soursync-logo-dark.png",
      "width": 200,
      "height": 60
    },
    "description": "Professional sourcing management software for sourcing agents and import/export businesses",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@soursync.com",
      "contactType": "customer support"
    },
    "sameAs": [
      "https://linkedin.com/company/soursync"
    ]
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SourSync",
    "url": "https://soursync.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://soursync.com/blog/en?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is SourSync?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SourSync is an all-in-one sourcing agent software that helps you manage client inquiries, product sourcing, quotations, orders, shipping, and payments in one system with a professional client portal."
        }
      },
      {
        "@type": "Question",
        "name": "Who should use SourSync?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SourSync is built for China sourcing agents, import/export agents, trading offices, and small teams that want to replace WhatsApp + Excel with a structured dashboard and a client-facing portal."
        }
      },
      {
        "@type": "Question",
        "name": "Does SourSync include a client portal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Each client gets a secure login to a client portal where they can view quotations, order progress, shipping updates, and payment status."
        }
      },
      {
        "@type": "Question",
        "name": "How much does SourSync cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SourSync offers a Pro Plan at $59/month (with a founding offer of $25/month for the first 3 months) and an Agency Plan at $199/month. A 14-day free trial is available."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free trial?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SourSync offers a 14-day free trial for the Pro plan with no credit card required."
        }
      }
    ]
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://soursync.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
