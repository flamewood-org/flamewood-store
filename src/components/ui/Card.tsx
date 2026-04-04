import { clsx } from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	hover?: boolean;
	variant?: "default" | "flat" | "elevated";
}

export function Card({
	children,
	className,
	hover = false,
	variant = "default",
	...props
}: CardProps) {
	const variants = {
		default: "bg-surface border border-border shadow-sm",
		flat: "bg-surface-alt border-none",
		elevated: "bg-surface border-none shadow-card",
	};

	const classes = twMerge(
		clsx(
			"rounded-2xl overflow-hidden transition-all duration-300",
			variants[variant],
			hover && "hover:shadow-card-hover hover:-translate-y-1",
			className,
		),
	);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
