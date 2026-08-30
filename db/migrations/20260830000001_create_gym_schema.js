/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // 1. Users Table
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 150).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.enu('role', ['admin', 'staff', 'member']).defaultTo('member').notNullable();
    table.string('phone', 30).nullable();
    table.string('avatar_url', 500).nullable();
    table.timestamps(true, true);
  });

  // 2. Membership Plans Table
  await knex.schema.createTable('membership_plans', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('slug', 100).notNullable().unique();
    table.string('tag_line', 255).notNullable();
    table.decimal('price_monthly', 10, 2).notNullable();
    table.decimal('price_yearly', 10, 2).notNullable();
    table.json('features').notNullable();
    table.boolean('is_popular').defaultTo(false);
    table.boolean('is_active').defaultTo(true);
    table.integer('sort_order').defaultTo(0);
    table.timestamps(true, true);
  });

  // 3. Trainers Table
  await knex.schema.createTable('trainers', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('title', 150).notNullable();
    table.text('bio').notNullable();
    table.json('specialties').notNullable();
    table.integer('experience_years').defaultTo(1);
    table.string('photo_url', 500).notNullable();
    table.string('instagram', 255).nullable();
    table.string('twitter', 255).nullable();
    table.string('linkedin', 255).nullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });

  // 4. Classes Table
  await knex.schema.createTable('classes', (table) => {
    table.increments('id').primary();
    table.string('title', 150).notNullable();
    table.text('description').notNullable();
    table.string('category', 100).notNullable();
    table.string('level', 50).notNullable();
    table.integer('duration_minutes').defaultTo(45);
    table.integer('capacity').defaultTo(20);
    table.string('intensity', 50).defaultTo('Medium');
    table.string('image_url', 500).nullable();
    table.integer('trainer_id').unsigned().references('id').inTable('trainers').onDelete('CASCADE');
    table.enu('day_of_week', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).notNullable();
    table.string('start_time', 10).notNullable();
    table.string('end_time', 10).notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    table.index(['day_of_week', 'start_time']);
    table.index(['trainer_id', 'day_of_week']);
  });

  // 5. Members Table
  await knex.schema.createTable('members', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.string('email', 150).notNullable();
    table.string('phone', 30).notNullable();
    table.integer('membership_plan_id').unsigned().nullable().references('id').inTable('membership_plans').onDelete('SET NULL');
    table.enu('status', ['active', 'expired', 'frozen', 'pending']).defaultTo('active');
    table.date('join_date').notNullable();
    table.date('expiry_date').notNullable();
    table.string('emergency_contact', 255).nullable();
    table.timestamps(true, true);

    table.index(['status']);
    table.index(['email']);
  });

  // 6. Testimonials Table
  await knex.schema.createTable('testimonials', (table) => {
    table.increments('id').primary();
    table.string('author_name', 100).notNullable();
    table.string('author_title', 150).notNullable();
    table.string('avatar_url', 500).nullable();
    table.text('quote').notNullable();
    table.integer('rating').defaultTo(5);
    table.boolean('is_approved').defaultTo(true);
    table.boolean('is_featured').defaultTo(false);
    table.timestamps(true, true);
  });

  // 7. Gallery Table
  await knex.schema.createTable('gallery', (table) => {
    table.increments('id').primary();
    table.string('title', 150).notNullable();
    table.string('category', 50).notNullable();
    table.string('image_url', 500).notNullable();
    table.string('caption', 255).nullable();
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });

  // 8. Blog Posts Table
  await knex.schema.createTable('blog_posts', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.string('slug', 255).notNullable().unique();
    table.text('excerpt').notNullable();
    table.text('content', 'longtext').notNullable();
    table.string('cover_image', 500).notNullable();
    table.string('category', 100).notNullable();
    table.string('author_name', 100).notNullable();
    table.string('read_time', 30).defaultTo('5 min read');
    table.boolean('is_published').defaultTo(true);
    table.timestamp('published_at').nullable();
    table.timestamps(true, true);
  });

  // 9. Contact Submissions Table
  await knex.schema.createTable('contact_submissions', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 150).notNullable();
    table.string('phone', 30).nullable();
    table.string('subject', 200).notNullable();
    table.text('message').notNullable();
    table.boolean('is_read').defaultTo(false);
    table.timestamps(true, true);
  });

  // 10. Site Settings Table
  await knex.schema.createTable('site_settings', (table) => {
    table.increments('id').primary();
    table.string('setting_key', 100).notNullable().unique();
    table.text('setting_value').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('site_settings');
  await knex.schema.dropTableIfExists('contact_submissions');
  await knex.schema.dropTableIfExists('blog_posts');
  await knex.schema.dropTableIfExists('gallery');
  await knex.schema.dropTableIfExists('testimonials');
  await knex.schema.dropTableIfExists('members');
  await knex.schema.dropTableIfExists('classes');
  await knex.schema.dropTableIfExists('trainers');
  await knex.schema.dropTableIfExists('membership_plans');
  await knex.schema.dropTableIfExists('users');
};
