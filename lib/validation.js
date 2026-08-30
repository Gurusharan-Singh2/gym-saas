const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().min(7, 'Please provide a valid phone number').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const memberSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Valid phone number is required'),
  membership_plan_id: z.coerce.number().positive('Please select a membership plan'),
  status: z.enum(['active', 'expired', 'frozen', 'pending']).default('active'),
  join_date: z.string().min(1, 'Join date is required'),
  expiry_date: z.string().min(1, 'Expiry date is required'),
  emergency_contact: z.string().optional().nullable(),
});

const trainerSchema = z.object({
  name: z.string().min(2, 'Trainer name is required'),
  title: z.string().min(2, 'Professional title is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  specialties: z.array(z.string()).min(1, 'At least one specialty is required'),
  experience_years: z.coerce.number().min(0, 'Experience years cannot be negative'),
  photo_url: z.string().url('A valid photo URL is required'),
  instagram: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
});

const planSchema = z.object({
  name: z.string().min(2, 'Plan name is required'),
  slug: z.string().min(2, 'Plan slug is required'),
  tag_line: z.string().min(5, 'Tag line is required'),
  price_monthly: z.coerce.number().positive('Monthly price must be greater than 0'),
  price_yearly: z.coerce.number().positive('Yearly price must be greater than 0'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  is_popular: z.boolean().default(false),
  is_active: z.boolean().default(true),
  sort_order: z.coerce.number().default(0),
});

const classSchema = z.object({
  title: z.string().min(2, 'Class title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  level: z.string().min(2, 'Level is required'),
  duration_minutes: z.coerce.number().positive('Duration must be positive'),
  capacity: z.coerce.number().positive('Capacity must be positive'),
  intensity: z.string().default('Medium'),
  image_url: z.string().url().optional().nullable().or(z.literal('')),
  trainer_id: z.coerce.number().positive('Please assign a trainer'),
  day_of_week: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  start_time: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Valid start time (HH:MM) is required'),
  end_time: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, 'Valid end time (HH:MM) is required'),
  is_active: z.boolean().default(true),
});

const testimonialSchema = z.object({
  author_name: z.string().min(2, 'Author name is required'),
  author_title: z.string().min(2, 'Author title is required'),
  avatar_url: z.string().url().optional().nullable().or(z.literal('')),
  quote: z.string().min(10, 'Quote must be at least 10 characters'),
  rating: z.coerce.number().min(1).max(5).default(5),
  is_approved: z.boolean().default(true),
  is_featured: z.boolean().default(false),
});

const gallerySchema = z.object({
  title: z.string().min(2, 'Image title is required'),
  category: z.string().min(2, 'Category is required'),
  image_url: z.string().url('A valid image URL is required'),
  caption: z.string().optional().nullable(),
  sort_order: z.coerce.number().default(0),
  is_active: z.boolean().default(true),
});

const blogSchema = z.object({
  title: z.string().min(3, 'Article title is required'),
  slug: z.string().min(3, 'Article slug is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  cover_image: z.string().url('Cover image URL is required'),
  category: z.string().min(2, 'Category is required'),
  author_name: z.string().min(2, 'Author name is required'),
  read_time: z.string().default('5 min read'),
  is_published: z.boolean().default(true),
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().optional().nullable(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const settingsSchema = z.record(z.string(), z.any());

module.exports = {
  loginSchema,
  registerSchema,
  memberSchema,
  trainerSchema,
  planSchema,
  classSchema,
  testimonialSchema,
  gallerySchema,
  blogSchema,
  contactSchema,
  settingsSchema,
};
