import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({name:{type:String,required:true,trim:true},slug:{type:String,required:true,unique:true},description:String,category:{type:String,required:true},price:{type:Number,required:true,min:0},compareAtPrice:Number,images:[String],stock:{type:Number,default:0},isActive:{type:Boolean,default:true},isFeatured:{type:Boolean,default:false}},{timestamps:true});
export default mongoose.model('Product',productSchema);
