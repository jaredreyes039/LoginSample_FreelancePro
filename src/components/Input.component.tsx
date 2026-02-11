import { useFormContext } from "react-hook-form"

export default function TextInput(props: any) {
	const { type, direction, value, placeholder, label, inputName } = props;
	const { register } = useFormContext();

	// TODO: ADDRESS DIRECTIONAL PROP TYPE IN EXCHANGE FOR CLASS STYLE OPTS
	return (
		<div className="flex" style={{
			flexDirection: direction ? "column" : "row",
			gap: direction ? '0px' : '6px',
			alignItems: !direction ? "center" : "unset"
		}}>
			<label style={{ display: label ? "inline-block" : "none" }} htmlFor={inputName}>{label}</label>
			<input
				name={inputName}
				placeholder={placeholder}
				className={type === "checkbox" ? "input-check" : "input"}
				type={type ? type : "text"}
				value={value}
				{...register(inputName)}
			/>
		</div>
	)
}

