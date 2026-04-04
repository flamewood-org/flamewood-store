"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	HERO_IMAGE_BLUR_DATA_URL,
	type HeroSlide,
} from "@/lib/home-hero-slides";

const FADE_MS = 900;

export function HomeHero({ slides }: { slides: HeroSlide[] }) {
	const list = slides.length > 0 ? slides : [];
	const [index, setIndex] = useState(0);

	const len = list.length;
	const safeIndex = len > 0 ? index % len : 0;
	const current = list[safeIndex];

	useEffect(() => {
		if (len <= 1) return;
		const t = window.setInterval(() => {
			setIndex((i) => (i + 1) % len);
		}, 7000);
		return () => window.clearInterval(t);
	}, [len]);

	if (!current) return null;

	return (
		<section className="w-full min-w-0 border-b border-border/80 bg-background">
			<div className="w-full min-w-0 box-border py-6 md:py-10">
				<div className="relative w-full min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[var(--shadow-card)]">
					<div className="relative aspect-[4/3] sm:aspect-[16/9] md:min-h-[400px] md:aspect-auto md:h-[min(56vh,520px)]">
						{/* Cross-fading branding images (no separate hit targets per slide) */}
						{list.map((s, i) => {
							const active = i === safeIndex;
							return (
								<div
									key={s.id}
									className={`absolute inset-0 transition-opacity ease-in-out ${
										active ? "z-[1] opacity-100" : "z-0 opacity-0"
									}`}
									style={{ transitionDuration: `${FADE_MS}ms` }}
									aria-hidden
								>
									<Image
										src={s.imageUrl}
										alt=""
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, min(1152px, 100vw)"
										priority={i === 0}
										placeholder="blur"
										blurDataURL={HERO_IMAGE_BLUR_DATA_URL}
									/>
								</div>
							);
						})}

						{/* Full-bleed destination for the visible slide */}
						<Link
							href={current.href}
							className="absolute inset-0 z-[2] block outline-none ring-offset-2 ring-offset-transparent focus-visible:ring-2 focus-visible:ring-white/80"
							aria-label={current.alt}
						/>

						{len > 1 && (
							<div className="absolute inset-x-0 bottom-0 z-[5] flex justify-center gap-1.5 pb-3 pointer-events-none">
								{list.map((s, i) => (
									<button
										key={s.id}
										type="button"
										onClick={(e) => {
											e.preventDefault();
											setIndex(i);
										}}
										className={`pointer-events-auto h-1.5 rounded-full transition-all duration-300 ${
											i === safeIndex
												? "w-6 bg-white"
												: "w-1.5 bg-white/45 hover:bg-white/75"
										}`}
										aria-label={`Slide ${i + 1}`}
										aria-current={i === safeIndex}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
