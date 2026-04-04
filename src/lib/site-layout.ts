/**
 * Site-wide max width + horizontal gutters (matches `Header` / `Footer` inner rows).
 * - Use on the **single** wrapper inside `<main>` (see `layout.tsx`) and on header/footer shells.
 * - Sections inside that wrapper should use `w-full min-w-0` only — no second `max-w-*` or horizontal `px-*`.
 */
export const siteShellClass =
	"max-w-7xl mx-auto w-full min-w-0 self-stretch px-3 sm:px-6 lg:px-8 box-border";
