import { clsx } from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
	const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

	return (
		<div className="w-full">
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-bold text-foreground mb-2"
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={twMerge(
					clsx(
						"w-full px-5 py-3.5 border-2 border-border/50 rounded-xl bg-surface transition-all duration-300",
						"focus:outline-none focus:ring-0 focus:border-primary hover:border-border",
						"placeholder:text-text-tertiary placeholder:font-medium",
						error && "border-error focus:border-error bg-error/5 text-error",
						className,
					),
				)}
				{...props}
			/>
			{error && <p className="mt-2 text-sm font-medium text-error">{error}</p>}
		</div>
	);
}
