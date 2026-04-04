import { clsx } from "clsx";
import type React from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
}

export function Button({
	children,
	variant = "primary",
	size = "md",
	fullWidth = false,
	className,
	disabled,
	...props
}: ButtonProps) {
	const baseStyles =
		"inline-flex items-center justify-center font-medium transition-colors duration-150 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:opacity-45 disabled:pointer-events-none";

	const variants = {
		primary:
			"bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
		secondary:
			"bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary/40",
		outline:
			"border border-border bg-surface text-foreground hover:border-primary/40 hover:text-primary focus-visible:ring-primary/25",
		ghost:
			"text-text-secondary hover:text-foreground hover:bg-surface-alt focus-visible:ring-neutral-400/30",
		danger:
			"bg-error/10 text-error hover:bg-error hover:text-white focus-visible:ring-error/40",
	};

	const sizes = {
		sm: "px-3.5 py-1.5 text-sm min-h-[36px]",
		md: "px-4 py-2 text-sm min-h-[40px]",
		lg: "px-5 py-2.5 text-[15px] min-h-[44px]",
		icon: "p-2 min-h-[40px] min-w-[40px]",
	};

	const classes = twMerge(
		clsx(
			baseStyles,
			variants[variant],
			sizes[size],
			fullWidth && "w-full",
			className,
		),
	);

	return (
		<button className={classes} disabled={disabled} {...props}>
			{children}
		</button>
	);
}
