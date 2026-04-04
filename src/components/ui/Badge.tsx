import { clsx } from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

type BadgeVariant = "default" | "success" | "warning" | "error" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
}

export function Badge({
	children,
	variant = "default",
	className,
	...props
}: BadgeProps) {
	const baseStyles =
		"inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors";

	const variants = {
		default: "bg-surface-alt text-text-secondary border border-border/50",
		success: "bg-success/10 text-success border border-success/20",
		warning: "bg-warning/10 text-warning border border-warning/20",
		error: "bg-error/10 text-error border border-error/20",
		outline: "border border-border text-text-secondary bg-transparent",
	};

	const classes = twMerge(clsx(baseStyles, variants[variant], className));

	return (
		<span className={classes} {...props}>
			{children}
		</span>
	);
}
