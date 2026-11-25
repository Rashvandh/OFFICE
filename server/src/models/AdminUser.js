import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: [
        'SUPER_ADMIN',
        'PRODUCT_MANAGER',
        'ORDER_MANAGER',
        'CONTENT_MANAGER',
        'CUSTOMER_SUPPORT',
      ],
      default: 'CUSTOMER_SUPPORT',
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    lastLogin: Date,
    resetTokenHash: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

export default mongoose.model('AdminUser', adminUserSchema);
