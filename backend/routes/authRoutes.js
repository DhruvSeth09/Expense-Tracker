const express=require("express");
const {protect}=require("../middleware/authMiddleware");


const{
    registerUser,
    loginUser,
    getUserInfo,
    logoutUser
}= require("../controller/authController");

const upload=require("../middleware/uploadMiddleware");

const router= express.Router();

//register user
router.post("/register",registerUser);

//login user
router.post("/login",loginUser);

//get user info
router.get("/getUser",protect,getUserInfo);

router.post("/upload-image", upload.single('image'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"Please upload an image"});
    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
})

//logout user
router.get("/logout",logoutUser);

//export router
module.exports=router;
