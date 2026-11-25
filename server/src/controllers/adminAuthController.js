import crypto from 'node:crypto';
import AdminUser from '../models/AdminUser.js';
import AdminInvitation from '../models/AdminInvitation.js';
import {
  hashPassword,
  verifyPassword,
  hashToken,
  signAdminToken,
} from '../utils/adminAuth.js';

export async function loginAdmin(req, res, next) {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const admin = await AdminUser.findOne({ email: String(email).toLowerCase().trim() }).select(
      '+passwordHash'
    );
    if (!admin || !verifyPassword(password, admin.passwordHash)) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    if (admin.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Administrator account is inactive.' });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const ttl = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 12;
    const token = signAdminToken({ sub: String(admin._id), role: admin.role }, ttl);

    res.json({
      success: true,
      data: {
        token,
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
          role: admin.role,
          status: admin.status,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function verifyInvitation(req, res, next) {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Invitation token is required.' });
    }
    const invite = await AdminInvitation.findOne({
      tokenHash: hashToken(token),
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });
    if (!invite) {
      return res.status(404).json({
        success: false,
        message: 'Invitation token is invalid, expired, or already used.',
      });
    }
    res.json({
      success: true,
      data: { email: invite.email, role: invite.role, expiresAt: invite.expiresAt },
    });
  } catch (err) {
    next(err);
  }
}

export async function signupWithInvitation(req, res, next) {
  try {
    const { token, name, email, phone, password } = req.body;
    if (!token || !name || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    const invite = await AdminInvitation.findOne({
      tokenHash: hashToken(token),
      usedAt: null,
      expiresAt: { $gt: new Date() },
    });
    if (!invite) {
      return res.status(400).json({
        success: false,
        message: 'Invitation token is invalid, expired, or already used.',
      });
    }

    const targetEmail = invite.email || String(email || '').toLowerCase().trim();
    const existing = await AdminUser.findOne({ email: targetEmail });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An admin with this email already exists.' });
    }

    const admin = await AdminUser.create({
      name: String(name).trim(),
      email: targetEmail,
      phone,
      passwordHash: hashPassword(password),
      role: invite.role, // Assigned strictly by Super Admin invitation
      status: 'active',
    });

    invite.usedAt = new Date();
    await invite.save();

    res.status(201).json({
      success: true,
      message: 'Admin account created.',
      data: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    const admin = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
    if (admin) {
      const rawToken = crypto.randomBytes(24).toString('hex');
      admin.resetTokenHash = hashToken(rawToken);
      admin.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000);
      await admin.save();
    }
    res.json({
      success: true,
      message: 'If an account matches that email, reset instructions have been issued.',
    });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;
    if (!token || !password || String(password).length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Valid token and password (8+ characters) are required.',
      });
    }
    const admin = await AdminUser.findOne({
      resetTokenHash: hashToken(token),
      resetTokenExpires: { $gt: new Date() },
    });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Reset token is invalid or expired.' });
    }
    admin.passwordHash = hashPassword(password);
    admin.resetTokenHash = undefined;
    admin.resetTokenExpires = undefined;
    await admin.save();
    res.json({ success: true, message: 'Password reset successful.' });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const { name, phone } = req.body;
    if (name) req.admin.name = String(name).trim();
    if (phone !== undefined) req.admin.phone = phone;
    await req.admin.save();
    res.json({
      success: true,
      data: {
        _id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        phone: req.admin.phone,
        role: req.admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function listAdminUsers(req, res, next) {
  try {
    const users = await AdminUser.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

export async function createInvitation(req, res, next) {
  try {
    const { email, role } = req.body;
    if (!email || !role) {
      return res.status(400).json({ success: false, message: 'Email and role are required.' });
    }
    const rawToken = crypto.randomBytes(24).toString('hex');
    await AdminInvitation.create({
      email: String(email).toLowerCase().trim(),
      role,
      tokenHash: hashToken(rawToken),
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      invitedBy: req.admin._id,
    });
    res.status(201).json({
      success: true,
      message: 'Invitation created.',
      data: { token: rawToken, signupPath: `/admin/signup?token=${rawToken}` },
    });
  } catch (err) {
    next(err);
  }
}
