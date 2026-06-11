import BrandHeader from "@/components/BrandHeader.component";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";


export default function NavBar(){

	interface LinkItem {
		label: string,
		href: string
	}

	const LINKS: LinkItem[] = [
		{
			label: "System Design",
			href: "#systemDesign",
		},
		{
			label: "Development Challenges",
			href: "#specs"
		},
		{
			label: "How-To",
			href: "#howto"
		}
	]

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	


	return (
		<>
			<div className="sticky left-0 top-0 flex flex-row items-center justify-between w-full px-8 py-4 bg-white">
				<BrandHeader />	
				<ul className="hidden md:flex flex-row justify-evenly items-center gap-8 text-ui font-bold">
					{LINKS.map((link: LinkItem)=>{
						return (
							<li><a href={link.href}>{link.label}</a></li>
						)
					})}	
				</ul>
				<nav className='relative z-50 transition-all duration-300 rounded-[8px]'>
					<div className="flex items-center justify-between">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="md:hidden p-2 text-white cursor-pointer"
						>
							{isMobileMenuOpen ? <XIcon className="text-green-100 w-6 h-6" /> : <MenuIcon className="text-green-100 w-6 h-6" />}
						</button>
					</div>
				</nav>
				<div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden ${!isMobileMenuOpen ? "opacity-0 hidden" : "opacity-100 block"}`}>
					<div className="flex flex-col items-center justify-center h-full gap-8">
						{LINKS.map((link: LinkItem) => {
							return (
								<a href={link.href} onClick={()=>setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white cursor-pointer transition-colors relative group">
									{link.label}
									<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-200 to-green-300 group-hover:w-full transition-all duration-300" />

								</a>
							)
						})}
					</div>
				</div>
				<button className="hidden md:flex btn-nav flex-row items-center text-ui font-bold">
					<span>Learn More</span>

				</button>
			</div>


		</>
	)
}
