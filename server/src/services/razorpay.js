import Razorpay from 'razorpay';
export function getRazorpay(){
 const {RAZORPAY_KEY_ID,RAZORPAY_KEY_SECRET}=process.env;
 if(!RAZORPAY_KEY_ID||!RAZORPAY_KEY_SECRET) throw new Error('Razorpay credentials are not configured');
 return new Razorpay({key_id:RAZORPAY_KEY_ID,key_secret:RAZORPAY_KEY_SECRET});
}
