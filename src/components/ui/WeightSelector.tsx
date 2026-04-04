import { clsx } from "clsx";

interface WeightOption {
	value: string;
	label: string;
	variantId: string;
	price: number;
}

interface WeightSelectorProps {
	options: WeightOption[];
	selectedValue: string;
	onChange: (value: string, variantId: string) => void;
}

export function WeightSelector({
	options,
	selectedValue,
	onChange,
}: WeightSelectorProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{options.map((option) => (
				<button
					type="button"
					key={option.value}
					onClick={() => onChange(option.value, option.variantId)}
					className={clsx(
						"px-4 py-2 rounded-md border-2 font-medium transition-all duration-200",
						selectedValue === option.value
							? "border-primary bg-primary/10 text-primary"
							: "border-border bg-surface text-foreground hover:border-primary/50",
					)}
				>
					<div className="text-sm">{option.label}</div>
					<div className="text-xs text-text-secondary">₹{option.price}</div>
				</button>
			))}
		</div>
	);
}
