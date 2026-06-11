
function ChallengesList(){

	const CHALLENGES: string[] = [
		"Blog for writeups and performance tests",
		"MVP Dashboard User service, proxied through the Auth service used in this sample.",
		"Log aggregation from the current EC2 instance into cloudwatch"
	]

	return (
		<ul className="flex flex-col pr-[20px]">
			{CHALLENGES.map((challenge: string, idx: number)=>{
				return (
					<li className="flex flex-row gap-[12px] items-start justify-start py-[12px] pr-[20px] border-t-2 border-gray-200/40">
						<label className="text-label text-green-200">{idx}</label>
						<p className="text-sm text-black">{challenge}</p>
					</li>
				)
			})}
		</ul>
	)
}

export default function WhatsNextSection(){
	return (
		<div className="flex flex-col mx-[24px] md:mx-[40px] gap-[50px]">
			<section id="systemDesign" className="flex flex-col items-start gap-[24px] md:gap-[50px]">
			<div className="grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2">
					<div></div>
					<div className="flex flex-col gap-[20px]">
						<label className="text-label text-green-100">What's Next?</label>
						<h1 className="text-xl w-full pr-[50px]">The Road Ahead</h1>
						<p className="text-md text-gray-200/75 w-full pr-[24px]">Check in here for updates, this list will change with my own progress! Looking for an engineer to work on your next major application?</p>
						<ChallengesList />
					</div>
				</div>
			</section>
		</div>
	)
}
