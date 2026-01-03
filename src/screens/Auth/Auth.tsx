import Logo from "@/components/ui/Logo";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import {
	IoEyeOffOutline,
	IoEyeOutline,
	IoLockClosedOutline,
	IoMailOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AuthScreen = () => {
	const pathname = window.location.pathname;

	const [isLogin, setIsLogin] = useState(pathname === "/login");
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	return (
		<div className='relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden py-4 px-2 md:px-4 font-plus-jakarta'>
			<div className='absolute inset-0 z-0'>
				<img
					src='/app-bg.jpg'
					className='w-full h-full object-cover opacity-20 scale-110 blur-sm'
					alt='background'
				/>
				<div className='absolute inset-0 bg-radial-at-t from-teal-500/10 via-black/80 to-black' />
			</div>

			<div className='relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-[2.5rem] shadow-2xl'>
				<div className='flex justify-center w-full mb-4'>
					<Logo />
				</div>

				<div className='text-center mb-5'>
					<h1 className='text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)] [text-shadow:0px_1px_0px_rgba(255,255,255,0.4)]'>
						{isLogin ? "Welcome Back" : "Create Account"}
					</h1>
					<p className='text-white/40 text-xs md:text-sm'>
						{isLogin
							? "Ready for your next series?"
							: "Join the premium experience."}
					</p>
				</div>

				{/* Form */}
				<form className='space-y-5' onSubmit={(e) => e.preventDefault()}>
					{!isLogin && (
						<div className='relative group'>
							<input
								type='text'
								placeholder='Full Name'
								className='w-full bg-white/5 border border-white/10 rounded-full py-4 px-12 text-xs md:text-sm text-white outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20'
							/>
							<IoMailOutline className='absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-base md:text-lg group-focus-within:text-teal-500 transition-colors' />
						</div>
					)}

					<div className='relative group'>
						<input
							type='email'
							placeholder='Email Address'
							className='w-full bg-white/5 border border-white/10 rounded-full py-4 px-12 text-xs md:text-sm text-white outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20'
						/>
						<IoMailOutline className='absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-base md:text-lg group-focus-within:text-teal-500 transition-colors' />
					</div>

					<div className='relative group'>
						<input
							type={showPassword ? "text" : "password"}
							placeholder='Password'
							className='w-full bg-white/5 border border-white/10 rounded-full py-4 px-12 text-xs md:text-sm text-white outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20'
						/>
						<IoLockClosedOutline className='absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-base md:text-lg group-focus-within:text-teal-500 transition-colors' />
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors cursor-pointer'>
							{showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
						</button>
					</div>

					<button className='w-full py-4 threed-effect bg-teal-700 hover:bg-teal-600 text-white rounded-full font-medium text-xs md:text-sm shadow-lg shadow-teal-500/20 active:scale-95 transition-all duration-500 ease-in-out cursor-pointer'>
						{isLogin ? "Sign In" : "Get Started"}
					</button>
				</form>

				<div className='flex items-center my-6 md:my-8 gap-4'>
					<div className='h-px bg-white/10 flex-1' />
					<span className='text-[8px] md:text-[10px] text-white/20 uppercase tracking-widest'>
						Or continue with
					</span>
					<div className='h-px bg-white/10 flex-1' />
				</div>

				{/* Social Logins */}
				<div className='flex gap-4'>
					<button className='flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-full threed-effect hover:bg-teal-500/30 transition-all duration-500 ease-in-out cursor-pointer active:scale-95 text-sm md:text-base'>
						<FaGoogle className='text-white' />
					</button>
					<button className='flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-full threed-effect hover:bg-teal-500/30 transition-all duration-500 ease-in-out cursor-pointer active:scale-95 text-sm md:text-base'>
						<FaGithub className='text-white' />
					</button>
				</div>

				<p className='text-center mt-10 text-white/40 text-[10px] md:text-xs'>
					{isLogin ? "Don't have an account?" : "Already a member?"}
					<button
						onClick={() => {
							if (isLogin) {
								navigate("/signup");
								setIsLogin(false);
							} else {
								navigate("/login");
								setIsLogin(true);
							}
						}}
						className='ml-2 text-white font-semibold hover:text-teal-400 transition-colors cursor-pointer'>
						{isLogin ? "Sign Up" : "Log In"}
					</button>
				</p>
			</div>
		</div>
	);
};

export default AuthScreen;
