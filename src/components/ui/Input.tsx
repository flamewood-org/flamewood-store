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
					className="block text-xs font-medium text-text-secondary mb-1.5"
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={twMerge(
					clsx(
						"w-full px-3.5 py-2.5 min-h-[42px] border border-border rounded-lg bg-surface transition-colors duration-150",
						"text-[15px] text-foreground placeholder:text-text-tertiary",
						"focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/15",
						"hover:border-border/90",
						error && "border-error/80 focus:border-error focus:ring-error/15",
						className,
					),
				)}
				{...props}
			/>
			{error && (
				<p className="mt-1.5 text-xs font-medium text-error">{error}</p>
			)}
		</div>
	);
}
