import { ArrowUpRightSquareIcon, GitGraphIcon } from "lucide-react"
import siteThumbnail from "/ClientStack_MockUp.png"
import portfolioDemo from "/portfolio_demo.mp4"

function GoalsList(){

	const GOALS: string[] = [
		"Blog for writeups and performance tests",
		"MVP Dashboard User service, proxied through the Auth service used in this sample.",
		"Log aggregation from the current EC2 instance into cloudwatch",
	]

	return (
		<ul className="flex flex-col pr-[20px]">
			{GOALS.map((goal: string, idx: number)=>{
				return (
					<li className="flex flex-row gap-[12px] items-start justify-start py-[12px] pr-[20px] border-t-2 border-gray-200/40">
						<label className="text-label text-green-200">{idx + 1}</label>
						<p className="text-sm text-black">{goal}</p>
					</li>
				)
			})}
		</ul>
	)
}

export default function WhatsNextSection(){
	
	async function openPortfolioInNewTab(){
		window.open("https://jaydevdesign.org")
	} 
	async function openGithubInNewTab(){
		window.open("https://github.com/jaredreyes039")
	}

	return (
		<div className="flex flex-col mx-[24px] md:mx-[40px] gap-[50px]">
			<section id="roadAhead" className="flex flex-col items-start gap-[24px] md:gap-[50px]">
				<div className="flex flex-col-reverse md:flex-row gap-[50px] w-full">
					<div className="basis-1/2">
						<video src={portfolioDemo} loop autoPlay muted playsInline className="hidden md:flex rounded-[8px] h-full w-full object-cover" />
					</div>
					<div className="basis-1/2 flex flex-col gap-[20px]">
						<label className="text-label text-green-100">What's Next?</label>
						<h1 className="text-xl w-full pr-[50px]">The Road Ahead</h1>
						<p className="text-md text-gray-200/75 w-full pr-[24px]">Check in here or at <a href="https://jaydevdesign.org/" className="text-green-200 font-bold" >jaydevdesign.org</a> for project updates, ideas, goals, and more!</p>
						<div className="basis-1/2">
							<video src={portfolioDemo} loop autoPlay muted playsInline className="md:hidden flex rounded-[8px] h-full w-full object-cover" />
						</div>
						<GoalsList/>
						<div className="flex flex-row gap-[20px]">
							<button onClick={()=>openPortfolioInNewTab()}  className="btn-nav w-full flex gap-[12px]">
								<span>View My Portfolio</span><ArrowUpRightSquareIcon />
							</button>
							<button onClick={()=>openGithubInNewTab()}  className="btn-nav w-full flex gap-[12px]">
								<span>Visit My Github</span><GitGraphIcon />
							</button>
						</div>
					</div>

				</div>

			</section>
		</div>
	)
}
