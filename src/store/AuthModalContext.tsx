"use client";

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";

type AuthView = "login" | "register";

function safeCallbackUrl(url: string | undefined | null): string {
	if (url && url.startsWith("/") && !url.startsWith("//")) return url;
	return "/account";
}

type OpenLoginOpts = {
	callbackUrl?: string;
	registered?: boolean;
};

type OpenRegisterOpts = {
	callbackUrl?: string;
};

type AuthModalContextValue = {
	open: boolean;
	view: AuthView;
	callbackUrl: string;
	registeredBanner: boolean;
	openLogin: (opts?: OpenLoginOpts) => void;
	openRegister: (opts?: OpenRegisterOpts) => void;
	close: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	const [view, setView] = useState<AuthView>("login");
	const [callbackUrl, setCallbackUrl] = useState("/account");
	const [registeredBanner, setRegisteredBanner] = useState(false);

	const openLogin = useCallback((opts?: OpenLoginOpts) => {
		setCallbackUrl(safeCallbackUrl(opts?.callbackUrl));
		setRegisteredBanner(!!opts?.registered);
		setView("login");
		setOpen(true);
	}, []);

	const openRegister = useCallback((opts?: OpenRegisterOpts) => {
		setCallbackUrl(safeCallbackUrl(opts?.callbackUrl));
		setRegisteredBanner(false);
		setView("register");
		setOpen(true);
	}, []);

	const close = useCallback(() => {
		setOpen(false);
		setRegisteredBanner(false);
	}, []);

	const value = useMemo(
		() => ({
			open,
			view,
			callbackUrl,
			registeredBanner,
			openLogin,
			openRegister,
			close,
		}),
		[
			open,
			view,
			callbackUrl,
			registeredBanner,
			openLogin,
			openRegister,
			close,
		],
	);

	return (
		<AuthModalContext.Provider value={value}>
			{children}
		</AuthModalContext.Provider>
	);
}

export function useAuthModal() {
	const ctx = useContext(AuthModalContext);
	if (!ctx) {
		throw new Error("useAuthModal must be used within AuthModalProvider");
	}
	return ctx;
}
