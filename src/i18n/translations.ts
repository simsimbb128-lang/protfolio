export type Locale = 'ar' | 'en'
export type Direction = 'rtl' | 'ltr'

export interface CapabilityCopy {
  id: string
  index: string
  title: string
  text: string
}

export interface InterestCopy {
  id: string
  index: string
  title: string
  text: string
}

export interface MetricCopy {
  value: string
  label: string
}

export interface ProjectCopy {
  id: string
  title: string
  tag: string
  description: string
  url: string
  host: string
  image: string
  imageAlt: string
}

export interface CertificateCopy {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  thumb: string
  alt: string
  width: number
  height: number
}

export interface ContactChannelCopy {
  id: 'email' | 'phone' | 'whatsapp'
  label: string
  value: string
  href: string
  actionLabel: string
  description: string
  ariaLabel: string
}

export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  brand: {
    name: string
    mark: string
    descriptor: string
  }
  a11y: {
    skip: string
    primaryNav: string
    language: string
    decorativeScene: string
    opensChapter: string
    backToTop: string
    opensNewTab: string
  }
  language: {
    arabic: string
    english: string
    switchToArabic: string
    switchToEnglish: string
  }
  nav: {
    about: string
    projects: string
    contact: string
    index: string
  }
  presentation: {
    label: string
    controls: string
    carousel: string
    slideRole: string
    previous: string
    next: string
    first: string
    menu: string
    menuTitle: string
    closeMenu: string
    progress: string
    slide: string
    of: string
    keyboardHint: string
    autoplayStart: string
    autoplayPause: string
    autoplayUnavailable: string
    autoplayHint: string
    slides: {
      opening: string
      about: string
      projects: string
      certificates: string
      contact: string
      closing: string
    }
  }
  hero: {
    eyebrow: string
    nameAr: string
    nameLines: [string, string]
    nameEn: string
    subtitle: string
    cta: string
    continue: string
    chapter: string
    sideNote: string
    stage: {
      panelOneLabel: string
      panelOneValue: string
      panelTwoLabel: string
      panelTwoValue: string
      panelThreeLabel: string
      panelThreeValue: string
      orbitLabel: string
      caption: string
    }
  }
  about: {
    eyebrow: string
    title: string
    lead: string
    body: string
    note: string
    interests: InterestCopy[]
    metrics: MetricCopy[]
    metricsLabel: string
  }
  projects: {
    eyebrow: string
    title: string
    lead: string
    countLabel: string
    countValue: string
    visit: string
    artworkNote: string
    items: ProjectCopy[]
  }
  certificates: {
    eyebrow: string
    title: string
    lead: string
    countLabel: string
    countValue: string
    openLabel: string
    closeLabel: string
    dialogLabel: string
    dialogHint: string
    previous: string
    next: string
    counterLabel: string
    issuerLabel: string
    items: CertificateCopy[]
  }
  contact: {
    eyebrow: string
    title: string
    lead: string
    note: string
    channels: ContactChannelCopy[]
    externalNote: string
    signalLabel: string
    signalCaption: string
  }
  approach: {
    eyebrow: string
    title: string
    lead: string
    body: string
    capabilities: CapabilityCopy[]
    visualLabel: string
    visualCaption: string
    note: string
    closingLabel: string
    closingText: string
  }
  footer: {
    thanks: string
    statement: string
    edition: string
    copyright: string
    returnLabel: string
  }
}

