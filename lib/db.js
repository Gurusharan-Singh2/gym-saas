const knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment] || knexConfig.development;

let dbInstance = null;
let isMySqlAvailable = null;

// Initial in-memory mock store initialized with default luxury seed data
// used seamlessly as high-fidelity fallback if MySQL is not running locally.
const mockStore = {
  users: [
    {
      id: 1,
      name: 'Alexander Vance',
      email: 'admin@auragym.com',
      password_hash: '$2a$10$7vU3kLgXF9pYjC12B6fC8.8U3.X2W7E5aQZt0rK4b5qC0i6fO1H6a', // Admin@12345
      role: 'admin',
      phone: '+1 (555) 234-5678',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Elena Rostova',
      email: 'staff@auragym.com',
      password_hash: '$2a$10$7vU3kLgXF9pYjC12B6fC8.8U3.X2W7E5aQZt0rK4b5qC0i6fO1H6a', // Staff@12345
      role: 'staff',
      phone: '+1 (555) 345-6789',
      avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Marcus Sterling',
      email: 'member@auragym.com',
      password_hash: '$2a$10$7vU3kLgXF9pYjC12B6fC8.8U3.X2W7E5aQZt0rK4b5qC0i6fO1H6a', // Member@12345
      role: 'member',
      phone: '+1 (555) 456-7890',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  membership_plans: [
    {
      id: 1,
      name: 'Essential Club',
      slug: 'essential-club',
      tag_line: 'Ideal for dedicated athletes focusing on independent performance and strength.',
      price_monthly: 89.00,
      price_yearly: 890.00,
      features: [
        'Full access to all Strength & Cardio floors',
        'State-of-the-art Eleiko & Hammer Strength zones',
        'Locker rooms with eucalyptus steam showers',
        'AURA Mobile App with workout logging',
        'Complimentary towel & sauna access',
      ],
      is_popular: false,
      is_active: true,
      sort_order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Elite Performance',
      slug: 'elite-performance',
      tag_line: 'Our most comprehensive tier for studio enthusiasts and coached group training.',
      price_monthly: 149.00,
      price_yearly: 1490.00,
      features: [
        'All Essential Club benefits',
        'Unlimited Studio Classes (HIIT, Boxing, Pilates, Yoga)',
        'Bi-weekly InBody 770 body composition analysis',
        '2 Guest passes per month',
        'Infrared sauna & cold plunge circuit access',
        '10% Discount on AURA Protein & Fuel Bar',
      ],
      is_popular: true,
      is_active: true,
      sort_order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Executive Black',
      slug: 'executive-black',
      tag_line: 'The ultimate bespoke wellness and performance experience with dedicated coaching.',
      price_monthly: 249.00,
      price_yearly: 2490.00,
      features: [
        'All Elite Performance benefits',
        '4 Private 1-on-1 Personal Training sessions monthly',
        'Personalized nutrition & biometric strategy',
        'Reserved luxury locker with laundry service',
        'Unlimited guest privileges',
        'Priority studio & recovery suite booking',
        'VIP access to private member rooftop lounge',
      ],
      is_popular: false,
      is_active: true,
      sort_order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  trainers: [
    {
      id: 1,
      name: 'Marcus Vance',
      title: 'Head of Strength & Conditioning',
      bio: 'Former Olympic weightlifting coach with 12+ years optimizing athletic power, biomechanics, and structural resilience.',
      specialties: ['Olympic Lifting', 'Hypertrophy', 'Biomechanics', 'Strength Coaching'],
      experience_years: 12,
      photo_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&auto=format&fit=crop&q=80',
      instagram: 'https://instagram.com/marcusvance_fit',
      twitter: 'https://twitter.com/marcusvance',
      linkedin: 'https://linkedin.com/in/marcus-vance',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Sienna Hayes',
      title: 'Lead HIIT & Conditioning Master',
      bio: 'Specialist in metabolic conditioning, cardiovascular threshold training, and high-energy group kinetics.',
      specialties: ['Metabolic HIIT', 'Endurance', 'Kettlebells', 'Heart Rate Training'],
      experience_years: 8,
      photo_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      instagram: 'https://instagram.com/siennahayes_coach',
      twitter: 'https://twitter.com/siennahayes',
      linkedin: 'https://linkedin.com/in/sienna-hayes',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Darius Thorne',
      title: 'Combat & Boxing Director',
      bio: 'Golden Gloves champion turned technical combat coach. Dedicated to rotational power, agility, and mental sharpness.',
      specialties: ['Boxing Fundamentals', 'Combat Conditioning', 'Footwork', 'Reflex Training'],
      experience_years: 10,
      photo_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
      instagram: 'https://instagram.com/dariusthorne_box',
      twitter: 'https://twitter.com/dariusthorne',
      linkedin: 'https://linkedin.com/in/darius-thorne',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Aria Montgomery',
      title: 'Reformer Pilates & Mobility Specialist',
      bio: 'Classical Pilates master and neuromuscular therapist focused on core architecture, pelvic stability, and spinal decompression.',
      specialties: ['Reformer Pilates', 'Spinal Alignment', 'Deep Core', 'Postural Restoration'],
      experience_years: 9,
      photo_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
      instagram: 'https://instagram.com/ariamontgomery_pilates',
      twitter: 'https://twitter.com/ariamontgomery',
      linkedin: 'https://linkedin.com/in/aria-montgomery',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Kai Nakamura',
      title: 'Yoga & Recovery Physiologist',
      bio: 'Integrates ancient breathwork mastery with modern fascia release and infrared mobility restoration.',
      specialties: ['Vinyasa Flow', 'Fascial Release', 'Breathwork', 'Nervous System Recovery'],
      experience_years: 7,
      photo_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
      instagram: 'https://instagram.com/kainakamura_flow',
      twitter: 'https://twitter.com/kainakamura',
      linkedin: 'https://linkedin.com/in/kai-nakamura',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 6,
      name: 'Valerie Moreau',
      title: 'Clinical Nutrition & Body Recomposition',
      bio: 'Registered Sports Dietitian helping athletes fuel precision adaptations and sustainable fat loss.',
      specialties: ['Macro Periodization', 'Hypertrophy Fueling', 'Metabolic Health', 'Gut Wellness'],
      experience_years: 11,
      photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
      instagram: 'https://instagram.com/valeriemoreau_nutrition',
      twitter: 'https://twitter.com/valeriemoreau',
      linkedin: 'https://linkedin.com/in/valerie-moreau',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  classes: [
    {
      id: 1,
      title: 'Titan Strength & Barbells',
      description: 'Foundational strength training focusing on squats, deadlifts, and bench press under elite coaching.',
      category: 'Strength',
      level: 'All Levels',
      duration_minutes: 60,
      capacity: 14,
      intensity: 'High',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      trainer_id: 1,
      trainer_name: 'Marcus Vance',
      day_of_week: 'Monday',
      start_time: '06:30',
      end_time: '07:30',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Metabolic Inferno HIIT',
      description: 'High-octane interval conditioning utilizing SkiErgs, assault bikes, and kettlebell complexes.',
      category: 'HIIT',
      level: 'Intermediate',
      duration_minutes: 45,
      capacity: 20,
      intensity: 'Maximum',
      image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      trainer_id: 2,
      trainer_name: 'Sienna Hayes',
      day_of_week: 'Monday',
      start_time: '08:00',
      end_time: '08:45',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Precision Reformer Pilates',
      description: 'Sculpt core musculature, correct postural deficits, and lengthen fascia on custom Allegro 2 reformers.',
      category: 'Pilates',
      level: 'All Levels',
      duration_minutes: 50,
      capacity: 12,
      intensity: 'Medium',
      image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
      trainer_id: 4,
      trainer_name: 'Aria Montgomery',
      day_of_week: 'Tuesday',
      start_time: '07:00',
      end_time: '07:50',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      title: 'Apex Combat Boxing',
      description: 'Technical heavy bag drills, pad combinations, head movement, and core conditioning.',
      category: 'Boxing',
      level: 'Intermediate',
      duration_minutes: 55,
      capacity: 16,
      intensity: 'High',
      image_url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop&q=80',
      trainer_id: 3,
      trainer_name: 'Darius Thorne',
      day_of_week: 'Tuesday',
      start_time: '18:00',
      end_time: '18:55',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 5,
      title: 'Olympic Weightlifting Clinic',
      description: 'Snatch and Clean & Jerk progression drills with real-time video feedback analysis.',
      category: 'Strength',
      level: 'Advanced',
      duration_minutes: 75,
      capacity: 10,
      intensity: 'High',
      image_url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
      trainer_id: 1,
      trainer_name: 'Marcus Vance',
      day_of_week: 'Wednesday',
      start_time: '17:30',
      end_time: '18:45',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 6,
      title: 'Aura Thermal Recovery & Flow',
      description: 'Gentle mobility flow followed by guided breathwork and contrast therapy integration.',
      category: 'Recovery',
      level: 'All Levels',
      duration_minutes: 50,
      capacity: 15,
      intensity: 'Low',
      image_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
      trainer_id: 5,
      trainer_name: 'Kai Nakamura',
      day_of_week: 'Thursday',
      start_time: '19:00',
      end_time: '19:50',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 7,
      title: 'Full Body Hybrid Shred',
      description: 'Endurance lifting, sled pushes, and rowing intervals for total metabolic transformation.',
      category: 'HIIT',
      level: 'All Levels',
      duration_minutes: 50,
      capacity: 18,
      intensity: 'High',
      image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
      trainer_id: 2,
      trainer_name: 'Sienna Hayes',
      day_of_week: 'Friday',
      start_time: '07:30',
      end_time: '08:20',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 8,
      title: 'Weekend Warriors Athletic Club',
      description: 'Team-based functional athletic circuit testing cardiovascular endurance, power, and camaraderie.',
      category: 'Strength',
      level: 'All Levels',
      duration_minutes: 60,
      capacity: 24,
      intensity: 'High',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      trainer_id: 1,
      trainer_name: 'Marcus Vance',
      day_of_week: 'Saturday',
      start_time: '09:00',
      end_time: '10:00',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 9,
      title: 'Mindful Vinyasa Alignment',
      description: 'Dynamic flow linking breath to deliberate posture, enhancing joint longevity and mental clarity.',
      category: 'Yoga',
      level: 'All Levels',
      duration_minutes: 60,
      capacity: 16,
      intensity: 'Medium',
      image_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=80',
      trainer_id: 5,
      trainer_name: 'Kai Nakamura',
      day_of_week: 'Sunday',
      start_time: '10:30',
      end_time: '11:30',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  members: [
    {
      id: 1,
      user_id: 3,
      first_name: 'Marcus',
      last_name: 'Sterling',
      email: 'member@auragym.com',
      phone: '+1 (555) 456-7890',
      membership_plan_id: 2,
      plan_name: 'Elite Performance',
      status: 'active',
      join_date: '2025-01-15',
      expiry_date: '2026-01-15',
      emergency_contact: 'Victoria Sterling (+1 555-987-6543)',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      user_id: null,
      first_name: 'Sophia',
      last_name: 'Chen',
      email: 'sophia.chen@example.com',
      phone: '+1 (555) 321-7654',
      membership_plan_id: 3,
      plan_name: 'Executive Black',
      status: 'active',
      join_date: '2025-02-01',
      expiry_date: '2026-02-01',
      emergency_contact: 'David Chen (+1 555-111-2222)',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      user_id: null,
      first_name: 'Julian',
      last_name: 'Duval',
      email: 'julian.duval@example.com',
      phone: '+1 (555) 789-0123',
      membership_plan_id: 2,
      plan_name: 'Elite Performance',
      status: 'active',
      join_date: '2025-03-10',
      expiry_date: '2026-03-10',
      emergency_contact: 'Claire Duval (+1 555-222-3333)',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      user_id: null,
      first_name: 'Camilla',
      last_name: 'Rodriguez',
      email: 'camilla.r@example.com',
      phone: '+1 (555) 654-3210',
      membership_plan_id: 1,
      plan_name: 'Essential Club',
      status: 'frozen',
      join_date: '2024-11-20',
      expiry_date: '2025-11-20',
      emergency_contact: 'Carlos Rodriguez (+1 555-333-4444)',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 5,
      user_id: null,
      first_name: 'Harrison',
      last_name: 'Wells',
      email: 'harrison.wells@example.com',
      phone: '+1 (555) 901-2345',
      membership_plan_id: 3,
      plan_name: 'Executive Black',
      status: 'active',
      join_date: '2025-04-05',
      expiry_date: '2026-04-05',
      emergency_contact: 'Jessica Wells (+1 555-444-5555)',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 6,
      user_id: null,
      first_name: 'Olivia',
      last_name: 'Sinclair',
      email: 'olivia.sinclair@example.com',
      phone: '+1 (555) 123-9876',
      membership_plan_id: 1,
      plan_name: 'Essential Club',
      status: 'expired',
      join_date: '2024-05-12',
      expiry_date: '2025-05-12',
      emergency_contact: 'Nathan Sinclair (+1 555-555-6666)',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  testimonials: [
    {
      id: 1,
      author_name: 'Lord Richard Kensington',
      author_title: 'Managing Director, Kensington Capital',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      quote: 'AURA ATHLETICS has redefined what an athletic club should be. The level of equipment, the immaculate architecture, and the caliber of coaching is unmatched in the city.',
      rating: 5,
      is_approved: true,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      author_name: 'Dr. Evelyn Martinez',
      author_title: 'Orthopedic Surgeon & Marathoner',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      quote: 'The recovery suite with infrared sauna and cold plunge after a brutal barbell session is sublime. My recovery time has cut in half, allowing me to train consistently at an elite level.',
      rating: 5,
      is_approved: true,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      author_name: 'Julian Montgomery',
      author_title: 'Tech Founder & Biohacker',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
      quote: 'From custom Eleiko calibrated plates to personalized biometric analysis, AURA feels more like a private high-performance facility for professionals who accept no compromises.',
      rating: 5,
      is_approved: true,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      author_name: 'Seraphina De Luca',
      author_title: 'Creative Director',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      quote: 'The Reformer Pilates studio with Aria is transformative. The atmosphere is calm, luxurious, and intensely focused on precision movement.',
      rating: 5,
      is_approved: true,
      is_featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  gallery: [
    {
      id: 1,
      title: 'The Heavy Iron Pit',
      category: 'Strength',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80',
      caption: 'Custom calibrated Eleiko barbells and dumbbell racks ranging up to 150 lbs.',
      sort_order: 1,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Performance Cardio Deck',
      category: 'Cardio',
      image_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&auto=format&fit=crop&q=80',
      caption: 'Woodway curved treadmills and Concept2 performance suites with ambient lighting.',
      sort_order: 2,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Reformer Pilates Studio',
      category: 'Studio',
      image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&auto=format&fit=crop&q=80',
      caption: 'Private custom maplewood Allegro 2 reformers with natural daylight.',
      sort_order: 3,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 4,
      title: 'Nordic Contrast Recovery Suite',
      category: 'Wellness',
      image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&auto=format&fit=crop&q=80',
      caption: 'Finnish cedarwood dry saunas, infrared suites, and 38°F plunge pools.',
      sort_order: 4,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 5,
      title: 'Executive Locker Suites',
      category: 'Facility',
      image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&auto=format&fit=crop&q=80',
      caption: 'Private walnut lockers, Dyson styling bars, and eucalyptus mist showers.',
      sort_order: 5,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 6,
      title: 'The Combat Ring & Bag Suite',
      category: 'Studio',
      image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80',
      caption: 'Custom leather water bags, speed bags, and professional canvas ring.',
      sort_order: 6,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  blog_posts: [
    {
      id: 1,
      title: 'The Science of Contrast Therapy: Combining Sauna & Cold Plunge for Hyper-Recovery',
      slug: 'science-of-contrast-therapy',
      excerpt: 'How cycling between 190°F Finnish saunas and 40°F cold plunges accelerates mitochondrial adaptation and downregulates systemic inflammation.',
      content: `Contrast therapy—alternating between extreme heat and cold exposure—is one of the most clinically verified protocols for accelerating athletic recovery, enhancing dopamine baseline, and promoting deep cellular repair.\n\n### The Heat Phase: Vasodilation & Heat Shock Proteins\nWhen you step into a 180°F–200°F dry sauna, your heart rate elevates to 120–150 BPM, mimicking moderate cardiovascular exercise. Vasodilation floods fatigued muscle tissues with oxygenated blood, while Heat Shock Proteins (HSPs) repair misfolded cellular proteins and protect against sarcopenia.\n\n### The Cold Phase: Vasoconstriction & Norepinephrine Surge\nTransitioning directly into a 38°F–42°F plunge initiates rapid vasoconstriction, driving blood inward to protect vital organs and flushing metabolic waste products out of extremities. The sudden cold trigger produces a sustained 250% increase in baseline norepinephrine, boosting mood and mental resilience for hours.\n\n### The Recommended AURA Protocol\n1. 15 Minutes Sauna (185°F)\n2. 3 Minutes Cold Plunge (40°F)\n3. Repeat for 3 rounds, always finishing with cold for anti-inflammatory benefits.`,
      cover_image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&auto=format&fit=crop&q=80',
      category: 'Recovery & Longevity',
      author_name: 'Kai Nakamura & Dr. Evelyn Martinez',
      read_time: '6 min read',
      is_published: true,
      published_at: '2025-08-10',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Periodization for Peak Power: Why Constant Max Effort Limits Long-Term Strength',
      slug: 'periodization-for-peak-power',
      excerpt: 'Learn the difference between progressive overload and systemic burnout, and how elite lifters wave intensity to smash plateaus.',
      content: `Training to failure on every single workout is the fastest route to nervous system fatigue and joint breakdown. Elite performance demands intelligent periodization—structuring training blocks into accumulation, intensification, and deload phases.\n\n### 1. Accumulation Phase (Hypertrophy & Work Capacity)\nFocus on higher volume (3-5 sets of 8-12 reps) at 65-75% 1RM. The goal is structural reinforcement and cross-sectional muscle growth.\n\n### 2. Intensification Phase (Neural Adaptation)\nDrop volume and increase load (4-6 sets of 3-5 reps) at 80-90% 1RM. Here, the central nervous system learns to recruit high-threshold motor units simultaneously.\n\n### 3. Deload & Realization\nA 1-week strategic volume reduction allows deep fatigue to dissipate, revealing supercompensated strength gains.`,
      cover_image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80',
      category: 'Strength & Conditioning',
      author_name: 'Marcus Vance',
      read_time: '8 min read',
      is_published: true,
      published_at: '2025-08-18',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: 'Optimal Protein Timing and Nutrient Partitioning for Lean Mass Accrual',
      slug: 'protein-timing-nutrient-partitioning',
      excerpt: 'Demystifying the anabolic window: how leucine thresholds and carbohydrate timing optimize glycogen replenishment.',
      content: `While total daily macronutrient intake is the primary driver of body composition, nutrient timing becomes crucial when optimizing muscle protein synthesis (MPS) and performance.\n\n### The Leucine Trigger\nTo maximize MPS, each meal should contain at least 2.5 to 3.5 grams of the essential amino acid leucine (equivalent to roughly 30-40g of high-quality animal or fortified plant protein).\n\n### Peri-Workout Fueling\nConsuming easily digestible carbohydrates paired with essential amino acids 45 minutes prior to intensive training ensures elevated intra-muscular glycogen availability, reducing cortisol spikes during strenuous sessions.`,
      cover_image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1000&auto=format&fit=crop&q=80',
      category: 'Nutrition & Fuel',
      author_name: 'Valerie Moreau, RD',
      read_time: '5 min read',
      is_published: true,
      published_at: '2025-08-25',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ],
  contact_submissions: [
    {
      id: 1,
      name: 'Jonathan Sterling',
      email: 'jonathan.sterling@example.com',
      phone: '+1 (555) 777-8899',
      subject: 'Private Executive Membership Tour',
      message: 'Hello, I would like to schedule a private tour of the facilities and discuss the Executive Black tier with personal coaching.',
      is_read: true,
      created_at: '2025-08-26T10:00:00.000Z',
      updated_at: '2025-08-26T10:00:00.000Z',
    },
    {
      id: 2,
      name: 'Charlotte Dubois',
      email: 'charlotte.dubois@example.com',
      phone: '+1 (555) 888-9900',
      subject: 'Reformer Pilates Guest Pass Inquiry',
      message: 'I am interested in trying out the Reformer Pilates studio before committing to the Elite Performance membership. Are trial passes available?',
      is_read: false,
      created_at: '2025-08-28T14:30:00.000Z',
      updated_at: '2025-08-28T14:30:00.000Z',
    }
  ],
  site_settings: [
    { id: 1, setting_key: 'site_name', setting_value: 'AURA ATHLETICS', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 2, setting_key: 'site_tagline', setting_value: 'The Pinnacle of Strength, Movement & Holistic Wellness', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 3, setting_key: 'contact_email', setting_value: 'concierge@auragym.com', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 4, setting_key: 'contact_phone', setting_value: '+1 (800) 555-AURA', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 5, setting_key: 'address', setting_value: '450 Lexington Avenue, Luxury District, New York, NY 10017', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 6, setting_key: 'hours_weekdays', setting_value: '05:00 AM – 11:00 PM', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 7, setting_key: 'hours_weekends', setting_value: '06:00 AM – 10:00 PM', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 8, setting_key: 'instagram_url', setting_value: 'https://instagram.com/aura_athletics', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 9, setting_key: 'twitter_url', setting_value: 'https://twitter.com/aura_athletics', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    { id: 10, setting_key: 'youtube_url', setting_value: 'https://youtube.com/@aura_athletics', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  ]
};

function getDb() {
  if (!dbInstance) {
    dbInstance = knex(config);
  }
  return dbInstance;
}

// Resilient DB querying interface
const db = {
  rawKnex: getDb,

  async isConnected() {
    if (isMySqlAvailable !== null) return isMySqlAvailable;
    try {
      const k = getDb();
      await k.raw('SELECT 1');
      isMySqlAvailable = true;
      return true;
    } catch {
      isMySqlAvailable = false;
      return false;
    }
  },

  async query(tableName) {
    const connected = await this.isConnected();
    if (connected) {
      return getDb()(tableName);
    }
    // Return mock query handler
    return this.mockTable(tableName);
  },

  mockTable(tableName) {
    const tableData = mockStore[tableName] || [];

    return {
      async select() {
        return [...tableData];
      },
      async where(condition, val) {
        if (typeof condition === 'object') {
          return tableData.filter((row) =>
            Object.entries(condition).every(([k, v]) => row[k] == v)
          );
        }
        if (typeof condition === 'string' && val !== undefined) {
          return tableData.filter((row) => row[condition] == val);
        }
        return [...tableData];
      },
      async first() {
        return tableData[0] || null;
      },
      async insert(newData) {
        const rows = Array.isArray(newData) ? newData : [newData];
        const insertedIds = [];
        for (const row of rows) {
          const maxId = tableData.reduce((max, r) => Math.max(max, r.id || 0), 0);
          const newRow = {
            id: row.id || maxId + 1,
            ...row,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          tableData.push(newRow);
          insertedIds.push(newRow.id);
        }
        return insertedIds;
      },
      async update(updateData) {
        let count = 0;
        for (const row of tableData) {
          Object.assign(row, updateData, { updated_at: new Date().toISOString() });
          count++;
        }
        return count;
      },
      async delete() {
        const len = tableData.length;
        tableData.length = 0;
        return len;
      },
      orderBy(col, direction = 'asc') {
        const sorted = [...tableData].sort((a, b) => {
          if (a[col] < b[col]) return direction === 'asc' ? -1 : 1;
          if (a[col] > b[col]) return direction === 'asc' ? 1 : -1;
          return 0;
        });
        return {
          async select() { return sorted; },
          async first() { return sorted[0] || null; }
        };
      }
    };
  },

  // Direct table access helpers for consistent CRUD
  async getTable(tableName) {
    const connected = await this.isConnected();
    if (connected) {
      try {
        const rows = await getDb()(tableName).select('*');
        // Parse JSON fields if string
        return rows.map((r) => {
          if (r.features && typeof r.features === 'string') {
            try { r.features = JSON.parse(r.features); } catch {}
          }
          if (r.specialties && typeof r.specialties === 'string') {
            try { r.specialties = JSON.parse(r.specialties); } catch {}
          }
          return r;
        });
      } catch {
        return mockStore[tableName] || [];
      }
    }
    return mockStore[tableName] || [];
  },

  async findById(tableName, id) {
    const connected = await this.isConnected();
    if (connected) {
      try {
        const row = await getDb()(tableName).where({ id: Number(id) }).first();
        if (!row) return null;
        if (row.features && typeof row.features === 'string') {
          try { row.features = JSON.parse(row.features); } catch {}
        }
        if (row.specialties && typeof row.specialties === 'string') {
          try { row.specialties = JSON.parse(row.specialties); } catch {}
        }
        return row;
      } catch {
        return (mockStore[tableName] || []).find((r) => r.id === Number(id)) || null;
      }
    }
    return (mockStore[tableName] || []).find((r) => r.id === Number(id)) || null;
  },

  async insert(tableName, data) {
    const formattedData = { ...data };
    if (formattedData.features && typeof formattedData.features !== 'string') {
      formattedData.features = JSON.stringify(formattedData.features);
    }
    if (formattedData.specialties && typeof formattedData.specialties !== 'string') {
      formattedData.specialties = JSON.stringify(formattedData.specialties);
    }

    const connected = await this.isConnected();
    if (connected) {
      try {
        const [id] = await getDb()(tableName).insert(formattedData);
        return { id, ...data };
      } catch {
        // Fallback to in-memory
      }
    }

    const store = mockStore[tableName] || [];
    const maxId = store.reduce((max, r) => Math.max(max, r.id || 0), 0);
    const newRecord = {
      id: maxId + 1,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.push(newRecord);
    return newRecord;
  },

  async update(tableName, id, data) {
    const formattedData = { ...data };
    if (formattedData.features && typeof formattedData.features !== 'string') {
      formattedData.features = JSON.stringify(formattedData.features);
    }
    if (formattedData.specialties && typeof formattedData.specialties !== 'string') {
      formattedData.specialties = JSON.stringify(formattedData.specialties);
    }
    formattedData.updated_at = new Date();

    const connected = await this.isConnected();
    if (connected) {
      try {
        await getDb()(tableName).where({ id: Number(id) }).update(formattedData);
        return await this.findById(tableName, id);
      } catch {
        // Fallback to in-memory
      }
    }

    const store = mockStore[tableName] || [];
    const index = store.findIndex((r) => r.id === Number(id));
    if (index !== -1) {
      store[index] = { ...store[index], ...data, updated_at: new Date().toISOString() };
      return store[index];
    }
    return null;
  },

  async delete(tableName, id) {
    const connected = await this.isConnected();
    if (connected) {
      try {
        const count = await getDb()(tableName).where({ id: Number(id) }).delete();
        return count > 0;
      } catch {
        // Fallback to in-memory
      }
    }

    const store = mockStore[tableName] || [];
    const index = store.findIndex((r) => r.id === Number(id));
    if (index !== -1) {
      store.splice(index, 1);
      return true;
    }
    return false;
  }
};

module.exports = db;
