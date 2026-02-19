

export function CardsList(props: any) {
	return (
		<ul className="flex gap-4">
			{props.children}
		</ul>
	)
}

export function Card(props: any) {
	return (
		<div className={`bg-card-foreground text-card-foreground ${props.className}`} >
			{props.children}
		</div>
	)
}

export function CardHeader(props: any) {
	return (
		<div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
			{props.children}
		</div>
	)
}

export function Cardtitle(props: any) {
	return (
		<h4 className="leading-none">
			{props.title}
		</h4>
	)
}

export function CardDescription(props: any) {
	return (
		<p className="text-muted-foreground">
			{props.description}
		</p>
	)
}

export function CardAction(props: any) {
	return (
		<div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end" {...props} />
	)
}

export function CardContent(props: any) {
	return (
		<div className="px-6 [&:last-child]:pb-6" {...props} />
	)
}
export function CardFooter(props: any) {
	return (
		<div className="flex items-center px-6 pb-6 [.border-t]:pt-6" {...props} />
	)
}