const arabic: Dictionary = {
  meta: {
    title: 'ابتسام عبدالقادر باجنيد — تصميم الويب والتجارب الرقمية',
    description:
      'معرض أعمال ابتسام عبدالقادر باجنيد — تصميم وتطوير مواقع الويب، والذكاء الاصطناعي، والتجارب الرقمية التفاعلية.',
  },
  brand: {
    name: 'ابتسام باجنيد',
    mark: 'EB',
    descriptor: 'تصميم الويب والتجارب الرقمية',
  },
  a11y: {
    skip: 'تخطَّ إلى المحتوى الرئيسي',
    primaryNav: 'التنقّل الرئيسي',
    language: 'اختر اللغة',
    decorativeScene: 'منحوتة زجاجية ثلاثية الأبعاد مستوحاة من واجهات الواقع المعزّز',
    opensChapter: 'يفتح نبذة عني',
    backToTop: 'العودة إلى الأعلى',
    opensNewTab: 'يفتح في نافذة جديدة',
  },
  language: {
    arabic: 'العربية',
    english: 'EN',
    switchToArabic: 'التبديل إلى العربية',
    switchToEnglish: 'التبديل إلى الإنجليزية',
  },
  nav: {
    about: 'نبذة عني',
    projects: 'مشاريعي',
    contact: 'تواصل معي',
    index: 'المعرض',
  },
  presentation: {
    label: 'عرض أعمال ابتسام',
    controls: 'أدوات العرض التقديمي',
    carousel: 'عرض تقديمي',
    slideRole: 'شريحة',
    previous: 'الشريحة السابقة',
    next: 'الشريحة التالية',
    first: 'العودة إلى الشريحة الأولى',
    menu: 'فهرس الشرائح',
    menuTitle: 'الانتقال إلى شريحة',
    closeMenu: 'إغلاق فهرس الشرائح',
    progress: 'تقدّم العرض',
    slide: 'الشريحة',
    of: 'من',
    keyboardHint: 'استخدم مفاتيح الأسهم للتنقل بين الشرائح، وHome للبداية وEnd للنهاية.',
    autoplayStart: 'تشغيل العرض التلقائي',
    autoplayPause: 'إيقاف العرض التلقائي مؤقتًا',
    autoplayUnavailable: 'العرض التلقائي غير متاح عند تفعيل تقليل الحركة',
    autoplayHint: 'يتوقف العرض التلقائي عند أي تفاعل، ويُعرض كل شريحة لمدة إحدى عشرة ثانية.',
    slides: {
      opening: 'الافتتاحية',
      about: 'نبذة عني',
      projects: 'مشاريعي',
      certificates: 'الشهادات والإنجازات',
      contact: 'تواصل معي',
      closing: 'الختام',
    },
  },
  hero: {
    eyebrow: 'تصميم الويب · الذكاء الاصطناعي · التجارب الرقمية',
    nameAr: 'إبتسام عبدالقادر باجنيد',
    nameLines: ['إبتسام', 'عبدالقادر باجنيد'],
    nameEn: 'EBTISAM ABDULQADER BAJUNAID',
    subtitle:
      'أهتم بتصميم وتطوير مواقع الويب، والذكاء الاصطناعي، والتجارب الرقمية التفاعلية التي تجمع بين الوضوح والجمال وسهولة الاستخدام.',
    cta: 'استكشف مشاريعي',
    continue: 'تابع',
    chapter: 'المعرض / ٢٠٢٦',
    sideNote: 'معرض حيّ للحرفة الرقمية',
    stage: {
      panelOneLabel: 'الواجهة / الويب',
      panelOneValue: 'أسطح رقمية مدروسة',
      panelTwoLabel: 'المكان / ثلاثي الأبعاد',
      panelTwoValue: 'دراسات مكانية مستوحاة من الواقع المعزّز',
      panelThreeLabel: 'الحرفة',
      panelThreeValue: 'الحركة · الخط · الكود',
      orbitLabel: 'دراسة مكانية',
      caption: 'دراسة مكانية / ٠١',
    },
  },
  about: {
    eyebrow: 'نبذة / ٠٢',
    title: 'نبذة عني',
    lead: 'ممارسة رقمية تجمع بين التصميم والتقنية والتعلّم المستمر.',
    body:
      'أنا إبتسام باجنيد. أهتم بتصميم وتطوير مواقع الويب، وأوظّف الذكاء الاصطناعي لتحويل الأفكار إلى مشاريع رقمية تجمع بين التصميم المدروس وسهولة الاستخدام. أواصل تطوير مهاراتي التقنية عبر الدورات والتجارب والمشاريع الإبداعية.',
    note:
      'يقود العملَ الوضوحُ وسهولة الاستخدام والفضول حول كيف يمكن للأفكار الرقمية أن تتجاوز حدود الشاشة.',
    interests: [
      {
        id: 'web-design',
        index: '٠١',
        title: 'تصميم وتطوير الويب',
        text: 'تصميم وبناء مواقع متجاوبة بعناية بالتسلسل البصري وسهولة الاستخدام وإيقاع الصفحة.',
      },
      {
        id: 'artificial-intelligence',
        index: '٠٢',
        title: 'الذكاء الاصطناعي',
        text: 'استكشاف أدوات الذكاء الاصطناعي وأفكاره لتحويل المفاهيم إلى تجارب رقمية عملية.',
      },
      {
        id: 'interactive-experiences',
        index: '٠٣',
        title: 'التجارب الرقمية التفاعلية',
        text: 'تشكيل الواجهات بالحركة والعمق المكاني والتفاعل الذي يخدم المحتوى.',
      },
      {
        id: 'continuous-learning',
        index: '٠٤',
        title: 'التعلّم المستمر',
        text: 'تطوير المهارات التقنية عبر الدورات والشهادات والمشاريع الإبداعية التطبيقية.',
      },
    ],
    metrics: [
      { value: '٠٤', label: 'مشاريع' },
      { value: '٠٨', label: 'شهادات' },
      { value: '٠٢', label: 'لغتان' },
    ],
    metricsLabel: 'لمحة سريعة عن المعرض',
  },
  projects: {
    eyebrow: 'أعمال مختارة / ٠٣',
    title: 'مشاريعي',
    lead: 'أربعة مشاريع رقمية في الأذان والقرآن، والخدمات المنزلية، والحياة الذكية، وتجارب الفواكه.',
    countLabel: 'مشاريع',
    countValue: '٠٤',
    visit: 'زيارة المشروع',
    artworkNote: 'أعمال فنية توضيحية من ملفات المشروع الأصلية — ليست لقطات شاشة حية.',
    items: [
      {
        id: 'fajr',
        title: 'فجر',
        tag: 'أذان وقرآن',
        description: 'مشروع رقمي يجمع خدمات الأذان والقرآن الكريم في تجربة سهلة الاستخدام.',
        url: 'https://fajr-2wt.pages.dev/',
        host: 'fajr-2wt.pages.dev',
        image: '/projects/project-fajr.svg',
        imageAlt: 'رسم توضيحي لمشروع فجر يظهر الهلال واسم المشروع على خلفية ليلية.',
      },
      {
        id: 'fixhome',
        title: 'FixHome',
        tag: 'خدمات منزلية',
        description: 'منصة للخدمات المنزلية تهدف إلى تسهيل الوصول إلى خدمات المنزل وتنظيم طلباتها.',
        url: 'https://fixhome.smh2030.store/?v=2',
        host: 'fixhome.smh2030.store',
        image: '/projects/project-fixhome.svg',
        imageAlt: 'رسم توضيحي لمشروع FixHome على شكل واجهة رقمية لخدمات المنزل.',
      },
      {
        id: 'smarthome',
        title: 'SmartHome',
        tag: 'حياة ذكية',
        description: 'مشروع تقني يقدّم فكرة المنزل الذكي وتجربة الحياة المتصلة بالتقنيات الحديثة.',
        url: 'https://smarthome.simsimbb128.workers.dev',
        host: 'smarthome.simsimbb128.workers.dev',
        image: '/projects/project-smart-home.svg',
        imageAlt: 'رسم توضيحي لمشروع SmartHome يظهر رمز المنزل داخل واجهة رقمية.',
      },
      {
        id: 'toty-fruity',
        title: 'Toty Frutty',
        tag: 'تجربة فواكه',
        description: 'مشروع رقمي لتقديم تجربة مميزة مرتبطة بالفواكه والمنتجات بطريقة جذابة.',
        url: 'https://totyfruity.bsooma404.workers.dev',
        host: 'totyfruity.bsooma404.workers.dev',
        image: '/projects/project-toty-fruity.svg',
        imageAlt: 'رسم توضيحي لمشروع Toty Frutty يظهر عناصر فواكه داخل واجهة رقمية.',
      },
    ],
  },
  certificates: {
    eyebrow: 'إنجازات / ٠٤',
    title: 'الشهادات والإنجازات',
    lead: 'مجموعة من شهادات الدورات وسجلات المشاركة المحفوظة في أرشيف المعرض.',
    countLabel: 'شهادات',
    countValue: '٠٨',
    openLabel: 'فتح العرض الأكبر',
    closeLabel: 'إغلاق العرض الأكبر',
    dialogLabel: 'معاينة الشهادة',
    dialogHint: 'استخدم مفاتيح الأسهم للتنقل بين الشهادات، وEscape للإغلاق.',
    previous: 'الشهادة السابقة',
    next: 'الشهادة التالية',
    counterLabel: 'شهادة',
    issuerLabel: 'جهة الإصدار',
    items: [
      {
        id: 'digital-presence',
        title: 'أساسيات الوجود الرقمي',
        issuer: 'الجامعة الإسلامية بمنيسوتا',
        date: '١١ أغسطس ٢٠٢٦',
        image: '/certificates/digital-presence.png',
        thumb: '/certificates/thumbs/digital-presence.webp',
        alt: 'شهادة دورة أساسيات الوجود الرقمي من الجامعة الإسلامية بمنيسوتا.',
        width: 1080,
        height: 746,
      },
      {
        id: 'padlet-workshop',
        title: 'أسرار Padlet للتدريس التفاعلي',
        issuer: 'وقف سامية التعليمي',
        date: '',
        image: '/certificates/padlet-workshop.png',
        thumb: '/certificates/thumbs/padlet-workshop.webp',
        alt: 'شهادة حضور ورشة أسرار Padlet للتدريس التفاعلي.',
        width: 800,
        height: 574,
      },
      {
        id: 'microsoft-mastery',
        title: 'الإتقان الذكي لبرامج Microsoft',
        issuer: 'الجامعة الإسلامية بمنيسوتا',
        date: '١٩ أبريل ٢٠٢٦',
        image: '/certificates/microsoft-mastery.png',
        thumb: '/certificates/thumbs/microsoft-mastery.webp',
        alt: 'شهادة دورة الإتقان الذكي لبرامج Microsoft من الجامعة الإسلامية بمنيسوتا.',
        width: 1280,
        height: 904,
      },
      {
        id: 'web-ecommerce',
        title: 'الإتقان الشامل للويب والتجارة الإلكترونية',
        issuer: 'الجامعة الإسلامية بمنيسوتا',
        date: '١١ أبريل ٢٠٢٦',
        image: '/certificates/web-ecommerce.png',
        thumb: '/certificates/thumbs/web-ecommerce.webp',
        alt: 'شهادة دورة الإتقان الشامل للويب والتجارة الإلكترونية من الجامعة الإسلامية بمنيسوتا.',
        width: 1080,
        height: 766,
      },
      {
        id: 'digital-wellbeing',
        title: 'الرفاهية الرقمية: دليل العائلة',
        issuer: 'برنامج إنجاز السعودية',
        date: '٩ يونيو ٢٠٢٦',
        image: '/certificates/digital-wellbeing.png',
        thumb: '/certificates/thumbs/digital-wellbeing.webp',
        alt: 'شهادة إتمام دورة الرفاهية الرقمية: دليل العائلة من برنامج إنجاز السعودية.',
        width: 1280,
        height: 914,
      },
      {
        id: 'project-management-ai',
        title: 'المسارات المهنية لإدارة المشاريع وإدارة الشركات باستخدام الذكاء الاصطناعي',
        issuer: 'Target Pro للتدريب والاستشارات',
        date: '',
        image: '/certificates/project-management-ai.png',
        thumb: '/certificates/thumbs/project-management-ai.webp',
        alt: 'شهادة مشاركة في ندوة المسارات المهنية لإدارة المشاريع وإدارة الشركات باستخدام الذكاء الاصطناعي.',
        width: 906,
        height: 1280,
      },
      {
        id: 'python-programming',
        title: 'دورة تعلم البرمجة بلغة بايثون',
        issuer: 'الجامعة الإسلامية بمنيسوتا',
        date: '٢٢/٠٦/١٤٤٧هـ',
        image: '/certificates/python-programming.png',
        thumb: '/certificates/thumbs/python-programming.webp',
        alt: 'شهادة إتمام دورة تعلم البرمجة بلغة بايثون من الجامعة الإسلامية بمنيسوتا.',
        width: 1280,
        height: 891,
      },
      {
        id: 'ai-applications',
        title: 'كيفية التعامل مع تطبيقات الذكاء الاصطناعي',
        issuer: 'الجامعة الإسلامية بمنيسوتا',
        date: '٢٦ يوليو ٢٠٢٦',
        image: '/certificates/ai-applications.png',
        thumb: '/certificates/thumbs/ai-applications.webp',
        alt: 'شهادة دورة كيفية التعامل مع تطبيقات الذكاء الاصطناعي من الجامعة الإسلامية بمنيسوتا.',
        width: 1280,
        height: 905,
      },
    ],
  },
  contact: {
    eyebrow: 'تواصل / ٠٥',
    title: 'تواصل معي',
    lead: 'لديك فكرة أو مشروع أو سؤال؟ يسعدني أن أسمع منك.',
    note: 'اختر القناة الأنسب لك.',
    channels: [
      {
        id: 'email',
        label: 'البريد الإلكتروني',
        value: 'bsooma404@gmail.com',
        href: 'mailto:bsooma404@gmail.com',
        actionLabel: 'إرسال بريد إلكتروني',
        description: 'اكتب لي مباشرة.',
        ariaLabel: 'إرسال بريد إلكتروني إلى bsooma404@gmail.com',
      },
      {
        id: 'phone',
        label: 'الهاتف',
        value: '0532525128',
        href: 'tel:0532525128',
        actionLabel: 'الاتصال بهذا الرقم',
        description: 'اتصال مباشر.',
        ariaLabel: 'الاتصال بالرقم 0532525128',
      },
      {
        id: 'whatsapp',
        label: 'واتساب',
        value: '0532525128',
        href: 'https://wa.me/966532525128',
        actionLabel: 'فتح واتساب',
        description: 'أرسل رسالة عبر واتساب.',
        ariaLabel: 'فتح محادثة واتساب مع إبتسام على الرقم ‎+966 53 252 5128‎ في نافذة جديدة',
      },
    ],
    externalNote: 'يفتح واتساب في نافذة جديدة.',
    signalLabel: 'قنوات التواصل',
    signalCaption: 'البريد · الهاتف · واتساب',
  },
  approach: {
    eyebrow: 'الفصل الأول',
    title: 'الممارسة',
    lead: 'ممارسة تصميم تتقاطع فيها الصفحة والشاشة والفضاء.',
    body:
      'أصمّم وأطوّر صفحات الويب والتجارب الرقمية، مع عناية بالوضوح والجوّ العام والتفاصيل الهادئة التي تمنح الواجهة روحًا. وتمتدّ ممارستي نحو التجارب الغامرة والواقع المعزّز، حيث يمكن للأفكار الرقمية أن تتجاوز الإطار.',
    capabilities: [
      {
        id: 'web-design',
        index: '٠١',
        title: 'تصميم صفحات الويب',
        text: 'تنسيقات تحريرية وأنظمة بصرية تُبنى حول التسلسل والإيقاع ووجهة نظر واضحة.',
      },
      {
        id: 'digital-experiences',
        index: '٠٢',
        title: 'التجارب الرقمية',
        text: 'مواقع متجاوبة وتجارب تفاعلية تُطوَّر بعناية للحركة والأداء وإمكانية الوصول.',
      },
      {
        id: 'immersive-ar',
        index: '٠٣',
        title: 'التجارب الغامرة والواقع المعزّز',
        text: 'استكشاف الواقع المعزّز والواجهات المكانية التي تنقل الأفكار الرقمية إلى العالم المادي.',
      },
    ],
    visualLabel: 'المحاور المكانية',
    visualCaption: 'الضوء / الشكل / الواجهة',
    note:
      'أساس لمجموعة أعمال تتوسّع في تصميم الويب، وتطوير التجارب الرقمية، والواقع المعزّز.',
    closingLabel: 'مساحة حيّة',
    closingText: 'صُمّم المعرض لينمو مع كل مشروع ودراسة وتجربة جديدة.',
  },
  footer: {
    thanks: 'شكرًا لزيارتكم',
    statement: 'تصميم الويب، والتجارب الرقمية، والعوالم الغامرة.',
    edition: 'المعرض / المجلد الأول',
    copyright: '© ٢٠٢٦ ابتسام عبدالقادر باجنيد',
    returnLabel: 'العودة إلى البداية',
  },
}

