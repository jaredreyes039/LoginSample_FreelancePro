import pm2ErrorMp4 from '/PM2_Error.mp4';

function ChallengesList(){

	const CHALLENGES: string[] = [
		"A PC2 and NGINX/Caddy proxy configuration bug that resulted in an entire transtion between proxy services before being discovered due to difficulties stack tracing.",
		"Designing for an uncertain future required focusing on architectural solutions that would be expandable when ready.",
		"Structuring authentication and authorization to be both session-based on the client-side, and JWT based between the auth proxy gateway and future services or plugins.",
		"AWS network configuration between deployed services, budget considerations, and sacrificing some maintainability for scalability with EC2 machine hosting being used rather than hosting on a private machine"
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

export default function ChallengesSection(){
	return (
		<div className="flex flex-col mx-[24px] md:mx-[40px] gap-[50px]">
			<section id="challenges" className="flex flex-col items-start gap-[24px] md:gap-[50px]">
			<div className="grid grid-rows-2 md:grid-rows-1 grid-cols-1 md:grid-cols-2 gap-[50px]">
				<div className="flex flex-col gap-[20px]">
				<label className="text-label text-green-100">Challenges &amp; Considerations</label>
				<h1 className="text-xl w-full pr-[50px]">Implementation Challenges &amp; Considerations</h1>
				<p className="text-md text-gray-200/75 w-full pr-[24px]">Even the most basic login page quickly becomes a complex set of systems and services working together to guarantee availability and security to users.</p>
				<ChallengesList />
				</div>
				<video src={pm2ErrorMp4} loop autoPlay muted playsInline className="rounded-[8px] h-full fit-cover w-full object-cover" /> 
				</div>
			</section>
		</div>
	)
}
