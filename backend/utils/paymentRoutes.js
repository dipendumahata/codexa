const express= require("express");
const router=express.Router();
const createRazorpayInstance= require("../utils/createRazorpayInstance");

router.post('/create-order',async(req,res)=>{
    const {amount}=req.body;
    if(!amount || isNaN(amount)){
        return res.status(400).json({error:"Invalid amount"});
    }

    try {
        const razorpay=createRazorpayInstance();

        const options={
            amount:amount*100,
            currency:'INR',
            receipt:'receipt_'+ new Date().getTime(),

        };
        const order= await razorpay.orders.create(options);
        res.status(200).json(order);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

module.exports=router;