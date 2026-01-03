import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";
import { IoBookmark } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [showDropdown, setShowDropdown] = useState(false);
	const dropDownRef = useRef<HTMLDivElement>(null);
	const profileRef = useRef<HTMLDivElement>(null);

	const tl = useRef<gsap.core.Timeline | null>(null);

	useGSAP(() => {
		if (!dropDownRef.current) return;

		tl.current = gsap.timeline({ paused: true }).fromTo(
			dropDownRef.current,
			{ opacity: 0, y: -10, scale: 0.95, filter: "blur(10px)" },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				filter: "blur(0px)",
				duration: 0.4,
				ease: "power3.out",
			}
		);
	}, [isLoggedIn]);

	useEffect(() => {
		if (!tl.current) return;

		if (showDropdown) {
			tl.current?.play();
		} else {
			tl.current?.reverse();
		}
	}, [showDropdown]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showDropdown &&
				dropDownRef.current &&
				!dropDownRef.current.contains(event.target as Node) &&
				!profileRef.current?.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showDropdown]);

	return (
		<div className='flex items-center justify-between gap-2 absolute top-0 left-0 w-full p-4 backdrop-blur-sm z-100 rounded-t-3xl'>
			<Logo />

			<div className='relative'>
				{!isLoggedIn ? (
					/* LOGGED OUT STATE: The Pill */
					<div className='flex items-center gap-1 md:gap-2 p-1 bg-white/5 border border-white/10 rounded-full shadow-[inset_0px_1px_2px_rgba(255,255,255,0.15),0px_2px_8px_rgba(0,0,0,0.15)]'>
						<button
							onClick={() => setIsLoggedIn(true)}
							className='px-4 py-1.5 text-[10px] rounded-full border border-white/5 hover:bg-white/10 threed-effect cursor-pointer transition-all duration-300 ease-in-out active:scale-95'>
							Sign in
						</button>
						<button className='px-4 py-1.5 text-[10px] bg-teal-600 rounded-full shadow-lg shadow-teal-900/20 threed-effect cursor-pointer transition-all duration-300 ease-in-out active:scale-95'>
							Sign up
						</button>
					</div>
				) : (
					/* LOGGED IN STATE: The Orbit */
					<div className='flex items-center gap-3'>
						<div
							ref={profileRef}
							onClick={(e) => {
								e.stopPropagation();
								setShowDropdown(!showDropdown);
							}}
							className={`w-9 h-9 rounded-full border-2 transition-all duration-300 cursor-pointer p-0.5
                                ${
																	showDropdown
																		? "border-teal-500 scale-110"
																		: "border-white/20 hover:border-white/40"
																}`}>
							<img
								src='https://api.dicebear.com/7.x/avataaars/svg?seed=Cinera'
								alt='User'
								className='w-full h-full rounded-full bg-teal-900'
							/>
						</div>

						{/* DROPDOWN MENU */}
						<div
							ref={dropDownRef}
							className='absolute top-12 right-0 w-48 bg-[#053330] threed-effect border border-white/10 backdrop-blur-3xl rounded-2xl p-2 shadow-2xl z-50 opacity-0'>
							<div className='px-3 py-2 mb-1 border-bottom border-white/5'>
								<p className='text-[10px] text-white/50 uppercase tracking-widest'>
									Account
								</p>
								<p className='text-xs font-medium text-white truncate'>
									johndoe@cinera.com
								</p>
							</div>

							<Link
								to='/bookmarks'
								onClick={() => {
									setShowDropdown(false);
								}}
								className='w-full flex items-center gap-2 px-3 py-2 text-xs text-white/80 hover:bg-white/10 rounded-lg transition-colors'>
								<IoBookmark size={14} /> Bookmarks
							</Link>

							<div className='h-px bg-white/10 my-1' />

							<button
								onClick={() => {
									setIsLoggedIn(false);
									setShowDropdown(false);
								}}
								className='w-full flex items-center gap-2 px-3 py-2 text-xs text-white bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer'>
								<LuLogOut size={14} /> Logout
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
