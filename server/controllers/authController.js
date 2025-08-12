import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import userModel from '../models/userModel.js'; // ✅ Correct
// import { text } from "express";
import transporter from '../config/nodemailer.js';



export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success:false , message: 'Missing details' });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success:false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create new user
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save(); //new user save new usermodel

        // Generate JWT token
        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict', // Adjust sameSite based on environment
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days  
        });//check
        // Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'welcome to rk',
            text: 'welcome to mern system website . your account been created with email id: ${email}'

        }

        await transporter.sendMail(mailOptions);  // send the email

        return res.json({ success:true });

    } catch (error) {
        res.json({ success:false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success:false, message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success:false, message: 'Invalid email' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success:false, message: 'Invalid password' });
        }

        // Generate JWT token
        const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict', // Adjust sameSite based on environment
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days  
        });

        return res.json({ success:true });

    } catch (error) {
        res.json({ success:false, message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
           httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'strict',
        })

        return res.json({success:true, message:"Logged Out"})
    } catch (error) {
        return res.json({ success: false, message: error.message});
    }
}
    
//Send verification OPT to the User Email
// ...............................................
// Send verification OTP to the user's email
export const sendVerifyOtp = async (req, res)=>{
    try {
        const { userId } = req.body;
          
        const user = await userModel.findById(userId);

        // if (!userId) {
        //     return res.json({ success: false, message: "userId is required" });
        // }


        // if (!user) {
        //     return res.json({ success: false, message: "User not found" });
        // }

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        };

        await transporter.sendMail(mailOption);
        return res.json({ success: true, message: 'Verification OTP sent to email' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};





//................................................

// export const verifyEmail = async (req, res)=>{
//     const {userid,otp} = req.body;

//     if(!userid || !otp ) {
//         return res.json({ success: false, message: 'Missing Details'})
//     }
//     try {
//         const user = await userModel.findById(userd);

//         if(!user){
//             return res.json({ success: false, message: 'User not found'})
//         }

//         if(user.verifyOtp === '' || user.verifyOtp !== otp){
//             return res.json({success: false, message: 'Invalid OTP'});
//         }

//         if(UserActivation.verifyOtpExpireAt < Date.now()){
//             return res.json({success: false, message: 'OTP  expired'});
//         }

//         user.isAccountVerified = true;
//         user.verifyOtp = '';
//         user.verifyOtpExpireAt = 0;

//         await user.save();
//         return res.json({ success: true, message: 'Email verified successfully '})

//     } catch (error) {
//         return res.json({success: false, message: error.message});
//     }

// }

//......................

// Verify email using OTP
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.json({ success: false, message: 'Missing details' });
    }
    try {

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: 'Email verified successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
//check code verify otp

export const isAuthenticated = async (req, res)=>{
    try {
        return res.json({ success: true});
    } catch (error) {
        res.json({success: false, message: error.message});
        
    }

}

//Send password reset otp

export const sendResetOtp = async (req, res)=>{
    const {email} = req.body;

    if (!email){
        return res.json({success:false, message: 'email is required'})
    }
    try {
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({ success: false, message:'user not found'});

        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 24 hours

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Passwprd Reset OTP',
            text: `Your OTP for resetting your password is ${otp}. Use this OTP is proceed with resetting your password`
        };

        await transporter.sendMail(mailOption);
        return res.json({success:true, message: 'OTP sent to your email'});


    } catch (error) {
        return res.json({success:false, message: error.message})
    }
}


//reset user password 

export const  resetPassword = async (req, res)=>{
    const {email,otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({ success:false, message: 'Email , OTP, and New password are required '});
    }

    try {
         
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({ success: false, message: 'user not found'})
        }
        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({ success:false, message: 'invaild otp'});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({ success:false, message:'OTP expired'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();
        return res.json({ success: true, message: ' password has been reset successfully'});

    } catch (error) {
        return res.json({success:false, message: error.message});
    }
}
