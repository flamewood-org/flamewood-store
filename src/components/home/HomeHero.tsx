"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
	HERO_IMAGE_BLUR_DATA_URL,
	type HeroSlide,
} from "@/lib/home-hero-slides";

const AUTO_MS = 6500;

function SlideCard({
	slide,
	className,
	priority,
}: {
	slide: HeroSlide;
	className?: string;
	priority?: boolean;
}) {
	return (
		<Link
			href={slide.href}
			className={`relative block h-full w-full min-h-0 overflow-hidden outline-none ring-offset-2 ring-offset-transparent focus-visible:ring-2 focus-visible:ring-white/80 ${className ?? ""}`}
			aria-label={slide.alt}
		>
			<Image
				src={slide.imageUrl}
				alt=""
				fill
				className="object-cover object-center"
				sizes="(max-width: 768px) 100vw, min(1280px, 100vw)"
				priority={priority}
				placeholder="blur"
				blurDataURL={HERO_IMAGE_BLUR_DATA_URL}
				aria-hidden
			/>
			{/* Light bottom veil so pagination dots stay visible on bright art */}
			<div
				className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent"
				aria-hidden
			/>
		</Link>
	);
}

export function HomeHero({ slides }: { slides: HeroSlide[] }) {
	const list = slides.length > 0 ? slides : [];
	const len = list.length;
	const reactId = useId();
	const pauseRef = useRef(false);
	const [index, setIndex] = useState(0);

	const safeIndex = len > 0 ? index % len : 0;

	const goTo = useCallback(
		(i: number) => {
			if (len <= 0) return;
			setIndex(((i % len) + len) % len);
		},
		[len],
	);

	useEffect(() => {
		if (len <= 1) return;
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (mq.matches) return;
		const id = window.setInterval(() => {
			if (pauseRef.current) return;
			setIndex((x) => (x + 1) % len);
		}, AUTO_MS);
		return () => window.clearInterval(id);
	}, [len]);

	const hintId = `${reactId}-hero-hint`;

	if (len === 0) return null;

	return (
		<section
			className="w-full min-w-0 border-b border-border/80 bg-background"
			aria-roledescription="carousel"
			aria-label="Featured"
			onMouseEnter={() => {
				pauseRef.current = true;
			}}
			onMouseLeave={() => {
				pauseRef.current = false;
			}}
		>
			<div className="mx-auto w-full max-w-7xl min-w-0 box-border py-5 md:py-10">
				<h1 className="sr-only">
					FlameWood — Kerala biomass, fuel and coconut products online
				</h1>
				<p id={hintId} className="sr-only">
					Slides advance automatically. On small screens they slide sideways; on
					larger screens they crossfade. Use dots to jump. Tap or activate the
					image to open its link.
				</p>

				<div
					className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[var(--shadow-card)]"
					aria-describedby={hintId}
				>
					{/* Mobile: horizontal slide (translate), shorter frame */}
					<div className="relative h-[min(32vh,240px)] overflow-hidden sm:h-[min(36vh,280px)] md:hidden">
						<div
							className="flex h-full w-full transform-gpu transition-transform duration-500 ease-out motion-reduce:duration-0"
							style={{ transform: `translateX(-${safeIndex * 100}%)` }}
						>
							{list.map((s, i) => (
								<div
									key={`${s.id}-m-${i}`}
									className="h-full w-full min-w-full shrink-0 flex-[0_0_100%]"
									aria-hidden={i !== safeIndex}
								>
									<SlideCard slide={s} priority={i === 0} />
								</div>
							))}
						</div>
					</div>

					{/* Desktop: crossfade stack, taller */}
					<div className="relative hidden min-h-[400px] h-[min(52vh,520px)] md:block">
						{list.map((s, i) => {
							const active = i === safeIndex;
							return (
								<div
									key={`${s.id}-d-${i}`}
									className={`absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:duration-0 ${
										active ? "z-[1] opacity-100" : "z-0 opacity-0"
									}`}
									aria-hidden={!active}
								>
									<SlideCard slide={s} priority={i === 0} />
								</div>
							);
						})}
					</div>

					{len > 1 && (
						<div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex justify-center gap-1.5 pb-2.5 sm:pb-3">
							{list.map((s, i) => (
								<button
									key={`${s.id}-dot-${i}`}
									type="button"
									onClick={(e) => {
										e.preventDefault();
										goTo(i);
									}}
									className={`pointer-events-auto h-1.5 rounded-full transition-all duration-300 ${
										i === safeIndex
											? "w-6 bg-white"
											: "w-1.5 bg-white/45 hover:bg-white/75"
									}`}
									aria-label={`Slide ${i + 1} of ${len}`}
									aria-current={i === safeIndex}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
