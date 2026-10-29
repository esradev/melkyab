import { Property, Consultant, Review, BookingVisit, Conversation, UserProfile } from '../types';

export const INITIAL_CONSULTANTS: Consultant[] = [
  {
    id: 'c1',
    name: 'مهندس آریا دادفر',
    agencyName: 'دپارتمان تخصصی املاک نگین نیاوران',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    licenseCode: 'ش-۹۸۲۳۰۴',
    rating: 4.9,
    reviewCount: 48,
    verifiedBadge: true,
    experienceYears: 12,
    activeListingsCount: 18,
    specialtyAreas: ['نیاوران', 'کامرانیه', 'فرمانیه', 'الهیه'],
    bio: 'کارشناس ارشد معماری و ارزیاب رسمی املاک لوکس منطقه ۱ تهران با بیش از ۱۲ سال سابقه قراردادهای موفق خرید و فروش پنت‌هاوس و برج‌باغ.'
  },
  {
    id: 'c2',
    name: 'سحر صبوری',
    agencyName: 'املاک بارمان سعادت‌آباد و شهرک غرب',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    phone: '۰۹۱۲۹۸۷۶۵۴۳',
    licenseCode: 'ش-۷۸۳۴۱۲',
    rating: 4.8,
    reviewCount: 36,
    verifiedBadge: true,
    experienceYears: 8,
    activeListingsCount: 14,
    specialtyAreas: ['سعادت‌آباد', 'شهرک غرب', 'میدان کاج', 'بلوار ۲۴ متری'],
    bio: 'مشاور تخصصی رهن و اجاره واحدهای مسکونی و اداری لوکس در منطقه ۲ تهران. تضمین کارشناسی دقیق حقوقی و قرارداد بدون ریسک.'
  },
  {
    id: 'c3',
    name: 'کامران رستمی',
    agencyName: 'مسکن بزرگ سفیر فرشته و زعفرانیه',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    phone: '۰۹۱۲۱۱۱۴۴۵۵',
    licenseCode: 'ش-۶۷۲۰۴۱',
    rating: 4.7,
    reviewCount: 29,
    verifiedBadge: true,
    experienceYears: 15,
    activeListingsCount: 22,
    specialtyAreas: ['الهیه', 'فرشته', 'زعفرانیه', 'محمودیه'],
    bio: 'مشاور حقوقی و کارشناس فروش املاک هلدینگی، ویلایی و برج‌های مدرن منطقه شمیرانات. مسلط بر قوانین استعلام و اسناد تک‌برگ.'
  },
  {
    id: 'c4',
    name: 'نیما مرادی',
    agencyName: 'گروه مشاورین مهر پاسداران',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    phone: '۰۹۱۲۳۳۳۷۷۸۸',
    licenseCode: 'ش-۵۴۸۹۲۲',
    rating: 4.6,
    reviewCount: 21,
    verifiedBadge: true,
    experienceYears: 6,
    activeListingsCount: 11,
    specialtyAreas: ['پاسداران', 'دروس', 'هروی', 'قیطریه'],
    bio: 'متخصص قیمت‌گذاری و معرفی گزینه‌های ایده‌آل سرمایه‌گذاری ملکی و سکونت خانوادگی در پاسداران و دروس.'
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'پنت‌هاوس مدرن ۲۸۰ متری نیاوران با دید ابدی کل شهر و کوهستان',
    slug: 'penthouse-niavaran-280m',
    dealType: 'buy',
    propertyType: 'penthouse',
    price: {
      totalPrice: 56_000_000_000,
      pricePerMeter: 200_000_000
    },
    area: 280,
    bedrooms: 4,
    floor: 12,
    totalFloors: 12,
    unitsPerFloor: 1,
    yearBuilt: 1402,
    city: 'تهران',
    neighborhood: 'نیاوران',
    address: 'تهران، نیاوران، خیابان یاسر، کوچه مروارید',
    coordinates: {
      lat: 35.8197,
      lng: 51.4721
    },
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'آسانسور اختصاصی با کد اختصاصی',
      'پارکینگ سندی (۴ عدد باکس)',
      'انباری بزرگ ۲۰ متری',
      'بالکن بزرگ و تراس گاردن چیدمان',
      'استخر، سونا، جکوزی فعال',
      'لابی مجلل با لابی‌من ۳ شیفت',
      'سیستم خانه هوشمند KNX',
      'سالن اجتماعات و جیم تجهیز شده',
      'روف‌گاردن ۴ فصل با باربیکیو',
      'ژنراتور برق اضطراری و چاه آب'
    ],
    description: 'اثری شاخص از آرشیتکت بنام شمیران. پلان بی‌نقص با تفکیک عالی فضاهای عمومی و خصوصی. نورگیر مستقیم جنوب و شمال. ۴ خواب مستر وسیع، سوئیت مجزای مهمان، آشپزخانه فول فرنیش برند میله (Miele)، پنجره‌های قدی ترمال بریک با دید بدون مشرف و ابدی کل تهران.',
    isFeatured: true,
    isUrgent: false,
    documentType: 'سند تک‌برگ',
    consultantId: 'c1',
    createdAt: '۱۴۰۳/۰۶/۱۰',
    viewsCount: 1420,
    savesCount: 89
  },
  {
    id: 'p2',
    title: 'آپارتمان ۱۶۰ متری سعادت‌آباد ۳ خوابه نوساز کلید نخورده',
    slug: 'apartment-saadatabad-160m',
    dealType: 'rent',
    propertyType: 'apartment',
    price: {
      mortgage: 2_500_000_000,
      rent: 45_000_000,
      isConvertible: true
    },
    area: 160,
    bedrooms: 3,
    floor: 4,
    totalFloors: 6,
    unitsPerFloor: 2,
    yearBuilt: 1403,
    city: 'تهران',
    neighborhood: 'سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، میدان کاج، خیابان مروارید',
    coordinates: {
      lat: 35.7836,
      lng: 51.3712
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'آسانسور ۱۰ نفره استیل گلد',
      '۲ پارکینگ سندی در طبقه منفی ۱',
      'انباری',
      'بالکن کاربردی با شیر گاز و آب',
      'لابی شیک و مبله',
      'نگهبانی ۲۴ ساعته',
      'سیستم سرمایش گرمایش داکت اسپلیت',
      'کابینت‌های های‌گلاس اتریشی'
    ],
    description: 'واحدی فوق‌العاده شیک در یکی از آرام‌ترین فرعی‌های دنج سعادت‌آباد. نورگیری عالی از دو طرف، سالن پذیرایی یکدست مناسب هر نوع چیدمان، اتاق خواب‌ها دارای کمددیواری‌های جادار، قابل تبدیل به رهن کامل یا اجاره بیشتر بر اساس توافق.',
    isFeatured: true,
    isUrgent: true,
    documentType: 'سند تک‌برگ',
    consultantId: 'c2',
    createdAt: '۱۴۰۳/۰۶/۱۵',
    viewsCount: 980,
    savesCount: 64
  },
  {
    id: 'p3',
    title: 'آپارتمان ۱۳۵ متری شهرک غرب بلوار دادمان با موقعیت عالی',
    slug: 'apartment-shahrak-gharb-135m',
    dealType: 'buy',
    propertyType: 'apartment',
    price: {
      totalPrice: 24_300_000_000,
      pricePerMeter: 180_000_000
    },
    area: 135,
    bedrooms: 3,
    floor: 3,
    totalFloors: 5,
    unitsPerFloor: 2,
    yearBuilt: 1399,
    city: 'تهران',
    neighborhood: 'شهرک غرب',
    address: 'تهران، شهرک غرب، بلوار دادمان، خیابان فلامک جنوبی',
    coordinates: {
      lat: 35.7621,
      lng: 51.3653
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'آسانسور',
      '۲ پارکینگ سندی پشت هم',
      'انباری سندی ۸ متری',
      'تراس قابل چیدمان',
      'سرایداری مقیم',
      'سیستم اطفای حریق هوشمند',
      'کف سنگ اسلب ۱*۱ دهبید'
    ],
    description: 'دسترسی فوق‌العاده سریع به اتوبان یادگار امام و همت. ساختمان خلوت و کم‌واحد، سازنده خوشنام منطقه، فروشنده واقعی و دارای انعطاف در جلسه نشست قرارداد. سند بدون هیچ‌گونه ریشه اوقافی و بنیادی آماده محضر.',
    isFeatured: false,
    isUrgent: false,
    documentType: 'سند تک‌برگ',
    consultantId: 'c2',
    createdAt: '۱۴۰۳/۰۶/۱۲',
    viewsCount: 710,
    savesCount: 42
  },
  {
    id: 'p4',
    title: 'عمارت ویلایی ۴۵۰ متری دوبلکس لواسان با استخر چهارفصل و محوطه‌سازی',
    slug: 'villa-lavasan-450m',
    dealType: 'buy',
    propertyType: 'villa',
    price: {
      totalPrice: 42_000_000_000,
      pricePerMeter: 93_300_000
    },
    area: 450,
    bedrooms: 5,
    floor: 1,
    totalFloors: 2,
    yearBuilt: 1401,
    city: 'تهران',
    neighborhood: 'لواسان',
    address: 'تهران، لواسان کوچک، کمربندی رجایی، کوی بهار',
    coordinates: {
      lat: 35.8274,
      lng: 51.6241
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'استخر روباز با تصفیه آب اتوماتیک و گرمایش',
      'پارکینگ مسقف برای ۵ خودرو',
      'سوئیت مجزای سرایداری',
      'آلاچیق شیشه‌ای و باربیکیو ذغالی و گازی',
      'چاه آب با مجوز رسمی',
      'کنتور گاز، برق ۳ فاز و تلفن',
      'فضای سبز هلندی با سیستم آبیاری قطره‌ای'
    ],
    description: 'لوکیشن دنج با امنیت بالا در شهرک خصوصی با گیت ورودی و نگهبانی. دارای سند مالکیت ششدانگ عرصه و اعیان، پایان‌کار معتبر شهرداری و استعلامات کامل جهاد کشاورزی و منابع طبیعی.',
    isFeatured: true,
    isUrgent: false,
    documentType: 'سند تک‌برگ',
    consultantId: 'c1',
    createdAt: '۱۴۰۳/۰۶/۰۵',
    viewsCount: 2310,
    savesCount: 175
  },
  {
    id: 'p5',
    title: 'آپارتمان ۱۱۰ متری پاسداران گلستان‌ها، رهن کامل نورگیر عالی',
    slug: 'apartment-pasdaran-110m',
    dealType: 'rent',
    propertyType: 'apartment',
    price: {
      mortgage: 1_800_000_000,
      rent: 0,
      isConvertible: true
    },
    area: 110,
    bedrooms: 2,
    floor: 2,
    totalFloors: 5,
    unitsPerFloor: 2,
    yearBuilt: 1398,
    city: 'تهران',
    neighborhood: 'پاسداران',
    address: 'تهران، پاسداران، گلستان دوم، بن‌بست یاس',
    coordinates: {
      lat: 35.7725,
      lng: 51.4648
    },
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'آسانسور ۶ نفره',
      'پارکینگ سندی بدون مزاحم',
      'انباری بزرگ',
      'بالکن رو به حیاط مشجر',
      'سیستم گرمایش پکیج و رادیاتور',
      'کابینت MDF درجه یک ترک'
    ],
    description: 'رهن کامل بدون اجاره با امکان تمدید چند ساله برای خانواده. مالک منعطف و بسیار محترم، مشاعات بسیار تمیز و مدیریت ساختمانی منظم و آرام.',
    isFeatured: false,
    isUrgent: true,
    documentType: 'سند تک‌برگ',
    consultantId: 'c4',
    createdAt: '۱۴۰۳/۰۶/۱۷',
    viewsCount: 560,
    savesCount: 38
  },
  {
    id: 'p6',
    title: 'برج‌باغ لوکس ۲۰۰ متری الهیه فرشته، طبقات بالا با مشاعات هتلینگ',
    slug: 'apartment-elahieh-200m',
    dealType: 'buy',
    propertyType: 'apartment',
    price: {
      totalPrice: 46_000_000_000,
      pricePerMeter: 230_000_000
    },
    area: 200,
    bedrooms: 3,
    floor: 8,
    totalFloors: 10,
    unitsPerFloor: 2,
    yearBuilt: 1402,
    city: 'تهران',
    neighborhood: 'الهیه',
    address: 'تهران، الهیه، خیابان فرشته، بوستان خزر',
    coordinates: {
      lat: 35.7951,
      lng: 51.4285
    },
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'لابی با ارتفاع سقف ۶ متر و کانتر رسپشن',
      '۳ لاین آسانسور هیوندای پرسرعت',
      '۳ پارکینگ باکس سندی',
      'مجموعه آبی شامل استخر شیشه‌ای، سونا خشک و بخار',
      'سالن اسکواش و سالن ماساژ اختصاصی',
      'خدمات خانه‌داری و والِت پارکینگ'
    ],
    description: 'یکی از شاخص‌ترین برج‌های فرشته با استانداردهای بین‌المللی. نقشه بدون پرتی، تراس وسیع با دید درختان کهنسال الهیه و چشم‌انداز البرز، ۳ خواب بزرگ شامل ۱ مستر کینگ روم با کلوزت مجزا.',
    isFeatured: true,
    isUrgent: false,
    documentType: 'سند تک‌برگ',
    consultantId: 'c3',
    createdAt: '۱۴۰۳/۰۶/۰۸',
    viewsCount: 1890,
    savesCount: 130
  },
  {
    id: 'p7',
    title: 'واحد اداری ۹۵ متری جردن نلسون ماندلا، بر اصلی مناسب شرکت‌ها و مطب',
    slug: 'office-jordan-95m',
    dealType: 'rent',
    propertyType: 'office',
    price: {
      mortgage: 1_200_000_000,
      rent: 35_000_000,
      isConvertible: true
    },
    area: 95,
    bedrooms: 2,
    floor: 3,
    totalFloors: 6,
    unitsPerFloor: 3,
    yearBuilt: 1397,
    city: 'تهران',
    neighborhood: 'جردن',
    address: 'تهران، جردن (نلسون ماندلا)، بالاتر از پل میرداماد',
    coordinates: {
      lat: 35.7648,
      lng: 51.4215
    },
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'موقعیت اداری با تاییدیه شهرداری',
      'آسانسور',
      'پارکینگ اختصاصی مشتری و مدیر',
      'نگهبانی و سرایداری تمام وقت',
      'شبکه داخلی فیبر نوری پرسرعت',
      'سیستم سانترال و دوربین مداربسته'
    ],
    description: 'تابلوخور عالی در بر اصلی نلسون ماندلا. مناسب شرکت‌های فناوری، دفاتر بازرگانی، کلینیک‌های زیبایی و پزشکی، وکلای محترم. دسترسی پیاده ۲ دقیقه‌ای به ایستگاه BRT.',
    isFeatured: false,
    isUrgent: false,
    documentType: 'سند تک‌برگ',
    consultantId: 'c3',
    createdAt: '۱۴۰۳/۰۶/۱۴',
    viewsCount: 430,
    savesCount: 22
  },
  {
    id: 'p8',
    title: 'آپارتمان ۸۵ متری یوسف‌آباد ۲ خوابه بازسازی کامل با نور جنوب',
    slug: 'apartment-yousefabad-85m',
    dealType: 'buy',
    propertyType: 'apartment',
    price: {
      totalPrice: 9_350_000_000,
      pricePerMeter: 110_000_000
    },
    area: 85,
    bedrooms: 2,
    floor: 2,
    totalFloors: 4,
    unitsPerFloor: 2,
    yearBuilt: 1395,
    city: 'تهران',
    neighborhood: 'یوسف‌آباد',
    address: 'تهران، یوسف‌آباد، خیابان اسدآبادی، خیابان ۲۲',
    coordinates: {
      lat: 35.7312,
      lng: 51.4089
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b93e083?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'پارکینگ سندی اختصاصی',
      'انباری جادار ۴ متری',
      'بالکن',
      'کف پارکت چوب طبیعی',
      'کابینت ممبران با گاز رومیزی و هود',
      'سرویس ایرانی و فرنگی وال‌هنگ'
    ],
    description: 'صفر تا صد بازسازی شده با متریال باکیفیت و ژورنالی. بدون یک ریال هزینه اضافی آماده سکونت یا سرمایه‌گذاری با رهن تضمینی ۱.۲ میلیارد تومان.',
    isFeatured: false,
    isUrgent: false,
    documentType: 'سند تک‌برگ',
    consultantId: 'c4',
    createdAt: '۱۴۰۳/۰۶/۱۶',
    viewsCount: 820,
    savesCount: 51
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    consultantId: 'c1',
    authorName: 'دکتر محمدرضا کیانی',
    authorPhoneMasked: '۰۹۱۲***۸۱۱۴',
    date: '۱۴۰۳/۰۶/۰۲',
    ratingCategories: {
      knowledge: 5,
      punctuality: 5,
      negotiation: 4.8,
      honesty: 5
    },
    overallRating: 4.95,
    comment: 'جناب مهندس دادفر تسلط کم‌نظیری بر اسناد و ارزش واقعی املاک شمیران دارند. معامله پنت‌هاوس نیاوران با راهنمایی ایشان بدون کوچک‌ترین ابهام و با بهترین تخفیف انجام شد. بسیار خوش‌قول و پیگیر.',
    verifiedDeal: true,
    helpfulCount: 14
  },
  {
    id: 'r2',
    consultantId: 'c1',
    authorName: 'مهندس بهزاد فرهمند',
    authorPhoneMasked: '۰۹۱۹***۳۴۹۰',
    date: '۱۴۰۳/۰۵/۲۲',
    ratingCategories: {
      knowledge: 5,
      punctuality: 4.5,
      negotiation: 5,
      honesty: 5
    },
    overallRating: 4.87,
    comment: 'بسیار حرفه‌ای و صبور. حتی در روز تعطیل هماهنگی بازدید رو به نحو احسن انجام دادند و در جلسه قرارداد حافظ منافع هر دو طرف بودند.',
    verifiedDeal: true,
    helpfulCount: 8
  },
  {
    id: 'r3',
    consultantId: 'c2',
    authorName: 'خانم الهام شریفی',
    authorPhoneMasked: '۰۹۱۲***۹۹۴۵',
    date: '۱۴۰۳/۰۵/۲۸',
    ratingCategories: {
      knowledge: 4.8,
      punctuality: 5,
      negotiation: 4.7,
      honesty: 5
    },
    overallRating: 4.88,
    comment: 'خانم صبوری با دقت بالا و بررسی بند به بند قرارداد اجاره، خیال ما رو بابت تضمین تخلیه و پرداخت‌ها راحت کردند. حتما به دوستانم پیشنهاد خواهم داد.',
    verifiedDeal: true,
    helpfulCount: 11
  },
  {
    id: 'r4',
    consultantId: 'c3',
    authorName: 'علیرضا تهرانی',
    authorPhoneMasked: '۰۹۳۵***۲۲۱۱',
    date: '۱۴۰۳/۰۵/۱۵',
    ratingCategories: {
      knowledge: 4.7,
      punctuality: 4.6,
      negotiation: 4.8,
      honesty: 4.7
    },
    overallRating: 4.7,
    comment: 'آقای رستمی شناخت عمیقی از پروژه‌های لوکس منطقه فرشته دارند. فایل‌های اختصاصی و مونوپولی در اختیارشان است که در هیچ دپارتمان دیگری ندیدم.',
    verifiedDeal: true,
    helpfulCount: 6
  }
];

