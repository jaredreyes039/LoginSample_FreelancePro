import logo from '/logo48.png'

interface BrandHeaderProps {
	fixed?: boolean
}

export default function BrandHeader({fixed}: BrandHeaderProps){
	return(
		<header>
			<div className={`${fixed ? 'fixed top-[20px] left-[20px]':''} flex items-center justify-center`}>
				<img src={logo} />
				<h1 className="text-green-100 text-lg">ClientStack</h1> 	
			</div>
		</header>
	)
}
