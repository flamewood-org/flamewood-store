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
		"inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium tracking-wide transition-colors";

	const variants = {
		default: "bg-surface-alt text-text-secondary border border-border/60",
		success: "bg-success/8 text-success border border-success/15",
		warning: "bg-warning/10 text-warning border border-warning/20",
		error: "bg-error/8 text-error border border-error/15",
		outline: "border border-border text-text-secondary bg-transparent",
	};

	const classes = twMerge(clsx(baseStyles, variants[variant], className));

	return (
		<span className={classes} {...props}>
			{children}
		</span>
	);
}