export const INITIAL_BOOKINGS: BookingVisit[] = [
  {
    id: 'b1',
    propertyId: 'p2',
    propertyTitle: 'آپارتمان ۱۶۰ متری سعادت‌آباد ۳ خوابه نوساز کلید نخورده',
    propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80',
    consultantId: 'c2',
    consultantName: 'سحر صبوری',
    applicantName: 'امیرحسین رضایی',
    applicantPhone: '۰۹۱۲۵۵۵۷۷۲۲',
    date: '۱۴۰۳/۰۶/۲۵',
    timeSlot: '۱۷:۰۰ الی ۱۹:۰۰',
    visitType: 'in_person',
    status: 'confirmed',
    notes: 'لطفا کلید واحد و دسترسی به روف‌گاردن و پارکینگ هم فراهم باشد.',
    createdAt: '۱۴۰۳/۰۶/۲۰'
  },
  {
    id: 'b2',
    propertyId: 'p1',
    propertyTitle: 'پنت‌هاوس مدرن ۲۸۰ متری نیاوران با دید ابدی کل شهر و کوهستان',
    propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80',
    consultantId: 'c1',
    consultantName: 'مهندس آریا دادفر',
    applicantName: 'امیرحسین رضایی',
    applicantPhone: '۰۹۱۲۵۵۵۷۷۲۲',
    date: '۱۴۰۳/۰۶/۲۸',
    timeSlot: '۱۱:۰۰ الی ۱۳:۰۰',
    visitType: 'video_call',
    status: 'pending',
    notes: 'بازدید آنلاین تصویری با واتس‌اپ قبل از حضور خانواده.',
    createdAt: '۱۴۰3/۰۶/۲۱'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    propertyId: 'p1',
    propertyTitle: 'پنت‌هاوس مدرن ۲۸۰ متری نیاوران',
    propertyPrice: '۵۶ میلیارد تومان',
    propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80',
    participantUser: {
      id: 'u1',
      name: 'امیرحسین رضایی',
      phone: '۰۹۱۲۵۵۵۷۷۲۲'
    },
    consultant: {
      id: 'c1',
      name: 'مهندس آریا دادفر',
      agency: 'دپارتمان تخصصی املاک نگین نیاوران',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
    },
    lastMessage: 'سلام و احترام، اسناد واحد کاملا آماده استعلام و تک‌برگ است. فردا ساعت ۱۷ تشریف بیاورید.',
    lastMessageTime: '۱۰ دقیقه پیش',
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        conversationId: 'conv1',
        senderId: 'u1',
        senderName: 'امیرحسین رضایی',
        senderType: 'buyer',
        text: 'سلام مهندس دادفر، در خصوص این پنت‌هاوس آیا شرایط پرداخت اقساطی یا تهاتر با ملک دیگر هم مقدوره؟',
        timestamp: '۱۰:۳۰',
        isRead: true
      },
      {
        id: 'm2',
        conversationId: 'conv1',
        senderId: 'c1',
        senderName: 'مهندس آریا دادفر',
        senderType: 'consultant',
        text: 'سلام و درود خدمت شما. مالک تا ۳۰ درصد مبلغ رو با آپارتمان سنددار در منطقه ۱ یا خودروی پلاک ملی تهاتر میکنند و مابقی نقد در ۲ قسط.',
        timestamp: '۱۰:۳۵',
        isRead: true
      },
      {
        id: 'm3',
        conversationId: 'conv1',
        senderId: 'u1',
        senderName: 'امیرحسین رضایی',
        senderType: 'buyer',
        text: 'عالیه، سند ملک چه نوعی است و امکان هماهنگی برای بازدید فردا عصر وجود داره؟',
        timestamp: '۱۰:۴۲',
        isRead: true
      },
      {
        id: 'm4',
        conversationId: 'conv1',
        senderId: 'c1',
        senderName: 'مهندس آریا دادفر',
        senderType: 'consultant',
        text: 'سلام و احترام، اسناد واحد کاملا آماده استعلام و تک‌برگ است. فردا ساعت ۱۷ تشریف بیاورید.',
        timestamp: '۱۰:۴۵',
        isRead: false
      }
    ]
  },
  {
    id: 'conv2',
    propertyId: 'p2',
    propertyTitle: 'آپارتمان ۱۶۰ متری سعادت‌آباد ۳ خوابه',
    propertyPrice: 'ودیعه ۲.۵ میلیارد + ۴۵ م',
    propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80',
    participantUser: {
      id: 'u1',
      name: 'امیرحسین رضایی',
      phone: '۰۹۱۲۵۵۵۷۷۲۲'
    },
    consultant: {
      id: 'c2',
      name: 'سحر صبوری',
      agency: 'املاک بارمان سعادت‌آباد',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    lastMessage: 'درخواست بازدید شما برای روز پنجشنبه ساعت ۱۷ ثبت شد.',
    lastMessageTime: 'دیروز',
    unreadCount: 0,
    messages: [
      {
        id: 'm5',
        conversationId: 'conv2',
        senderId: 'u1',
        senderName: 'امیرحسین رضایی',
        senderType: 'buyer',
        text: 'سلام خانم صبوری، آیا ودیعه تا ۲ میلیارد قابل تبدیل به اجاره بیشتر هست؟',
        timestamp: '۱۶:۲۰',
        isRead: true
      },
      {
        id: 'm6',
        conversationId: 'conv2',
        senderId: 'c2',
        senderName: 'سحر صبوری',
        senderType: 'consultant',
        text: 'سلام وقتتون بخیر. بله با نرخ استاندارد ۳ درصد قابل تبدیل هست و مالک انعطاف دارند. درخواست بازدید شما برای روز پنجشنبه ساعت ۱۷ ثبت شد.',
        timestamp: '۱۶:۲۵',
        isRead: true
      }
    ]
  }
];

export const CURRENT_USER: UserProfile = {
  id: 'u1',
  name: 'امیرحسین رضایی',
  phone: '۰۹۱۲۵۵۵۷۷۲۲',
  role: 'user', // can be toggled to 'consultant' in panel
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  isVerified: true,
  savedPropertyIds: ['p1', 'p2']
};
