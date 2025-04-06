import React,{useContext, useState} from 'react';
import AuthLayout from "../../components/layouts/AuthLayout";
import { data, Link,useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from '../../utils/apiPaths';
import  { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';


const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const {updateUser} = useContext(UserContext)

    const navigate =useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        let profileImageUrl="";
        if (!email || !password || !fullName) {
            setError("Please fill all the fields");
            return;
            }
        if (!validateEmail(email)) {
            setError("Invalid email");
            return;
        }

        setError("");
        try {
         
          if(profilePic){
            
            const imgUploadRes = await uploadImage(profilePic)
            profileImageUrl=imgUploadRes.imageUrl || "";
          }
         
          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            fullName,
            email,
            password,
            profileImageUrl
          });

          const {token,user}=response.data;
          if(token){
            localStorage.setItem('token', token);
            updateUser(user);
            navigate('/dashboard');
          }
        } catch(err){
          if(err.response && err.response.data.message){
            setError(err.response.data.message);
          }else{
            setError('Something went wrong');
          }
        }
    }
    return ( 
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full md:mt-10 flex flex-col justify-center'>
                <h3 className='text-2xl font-semibold text-black'>Create an Account</h3>
                <p className='text-md text-slate-700 mt-[15px] mb-6'>
                    Join us today by entering your details below.
                </p>


        <form onSubmit={handleSignUp}>

            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="Enter Your Full Name"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="dhgupta@gmail.com"
            type="email"
          />
          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="E@ekc$%2e42"
            type='password'
          />
          
          
          </div>
          {error && <p className="text-red-500 text-sm pb-2-5">{error}</p>}
          <button
            className="btn-primary"
           type="submit">SIGN UP</button>

          <p className="text-[19px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="text-primary font-medium underline" to="/login">Login</Link>
          </p>
          
        </form>

            </div>
        </AuthLayout>
     );
}
 
export default SignUp;