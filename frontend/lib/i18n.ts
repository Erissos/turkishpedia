export type Locale = "tr" | "en";

export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

type Dictionary = {
  site: {
    title: string;
    description: string;
  };
  header: {
    siteTitle: string;
    tagline: string;
    menu: {
      label: string;
      login: string;
      becomeEditor: string;
      archive: string;
      profile: string;
      open: string;
      close: string;
      logout: string;
    };
    nav: {
      articles: string;
      cities: string;
      routes: string;
      search: string;
      profile: string;
    };
    admin: string;
    cta: string;
  };
  footer: {
    headline: string;
    description: string;
    sections: Array<{ title: string; links: Array<{ label: string; href: string }> }>;
    legal: string;
  };
  common: {
    explore: string;
  };
  landing: {
    hero: {
      badge: string;
      title: string;
      titleEmphasis: string;
      subtitle: string;
      searchPlaceholder: string;
      cta: string;
      stats: Array<{ value: string; label: string }>;
      imageSrc: string;
      imageAlt: string;
    };
    categories: {
      label: string;
      headline: string;
      actionLabel: string;
      items: Array<{ title: string; desc: string; icon: string; href: string }>;
    };
    featured: {
      title: string;
      heading: string;
      body: string;
      cta: string;
      href: string;
    };
    weeklyRoute: {
      title: string;
      badge: string;
      heading: string;
      body: string;
      cta: string;
      href: string;
      imageSrc: string;
      imageAlt: string;
    };
  };
  search: {
    hero: {
      label: string;
      title: string;
      subtitle: string;
      imageSrc: string;
      imageAlt: string;
    };
    title: string;
    subtitle: string;
    placeholder: string;
  };
  routes: {
    hero: {
      label: string;
      title: string;
      subtitle: string;
      imageSrc: string;
      imageAlt: string;
    };
    title: string;
    subtitle: string;
    items: Array<{ title: string; summary: string; href: string }>;
  };
  profile: {
    hero: {
      label: string;
      title: string;
      subtitle: string;
      imageSrc: string;
      imageAlt: string;
    };
    title: string;
    subtitle: string;
    body: string;
  };
  admin: {
    hero: {
      label: string;
      title: string;
      subtitle: string;
      imageSrc: string;
      imageAlt: string;
    };
    title: string;
    subtitle: string;
    body: string;
  };
  article: {
    hero: {
      label: string;
      title: string;
      subtitle: string;
      imageSrc: string;
      imageAlt: string;
    };
    title: string;
    subtitle: string;
    heading: string;
    body: string;
  };
  category: {
    hero: {
      label: string;
      title: string;
      subtitle: string;
      imageSrc: string;
      imageAlt: string;
    };
    title: string;
    subtitle: string;
    body: string;
  };
  city: {
    hero: {
      label: string;
      title: string;
      subtitle: string;
      imageSrc: string;
      imageAlt: string;
    };
    title: string;
    subtitle: string;
    body: string;
  };
  publicProfile: {
    hero: {
      label: string;
      subtitle: string;
      imageSrc: string;
      imageAlt: string;
    };
    sections: {
      basics: string;
      contact: string;
      details: string;
      stats: string;
    };
    labels: {
      username: string;
      displayName: string;
      fullName: string;
      email: string;
      phoneNumber: string;
      birthDate: string;
      age: string;
      gender: string;
      currentLocation: string;
      birthPlace: string;
      religion: string;
      educationLevel: string;
      occupation: string;
      jobTitle: string;
      membershipDate: string;
      followers: string;
      following: string;
    };
    empty: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  tr: {
    site: {
      title: "Turkishpedia",
      description: "Türk kültürünü, tarihi ve rotaları bir araya getiren bilgi ve seyahat platformu.",
    },
    header: {
      siteTitle: "Turkishpedia",
      tagline: "Dijital Arşiv",
      menu: {
        label: "Hesap",
        login: "Giriş Yap",
        becomeEditor: "Editör Ol",
        archive: "Arşive Gir",
        profile: "Profil",
        open: "Menü",
        close: "Kapat",
        logout: "Çıkış Yap",
      },
      nav: {
        articles: "Makaleler",
        cities: "Şehirler",
        routes: "Rotalar",
        search: "Ara",
        profile: "Profil",
      },
      admin: "Yönetim",
      cta: "Arşive Gir",
    },
    footer: {
      headline: "Dijital arşiv, canlı keşif.",
      description:
        "Türk kültürünü, tarihi ve rotaları; doğrulanmış içerik, yerel hikayeler ve keşif odaklı yolculuklarla bir araya getiriyoruz.",
      sections: [
        {
          title: "Arşiv",
          links: [
            { label: "Makaleler", href: "/articles/featured" },
            { label: "Şehirler", href: "/cities/featured" },
            { label: "Rotalar", href: "/routes" },
          ],
        },
        {
          title: "Keşif",
          links: [
            { label: "Ara", href: "/search" },
            { label: "Öne Çıkanlar", href: "/articles/featured" },
            { label: "Rota Planlayıcı", href: "/routes" },
          ],
        },
        {
          title: "Hesap",
          links: [
            { label: "Profil", href: "/profile" },
            { label: "Yönetim", href: "/admin" },
          ],
        },
      ],
      legal: "Tüm hakları saklıdır.",
    },
    common: {
      explore: "Keşfet",
    },
    landing: {
      hero: {
        badge: "Türkiye'nin Yaşayan Dijital Belleği",
        title: "Geçmişi Bil,",
        titleEmphasis: "Geleceği Keşfet.",
        subtitle: "Tarihten kültüre, dilden yerel rotalara kadar Türk mirasını keşfedin.",
        searchPlaceholder: "Göktürk Yazıtları, Likya Yolu veya Mimar Sinan...",
        cta: "Keşfet",
        stats: [
          { value: "50K+", label: "Madde" },
          { value: "1.2K+", label: "Rota" },
          { value: "24/7", label: "Güncel" },
        ],
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      categories: {
        label: "Kategoriler",
        headline: "Bilgiye ulaşmanın en estetik yolu.",
        actionLabel: "Tüm Arşive Göz At",
        items: [
          { title: "Tarih", desc: "Destanlardan Cumhuriyet'e", icon: "🏛️", href: "/categories" },
          { title: "Kültür", desc: "Sanat, Folklor ve Mutfak", icon: "🏺", href: "/categories" },
          { title: "Dil", desc: "Lehçeler ve Edebiyat", icon: "📜", href: "/categories" },
          { title: "Şehirler", desc: "81 İlin Hikayesi", icon: "🏙️", href: "/cities/featured" },
          { title: "Rotalar", desc: "Adım Adım Keşif", icon: "🗺️", href: "/routes" },
        ],
      },
      featured: {
        title: "Günün Maddesi",
        heading: "Orhun Yazıtları",
        body:
          "Türk adının geçtiği ilk yazılı metinler olan Orhun Yazıtları, 8. yüzyılda Göktürk Kağanlığı tarafından dikilmiştir. Kültigin, Bilge Kağan ve Tonyukuk adına dikilen bu taşlar...",
        cta: "Devamını Oku",
        href: "/articles/featured",
      },
      weeklyRoute: {
        title: "Haftalık Rota",
        badge: "Kültür Turu",
        heading: "Likya Yolu: Tarihle İç İçe",
        body:
          "Fethiye'den Antalya'ya uzanan, antik kentlerin gölgesinde bir yürüyüş macerası.",
        cta: "Rotayı İncele",
        href: "/routes",
        imageSrc: "/images/route-lycia.jpg",
        imageAlt: "Likya Yolu",
      },
    },
    search: {
      hero: {
        label: "Arama",
        title: "Arşivde Ara",
        subtitle: "Makale, şehir ve rotalar arasında anında keşif yapın.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      title: "Arama",
      subtitle: "Makaleleri, şehirleri ve rotaları keşfedin",
      placeholder: "Turkishpedia genelinde ara",
    },
    routes: {
      hero: {
        label: "Rotalar",
        title: "Kültür ve Keşif Rotaları",
        subtitle: "Yerel hikayelerle şekillenen yolculuk planları.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      title: "Rota Planlayıcı",
      subtitle: "Çok günlük gezi planları oluşturun",
      items: [
        { title: "Ege Sahilleri", summary: "Mavi koylar ve antik liman kentleri.", href: "/routes/aegean-coastline" },
        { title: "İpek Yolu Mirası", summary: "Pazarlar, kervansaraylar ve hikayeler.", href: "/routes/silk-road-heritage" },
      ],
    },
    profile: {
      hero: {
        label: "Profil",
        title: "Kişisel Arşivin",
        subtitle: "Katkılarını, favorilerini ve iz bıraktığın içerikleri takip et.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      title: "Profil",
      subtitle: "Katkılarınızı ve kayıtlarınızı yönetin",
      body: "Profil detayları ve etkinlikler burada görüntülenecek.",
    },
    admin: {
      hero: {
        label: "Yönetim",
        title: "Editoryal Merkez",
        subtitle: "Kalite, doğrulama ve yayın akışı burada yönetilir.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      title: "Yönetim Paneli",
      subtitle: "Moderasyon ve editoryal araçlar",
      body: "Yönetim araçları API ile bağlanacak.",
    },
    article: {
      hero: {
        label: "Makale",
        title: "Bilgi Katmanları",
        subtitle: "Editoryal onaydan geçmiş içeriklere odaklanın.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      title: "Makale",
      subtitle: "Editörden geçmiş bilgi girdisi",
      heading: "Makale başlığı yer tutucusu",
      body: "Markdown içerik, API temelli içerik hattı ile burada gösterilecek.",
    },
    category: {
      hero: {
        label: "Kategori",
        title: "Tematik Arşiv",
        subtitle: "İlgi alanına göre filtrelenmiş içerikler.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      title: "Kategori",
      subtitle: "Makaleleri temaya göre inceleyin",
      body: "Kategori listesi API üzerinden doldurulacak.",
    },
    city: {
      hero: {
        label: "Şehir",
        title: "Şehir Profili",
        subtitle: "Yerel kültür, tarih ve keşif noktaları.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      title: "Şehir",
      subtitle: "Turizm rehberi ve yerel içgörüler",
      body: "Şehir özeti, harita ve mekanlar burada gösterilecek.",
    },
    publicProfile: {
      hero: {
        label: "Profil",
        subtitle: "Kullanıcının paylaştığı bilgiler ve istatistikler.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anadolu",
      },
      sections: {
        basics: "Temel Bilgiler",
        contact: "İletişim",
        details: "Kişisel Detaylar",
        stats: "İstatistikler",
      },
      labels: {
        username: "Kullanıcı adı",
        displayName: "Görünen ad",
        fullName: "Ad soyad",
        email: "E-posta",
        phoneNumber: "Telefon",
        birthDate: "Doğum tarihi",
        age: "Yaş",
        gender: "Cinsiyet",
        currentLocation: "Yaşadığı yer",
        birthPlace: "Doğduğu yer",
        religion: "Din",
        educationLevel: "Eğitim",
        occupation: "Meslek",
        jobTitle: "İş",
        membershipDate: "Üyelik tarihi",
        followers: "Takipçi",
        following: "Takip edilen",
      },
      empty: "Bu bilgi paylaşılmıyor.",
    },
  },
  en: {
    site: {
      title: "Turkishpedia",
      description: "A knowledge and travel platform for Turkish culture and history.",
    },
    header: {
      siteTitle: "Turkishpedia",
      tagline: "Digital Archive",
      menu: {
        label: "Account",
        login: "Sign In",
        becomeEditor: "Become an Editor",
        archive: "Enter Archive",
        profile: "Profile",
        open: "Menu",
        close: "Close",
        logout: "Sign Out",
      },
      nav: {
        articles: "Articles",
        cities: "Cities",
        routes: "Routes",
        search: "Search",
        profile: "Profile",
      },
      admin: "Admin",
      cta: "Enter Archive",
    },
    footer: {
      headline: "A living archive for modern discovery.",
      description:
        "We connect Turkish culture, history, and routes through verified knowledge, local narratives, and discovery-led journeys.",
      sections: [
        {
          title: "Archive",
          links: [
            { label: "Articles", href: "/articles/featured" },
            { label: "Cities", href: "/cities/featured" },
            { label: "Routes", href: "/routes" },
          ],
        },
        {
          title: "Explore",
          links: [
            { label: "Search", href: "/search" },
            { label: "Highlights", href: "/articles/featured" },
            { label: "Route Planner", href: "/routes" },
          ],
        },
        {
          title: "Account",
          links: [
            { label: "Profile", href: "/profile" },
            { label: "Admin", href: "/admin" },
          ],
        },
      ],
      legal: "All rights reserved.",
    },
    common: {
      explore: "Explore",
    },
    landing: {
      hero: {
        badge: "Turkey's Living Digital Memory",
        title: "Know the Past,",
        titleEmphasis: "Discover the Future.",
        subtitle: "Explore Turkish heritage from history and culture to language and local routes.",
        searchPlaceholder: "Orkhon Inscriptions, Lycian Way, or Mimar Sinan...",
        cta: "Explore",
        stats: [
          { value: "50K+", label: "Entries" },
          { value: "1.2K+", label: "Routes" },
          { value: "24/7", label: "Updated" },
        ],
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      categories: {
        label: "Categories",
        headline: "The most elegant path to knowledge.",
        actionLabel: "Browse the Archive",
        items: [
          { title: "History", desc: "From epics to the Republic", icon: "🏛️", href: "/categories" },
          { title: "Culture", desc: "Art, folklore, and cuisine", icon: "🏺", href: "/categories" },
          { title: "Language", desc: "Dialects and literature", icon: "📜", href: "/categories" },
          { title: "Cities", desc: "Stories of 81 provinces", icon: "🏙️", href: "/cities/featured" },
          { title: "Routes", desc: "Step-by-step discovery", icon: "🗺️", href: "/routes" },
        ],
      },
      featured: {
        title: "Today's Entry",
        heading: "Orkhon Inscriptions",
        body:
          "The Orkhon Inscriptions are the earliest written records containing the name Turk, erected in the 8th century by the Gokturk Khaganate for Kultigin, Bilge Khagan, and Tonyukuk...",
        cta: "Read More",
        href: "/articles/featured",
      },
      weeklyRoute: {
        title: "Weekly Route",
        badge: "Culture Tour",
        heading: "Lycian Way: History on Foot",
        body: "A hiking journey from Fethiye to Antalya, under the shadow of ancient cities.",
        cta: "View Route",
        href: "/routes",
        imageSrc: "/images/route-lycia.jpg",
        imageAlt: "Lycian Way",
      },
    },
    search: {
      hero: {
        label: "Search",
        title: "Search the Archive",
        subtitle: "Instantly explore articles, cities, and routes.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      title: "Search",
      subtitle: "Discover articles, cities, routes",
      placeholder: "Search across Turkishpedia",
    },
    routes: {
      hero: {
        label: "Routes",
        title: "Culture and Discovery Routes",
        subtitle: "Journeys shaped by local stories and context.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      title: "Route Planner",
      subtitle: "Build multi-day itineraries",
      items: [
        { title: "Aegean Coastline", summary: "Blue coves and ancient port towns.", href: "/routes/aegean-coastline" },
        { title: "Silk Road Heritage", summary: "Markets, caravanserais, and stories.", href: "/routes/silk-road-heritage" },
      ],
    },
    profile: {
      hero: {
        label: "Profile",
        title: "Your Archive",
        subtitle: "Track your contributions, favorites, and saved insights.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      title: "Profile",
      subtitle: "Manage your contributions and bookmarks",
      body: "Profile details and activity will render here.",
    },
    admin: {
      hero: {
        label: "Admin",
        title: "Editorial Command",
        subtitle: "Quality, verification, and publishing flow live here.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      title: "Admin Dashboard",
      subtitle: "Moderation and editorial tools",
      body: "Admin tools will be wired to the API.",
    },
    article: {
      hero: {
        label: "Article",
        title: "Layers of Knowledge",
        subtitle: "Focus on editor-approved, verified content.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      title: "Article",
      subtitle: "Editor-approved knowledge entry",
      heading: "Article title placeholder",
      body: "Markdown content will render here using the API-first content pipeline.",
    },
    category: {
      hero: {
        label: "Category",
        title: "Thematic Archive",
        subtitle: "Collections grouped by topic and focus.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      title: "Category",
      subtitle: "Browse articles by theme",
      body: "Category listing will be populated from the API.",
    },
    city: {
      hero: {
        label: "City",
        title: "City Profile",
        subtitle: "Local culture, history, and discovery points.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      title: "City",
      subtitle: "Tourism guide and local insights",
      body: "City overview, map, and places will render here.",
    },
    publicProfile: {
      hero: {
        label: "Profile",
        subtitle: "Shared details and profile stats.",
        imageSrc: "/images/hero-turkey.jpg",
        imageAlt: "Anatolia",
      },
      sections: {
        basics: "Basics",
        contact: "Contact",
        details: "Personal Details",
        stats: "Stats",
      },
      labels: {
        username: "Username",
        displayName: "Display name",
        fullName: "Full name",
        email: "Email",
        phoneNumber: "Phone",
        birthDate: "Birth date",
        age: "Age",
        gender: "Gender",
        currentLocation: "Location",
        birthPlace: "Birth place",
        religion: "Religion",
        educationLevel: "Education",
        occupation: "Occupation",
        jobTitle: "Job",
        membershipDate: "Member since",
        followers: "Followers",
        following: "Following",
      },
      empty: "Not shared.",
    },
  },
};

export function getDictionary(locale: string): Dictionary {
  if (locale === "tr" || locale === "en") {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}
