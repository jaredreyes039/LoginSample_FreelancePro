import BrandHeader from "@/components/BrandHeader.component"

export default function FooterSection(){
	
	interface LinkItem {
		label: string,
		href: string
	}

	const LINKS: LinkItem[] = [
		{
			label: "System Design",
			href: "#systemDesign"
		},
		{
			label: "Development Challenges",
			href: "#challenges"
		},
		{
			label: "What's Next?",
			href: "#roadAhead"
		}
	]

	return (
		<footer className="border-t-1 border-gray-200/25 flex flex-col gap-[50px] md:gap-[150px]">
			<ul className="w-full gap-[20px] md:gap-[40px] px-[40px] pt-[20px] pb-[50px] flex flex-col md:flex-row text-ui text-black font-bold items-center">
				{LINKS.map((link: LinkItem)=>{
					return (
						<a href={link.href} className="text-green-200 hover:text-green-100 cursor-pointer transition-colors relative group">
									{link.label}
									<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-200 to-green-300 group-hover:w-1/2 md:group-hover:w-full transition-all duration-300" />

								</a>					)
				})}
			</ul>
			<div className="flex flex-col md:flex-row justify-between gap-[24px] items-center px-[40px]">
				<div className="flex items-start">
				<BrandHeader/>
				</div>
				<div className="gap-[12px] md:gap-[24px] flex flex-col">
					<p className="text-sm text-green-200/50">All Rights Reserved</p>
					<p className="text-sm text-green-200/50">Produced by Jay of <a href="https://jaydevdesign.org" className="font-bold">jaydevdesign.org</a></p>
				</div>
			</div>
		</footer>
	)
}
