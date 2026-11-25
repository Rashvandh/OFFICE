import 'dotenv/config';
import crypto from 'node:crypto';
import { connectDB } from './config/db.js';
import AdminUser from './models/AdminUser.js';
import { hashPassword } from './utils/adminAuth.js';

const DEFAULT_ROLE_ACCOUNTS = [
  { name: 'GRAMIYAM Super Admin', email: 'superadmin@gramiyam.com', role: 'SUPER_ADMIN' },
  { name: 'GRAMIYAM Product Manager', email: 'products@gramiyam.com', role: 'PRODUCT_MANAGER' },
  { name: 'GRAMIYAM Order Manager', email: 'orders@gramiyam.com', role: 'ORDER_MANAGER' },
  { name: 'GRAMIYAM Content Manager', email: 'content@gramiyam.com', role: 'CONTENT_MANAGER' },
  { name: 'GRAMIYAM Customer Support', email: 'support@gramiyam.com', role: 'CUSTOMER_SUPPORT' },
];

async function run() {
  const passwordArg =
    process.argv[2] ||
    process.env.ADMIN_SEED_PASSWORD ||
    `Grm#${crypto.randomBytes(6).toString('hex')}`;

  await connectDB();

  console.log('\nSeeding GRAMIYAM role-based admin accounts...');
  for (const account of DEFAULT_ROLE_ACCOUNTS) {
    const existing = await AdminUser.findOne({ email: account.email });
    if (existing) {
      existing.passwordHash = hashPassword(passwordArg);
      existing.role = account.role;
      existing.status = 'active';
      await existing.save();
    } else {
      await AdminUser.create({
        name: account.name,
        email: account.email,
        passwordHash: hashPassword(passwordArg),
        role: account.role,
        status: 'active',
      });
    }
    console.log(`  [${account.role}] ${account.email}`);
  }

  if (!process.argv[2] && !process.env.ADMIN_SEED_PASSWORD) {
    console.log(`\nGenerated initial password (change after login): ${passwordArg}`);
  } else {
    console.log('\nSeeded all 5 role accounts with the provided password.');
  }

  process.exit(0);
}

run().catch((err) => {
  console.error('Admin seed failed:', err);
  process.exit(1);
});
