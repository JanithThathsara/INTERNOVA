import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModels.js'



const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

const loginUser = async (req, res) => {

    try{
        const {email, password} = req.body

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = createToken(user._id)
            return res.json({success:true, message: "Login successful", token})
        }else{
            return res.json({success:false,message: "Invalid credentials"})
        }


    }catch(error){

        console.log(error)
        res.json({success:false,message:"Something went wrong"})

    }
}



const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body

        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({message: "User already exists"})
        }
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"Password must be at least 8 characters"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new userModel({
            name, email, password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success:true, message: "Registered successfully", token})



    }catch(error){
        console.log(error)
        res.json({success:false,message:"Something went wrong"})
    }

}


const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Something went wrong' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, address, skills, contact, dob, gpa, university, experience, about } = req.body;
        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                name,
                address,
                skills,
                contact,
                dob,
                gpa,
                university,
                experience,
                about
            },
            { new: true }
        );
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Something went wrong' });
    }
};

export {loginUser, registerUser, deleteUser, updateUser}

