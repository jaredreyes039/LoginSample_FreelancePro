import { useFormContext } from "react-hook-form"

export default function TextInput(props: any) {
	const { type, direction, value, placeholder, label, inputName, classNames } = props;
	const { register } = useFormContext();

	// TODO: ADDRESS DIRECTIONAL PROP TYPE IN EXCHANGE FOR CLASS STYLE OPTS
	return (
		<div className="flex" style={{
			flexDirection: direction ? "column" : "row",
			gap: direction ? '0px' : '6px',
			alignItems: !direction ? "center" : "unset"
		}}>
			<label className="flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 mb-2 mt-2" htmlFor={inputName}>{label}</label>
			<input
				name={inputName}
				placeholder={placeholder}
				className={`file:text-black placeholder:text-gray-500
				flex h-9 min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive` + classNames}
				type={type ? type : "text"}
				value={value}
				{...register(inputName)}
			/>
		</div>
	)
}

