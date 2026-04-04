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
		"inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

	const variants = {
		primary:
			"bg-primary text-white hover:bg-primary-light focus-visible:ring-primary shadow-sm shadow-primary/5 hover:shadow-md hover:shadow-primary/10",
		secondary:
			"bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary shadow-sm shadow-secondary/5",
		outline:
			"border-2 border-border bg-surface text-foreground hover:border-primary hover:text-primary focus-visible:ring-primary",
		ghost:
			"text-text-secondary hover:text-foreground hover:bg-surface-alt focus-visible:ring-gray-400",
		danger:
			"bg-error/10 text-error hover:bg-error hover:text-white focus-visible:ring-error",
	};

	const sizes = {
		sm: "px-4 py-2 text-sm",
		md: "px-6 py-3 text-base",
		lg: "px-8 py-4 text-lg",
		icon: "p-3",
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
