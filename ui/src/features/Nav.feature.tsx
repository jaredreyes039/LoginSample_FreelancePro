

export default function NavBar(){
	return (
		<>
			<div className="sticky left-0 top-0 flex flex-row items-center justify-between w-full px-8 py-4">
				<div id="navBrand" className="flex flex-row items-center">
					<span className="brand-text">ClientStack</span>
				</div>
				<ul className="flex flex-row justify-evenly items-center gap-8">
					<li><a href="#benefits">Benefits</a></li>
					<li><a href="#specs">Specifications</a></li>
					<li><a href="#howto">How-To</a></li>
					<li><a href="#contactUs">Contact Us</a></li>
				</ul>
				<button className="btn btn-primary flex flex-row items-center">
					<span>Learn More</span>

				</button>
			</div>
		</>
	)
}
