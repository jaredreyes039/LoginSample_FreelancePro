import logo from '/logo48.png'

export default function BrandHeader(){
	return(
		<header>
			<div className="flex items-center justify-center">
				<img src={logo} />
				<h1 className="text-green-100 text-lg">ClientStack</h1> 	
			</div>
		</header>
	)
}
