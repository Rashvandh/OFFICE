import mongoose from 'mongoose';

const adminInvitationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    role: {
      type: String,
      enum: [
        'SUPER_ADMIN',
        'PRODUCT_MANAGER',
        'ORDER_MANAGER',
        'CONTENT_MANAGER',
        'CUSTOMER_SUPPORT',
      ],
      required: true,
    },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    usedAt: { type: Date, default: null },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
  },
  { timestamps: true }
);

export default mongoose.model('AdminInvitation', adminInvitationSchema);
