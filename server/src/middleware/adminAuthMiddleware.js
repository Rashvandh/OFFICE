import AdminUser from '../models/AdminUser.js';
import { verifyAdminToken } from '../utils/adminAuth.js';

export async function requireAdminAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const decoded = verifyAdminToken(token);
    if (!decoded?.sub) {
      return res.status(401).json({ success: false, message: 'Invalid or expired session' });
    }
    const admin = await AdminUser.findById(decoded.sub);
    if (!admin || admin.status !== 'active') {
      return res.status(401).json({ success: false, message: 'Account inactive or not found' });
    }
    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
}

export function requireSuperAdmin(req, res, next) {
  if (!req.admin || req.admin.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ success: false, message: 'Super Admin permission required' });
  }
  next();
}
