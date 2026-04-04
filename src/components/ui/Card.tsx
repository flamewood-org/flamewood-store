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
		default: "bg-surface border border-border/80 shadow-[var(--shadow-card)]",
		flat: "bg-surface-alt border-none",
		elevated: "bg-surface border-none shadow-[var(--shadow-card)]",
	};

	const classes = twMerge(
		clsx(
			"rounded-xl overflow-hidden transition-shadow duration-200",
			variants[variant],
			hover && "hover:shadow-[var(--shadow-card-hover)]",
			className,
		),
	);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
