import crypto from 'node:crypto';
import Order from '../models/Order.js';
import {getRazorpay} from '../services/razorpay.js';
// Always calculate prices on the server from trusted database records in production.
export async function createPaymentOrder(req,res,next){try{
 const {amount,customer,shippingAddress,items}=req.body;
 if(!Number.isInteger(amount)||amount<100) return res.status(400).json({success:false,message:'Invalid amount. Amount must be in paise.'});
 if(!Array.isArray(items)||!items.length) return res.status(400).json({success:false,message:'Order items are required.'});
 const razorpay=getRazorpay();const paymentOrder=await razorpay.orders.create({amount,currency:'INR',receipt:`gramiyam_${Date.now()}`});
 const order=await Order.create({customer,shippingAddress,items,amount:amount/100,razorpayOrderId:paymentOrder.id});
 res.status(201).json({success:true,data:{orderId:order._id,razorpayOrderId:paymentOrder.id,amount:paymentOrder.amount,currency:paymentOrder.currency,keyId:process.env.RAZORPAY_KEY_ID}});
 }catch(e){next(e)}}
export async function verifyPayment(req,res,next){try{
 const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
 if(!razorpay_order_id||!razorpay_payment_id||!razorpay_signature)return res.status(400).json({success:false,message:'Missing payment verification fields'});
 const expected=crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
 const a=Buffer.from(expected);const b=Buffer.from(razorpay_signature);if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return res.status(400).json({success:false,message:'Payment signature verification failed'});
 const order=await Order.findOneAndUpdate({razorpayOrderId:razorpay_order_id},{status:'paid',razorpayPaymentId:razorpay_payment_id,razorpaySignature:razorpay_signature},{new:true});
 if(!order)return res.status(404).json({success:false,message:'Order not found'});res.json({success:true,message:'Payment verified',data:{orderId:order._id}});
 }catch(e){next(e)}}