const english: Dictionary = {
  meta: {
    title: 'Ebtisam Abdulqader Bajunaid — Web Design & Digital Experiences',
    description:
      'The portfolio of Ebtisam Abdulqader Bajunaid — web design and development, artificial intelligence, and interactive digital experiences.',
  },
  brand: {
    name: 'Ebtisam Bajunaid',
    mark: 'EB',
    descriptor: 'Web design & digital experiences',
  },
  a11y: {
    skip: 'Skip to main content',
    primaryNav: 'Primary navigation',
    language: 'Choose language',
    decorativeScene: 'Decorative three-dimensional glass sculpture inspired by augmented-reality interfaces',
    opensChapter: 'Opens the About Me slide',
    backToTop: 'Back to top',
    opensNewTab: 'Opens in a new tab',
  },
  language: {
    arabic: 'العربية',
    english: 'EN',
    switchToArabic: 'Switch to Arabic',
    switchToEnglish: 'Switch to English',
  },
  nav: {
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    index: 'Portfolio',
  },
  presentation: {
    label: 'Portfolio presentation',
    controls: 'Presentation controls',
    carousel: 'presentation',
    slideRole: 'slide',
    previous: 'Previous slide',
    next: 'Next slide',
    first: 'Back to first slide',
    menu: 'Slide index',
    menuTitle: 'Jump to a slide',
    closeMenu: 'Close slide index',
    progress: 'Presentation progress',
    slide: 'Slide',
    of: 'of',
    keyboardHint: 'Use the arrow keys to move between slides, Home for the first, and End for the last.',
    autoplayStart: 'Start autoplay',
    autoplayPause: 'Pause autoplay',
    autoplayUnavailable: 'Autoplay is unavailable when reduced motion is enabled',
    autoplayHint: 'Autoplay pauses on any interaction and keeps each slide on screen for eleven seconds.',
    slides: {
      opening: 'Opening',
      about: 'About Me',
      projects: 'Projects',
      certificates: 'Certificates & Achievements',
      contact: 'Contact Me',
      closing: 'Closing',
    },
  },
  hero: {
    eyebrow: 'Web design · Artificial intelligence · Digital experiences',
    nameAr: 'إبتسام عبدالقادر باجنيد',
    nameLines: ['إبتسام', 'عبدالقادر باجنيد'],
    nameEn: 'EBTISAM ABDULQADER BAJUNAID',
    subtitle:
      'My interests sit at the intersection of web design and development, artificial intelligence, and interactive digital experiences that combine clarity, craft, and ease of use.',
    cta: 'Explore My Projects',
    continue: 'Continue',
    chapter: 'Portfolio / 2026',
    sideNote: 'A living portfolio of digital craft',
    stage: {
      panelOneLabel: 'Interface / Web',
      panelOneValue: 'Considered digital surfaces',
      panelTwoLabel: 'Spatial / 3D',
      panelTwoValue: 'AR-inspired spatial studies',
      panelThreeLabel: 'Craft',
      panelThreeValue: 'Motion · Type · Code',
      orbitLabel: 'Spatial study',
      caption: 'Spatial study / 01',
    },
  },
  about: {
    eyebrow: 'About / 02',
    title: 'About Me',
    lead: 'A digital practice shaped by design, technology, and continuous learning.',
    body:
      'I am Ebtisam Bajunaid. I am interested in web design and development, and in using artificial intelligence to turn ideas into digital projects that combine considered design with ease of use. I continue to develop my technical skills through courses, experiments, and creative technology projects.',
    note:
      'The work is guided by clarity, usability, and a curiosity about how digital ideas can move beyond the screen.',
    interests: [
      {
        id: 'web-design',
        index: '01',
        title: 'Web Design & Development',
        text: 'Designing and building responsive websites with attention to hierarchy, usability, and visual rhythm.',
      },
      {
        id: 'artificial-intelligence',
        index: '02',
        title: 'Artificial Intelligence',
        text: 'Exploring AI tools and ideas as a way to turn concepts into practical digital experiences.',
      },
      {
        id: 'interactive-experiences',
        index: '03',
        title: 'Interactive Digital Experiences',
        text: 'Shaping interfaces with motion, spatial depth, and interaction that support the content.',
      },
      {
        id: 'continuous-learning',
        index: '04',
        title: 'Continuous Learning',
        text: 'Developing technical skills through courses, certificates, and hands-on creative projects.',
      },
    ],
    metrics: [
      { value: '04', label: 'Projects' },
      { value: '08', label: 'Certificates' },
      { value: '02', label: 'Languages' },
    ],
    metricsLabel: 'A quick view of the portfolio',
  },
  projects: {
    eyebrow: 'Selected work / 03',
    title: 'Projects',
    lead: 'Four digital projects across Adhan and Quran, home services, smart living, and fruit experiences.',
    countLabel: 'Projects',
    countValue: '04',
    visit: 'Visit Project',
    artworkNote: 'Illustrative artwork from the original project files — not live screenshots.',
    items: [
      {
        id: 'fajr',
        title: 'FAJR',
        tag: 'Adhan & Quran',
        description: 'A digital project bringing Adhan and Quran features together in an easy-to-use experience.',
        url: 'https://fajr-2wt.pages.dev/',
        host: 'fajr-2wt.pages.dev',
        image: '/projects/project-fajr.svg',
        imageAlt: 'Illustrative artwork for the Fajr project, showing a crescent and the project wordmark.',
      },
      {
        id: 'fixhome',
        title: 'FixHome',
        tag: 'Home services',
        description:
          'A home services platform designed to make accessing and organizing home service requests easier.',
        url: 'https://fixhome.smh2030.store/?v=2',
        host: 'fixhome.smh2030.store',
        image: '/projects/project-fixhome.svg',
        imageAlt: 'Illustrative artwork for FixHome, showing a digital home-services interface.',
      },
      {
        id: 'smarthome',
        title: 'SmartHome',
        tag: 'Smart living',
        description: 'A technology project presenting the concept of a smart home and connected living.',
        url: 'https://smarthome.simsimbb128.workers.dev',
        host: 'smarthome.simsimbb128.workers.dev',
        image: '/projects/project-smart-home.svg',
        imageAlt: 'Illustrative artwork for SmartHome, showing a home symbol inside a digital interface.',
      },
      {
        id: 'toty-fruity',
        title: 'Toty Frutty',
        tag: 'Fruit experience',
        description: 'A digital project presenting a fruit-related experience in an engaging way.',
        url: 'https://totyfruity.bsooma404.workers.dev',
        host: 'totyfruity.bsooma404.workers.dev',
        image: '/projects/project-toty-fruity.svg',
        imageAlt: 'Illustrative artwork for Toty Frutty, showing fruit elements inside a digital interface.',
      },
    ],
  },
  certificates: {
    eyebrow: 'Credentials / 04',
    title: 'Certificates & Achievements',
    lead: 'A selection of course certificates and participation records from the existing portfolio archive.',
    countLabel: 'Certificates',
    countValue: '08',
    openLabel: 'Open larger view',
    closeLabel: 'Close larger view',
    dialogLabel: 'Certificate preview',
    dialogHint: 'Use the arrow keys to move between certificates, and Escape to close.',
    previous: 'Previous certificate',
    next: 'Next certificate',
    counterLabel: 'Certificate',
    issuerLabel: 'Issued by',
    items: [
      {
        id: 'digital-presence',
        title: 'Fundamentals of Digital Presence',
        issuer: 'Islamic University of Minnesota',
        date: '11 August 2026',
        image: '/certificates/digital-presence.png',
        thumb: '/certificates/thumbs/digital-presence.webp',
        alt: 'Certificate for the Fundamentals of Digital Presence course from the Islamic University of Minnesota.',
        width: 1080,
        height: 746,
      },
      {
        id: 'padlet-workshop',
        title: 'Secrets of Padlet for Interactive Teaching',
        issuer: 'Samia Educational Waqf',
        date: '',
        image: '/certificates/padlet-workshop.png',
        thumb: '/certificates/thumbs/padlet-workshop.webp',
        alt: 'Certificate of attendance for the Secrets of Padlet for Interactive Teaching workshop.',
        width: 800,
        height: 574,
      },
      {
        id: 'microsoft-mastery',
        title: 'Mastering Microsoft Programs',
        issuer: 'Islamic University of Minnesota',
        date: '19 April 2026',
        image: '/certificates/microsoft-mastery.png',
        thumb: '/certificates/thumbs/microsoft-mastery.webp',
        alt: 'Certificate for the Mastering Microsoft Programs course from the Islamic University of Minnesota.',
        width: 1280,
        height: 904,
      },
      {
        id: 'web-ecommerce',
        title: 'Comprehensive Web & E-Commerce Mastery',
        issuer: 'Islamic University of Minnesota',
        date: '11 April 2026',
        image: '/certificates/web-ecommerce.png',
        thumb: '/certificates/thumbs/web-ecommerce.webp',
        alt: 'Certificate for the Comprehensive Web and E-Commerce Mastery course from the Islamic University of Minnesota.',
        width: 1080,
        height: 766,
      },
      {
        id: 'digital-wellbeing',
        title: 'Digital Wellbeing: A Family Guide',
        issuer: 'Saudi Arabia’s Injaz Program',
        date: '9 June 2026',
        image: '/certificates/digital-wellbeing.png',
        thumb: '/certificates/thumbs/digital-wellbeing.webp',
        alt: 'Certificate for completing the Digital Wellbeing: A Family Guide course from Saudi Arabia’s Injaz Program.',
        width: 1280,
        height: 914,
      },
      {
        id: 'project-management-ai',
        title: 'Professional Tracks for Project & Corporate Management Using AI',
        issuer: 'Target Pro for Training and Consulting',
        date: '',
        image: '/certificates/project-management-ai.png',
        thumb: '/certificates/thumbs/project-management-ai.webp',
        alt: 'Certificate of participation in the Professional Tracks for Project and Corporate Management Using AI webinar.',
        width: 906,
        height: 1280,
      },
      {
        id: 'python-programming',
        title: 'Learning Python Programming',
        issuer: 'Islamic University of Minnesota',
        date: '22/06/1447 AH',
        image: '/certificates/python-programming.png',
        thumb: '/certificates/thumbs/python-programming.webp',
        alt: 'Certificate for completing the Learning Python Programming course from the Islamic University of Minnesota.',
        width: 1280,
        height: 891,
      },
      {
        id: 'ai-applications',
        title: 'Working with AI Applications',
        issuer: 'Islamic University of Minnesota',
        date: '26 July 2026',
        image: '/certificates/ai-applications.png',
        thumb: '/certificates/thumbs/ai-applications.webp',
        alt: 'Certificate for the Working with AI Applications course from the Islamic University of Minnesota.',
        width: 1280,
        height: 905,
      },
    ],
  },
  contact: {
    eyebrow: 'Contact / 05',
    title: 'Contact Me',
    lead: 'Have an idea, a project, or a question? I would be glad to hear from you.',
    note: 'Choose the channel that works best for you.',
    channels: [
      {
        id: 'email',
        label: 'Email',
        value: 'bsooma404@gmail.com',
        href: 'mailto:bsooma404@gmail.com',
        actionLabel: 'Send an email',
        description: 'Write to me directly.',
        ariaLabel: 'Send an email to bsooma404@gmail.com',
      },
      {
        id: 'phone',
        label: 'Phone',
        value: '0532525128',
        href: 'tel:0532525128',
        actionLabel: 'Call this number',
        description: 'Direct call.',
        ariaLabel: 'Call 0532525128',
      },
      {
        id: 'whatsapp',
        label: 'WhatsApp',
        value: '0532525128',
        href: 'https://wa.me/966532525128',
        actionLabel: 'Open WhatsApp',
        description: 'Send a message on WhatsApp.',
        ariaLabel: 'Open a WhatsApp chat with Ebtisam at +966 53 252 5128 in a new tab',
      },
    ],
    externalNote: 'WhatsApp opens in a new tab.',
    signalLabel: 'Contact channels',
    signalCaption: 'Email · Phone · WhatsApp',
  },
  approach: {
    eyebrow: 'Chapter 01',
    title: 'The Practice',
    lead: 'A design practice at the intersection of page, screen, and space.',
    body:
      'I design and develop web pages and digital experiences, with attention to clarity, atmosphere, and the quiet details that make an interface feel alive. My work reaches toward immersive and augmented experiences, where digital ideas can exist beyond the frame.',
    capabilities: [
      {
        id: 'web-design',
        index: '01',
        title: 'Web Page Design',
        text: 'Editorial layouts and visual systems shaped around hierarchy, rhythm, and a clear point of view.',
      },
      {
        id: 'digital-experiences',
        index: '02',
        title: 'Digital Experiences',
        text: 'Responsive websites and interactive experiences developed with care for motion, performance, and accessibility.',
      },
      {
        id: 'immersive-ar',
        index: '03',
        title: 'Immersive & AR',
        text: 'Exploring augmented reality and spatial interfaces that carry digital ideas into the physical world.',
      },
    ],
    visualLabel: 'Spatial axes',
    visualCaption: 'Light / form / interface',
    note:
      'A foundation for a growing body of work across web design, digital experience development, and immersive AR.',
    closingLabel: 'A living space',
    closingText: 'The portfolio is designed to grow with each new project, study, and experiment.',
  },
  footer: {
    thanks: 'Thank you for visiting',
    statement: 'Web design, digital experiences, and immersive worlds.',
    edition: 'Portfolio / Volume 01',
    copyright: '© 2026 Ebtisam Abdulqader Bajunaid',
    returnLabel: 'Return to the beginning',
  },
}

export const dictionaries: Record<Locale, Dictionary> = {
  ar: arabic,
  en: english,
}

export const localeDirection: Record<Locale, Direction> = {
  ar: 'rtl',
  en: 'ltr',
}
