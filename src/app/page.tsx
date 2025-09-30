export default function Home() {
  return (
    <div className="min-h-screen w-full px-6 py-10 sm:px-10 lg:px-16 font-[family-name:var(--font-geist-sans)] text-foreground">
      <main className="mx-auto w-full max-w-4xl">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">rollr.org — Developer Guide (Front‑end)</h1>
          <p className="mt-3 text-base text-muted-foreground">
            A practical, navigable overview for casual developers. Learn how pages are composed, where components live,
            and how to work with front‑end models and stubs.
          </p>
        </header>

        <nav aria-label="Table of contents" className="mb-10 rounded-lg border border-black/10 dark:border-white/10 p-4">
          <h2 className="text-lg font-semibold mb-2">Table of contents</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm sm:text-base">
            <li><a className="hover:underline" href="#overview">Overview</a></li>
            <li>
              <a className="hover:underline" href="#architecture">Architecture (how pages render)</a>
              <ol className="list-[lower-alpha] list-inside ml-4 mt-1 space-y-1">
                <li><a className="hover:underline" href="#app-router-shells">App Router shells</a></li>
                <li><a className="hover:underline" href="#page-layout-components">Page‑layout components</a></li>
                <li><a className="hover:underline" href="#child-components">Child components</a></li>
              </ol>
            </li>
            <li>
              <a className="hover:underline" href="#data-models">Data & models (stubs)</a>
              <ol className="list-[lower-alpha] list-inside ml-4 mt-1 space-y-1">
                <li><a className="hover:underline" href="#mocks">Mock data</a></li>
                <li><a className="hover:underline" href="#replace-stubs">Replacing stubs with APIs</a></li>
              </ol>
            </li>
            <li><a className="hover:underline" href="#adding-a-page">Adding a page</a></li>
            <li>
              <a className="hover:underline" href="#design-goals">Design goals (short)</a>
              <ol className="list-[lower-alpha] list-inside ml-4 mt-1 space-y-1">
                <li><a className="hover:underline" href="#goal-performance">Performance</a></li>
                <li><a className="hover:underline" href="#goal-accessibility">Accessibility</a></li>
                <li><a className="hover:underline" href="#goal-scalability">Scalability & modularity</a></li>
                <li><a className="hover:underline" href="#goal-dx">Developer experience</a></li>
              </ol>
            </li>
            <li>
              <a className="hover:underline" href="#project-structure">Project structure</a>
              <ol className="list-[lower-alpha] list-inside ml-4 mt-1 space-y-1">
                <li><a className="hover:underline" href="#structure-app">src/app</a></li>
                <li><a className="hover:underline" href="#structure-components">src/components</a></li>
                <li><a className="hover:underline" href="#structure-mocks">src/mocks</a></li>
                <li><a className="hover:underline" href="#structure-public">public</a></li>
                <li><a className="hover:underline" href="#structure-config">Configuration files</a></li>
              </ol>
            </li>
          </ol>
        </nav>

        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="text-sm sm:text-base leading-7">
            This repo is front‑end only. Backend services, APIs, and middleware live in a separate repository. Here we
            focus on UI, page composition, and front‑end models backed by stubbed data. The goal is to make it simple for
            casual contributors to add or tweak pages without learning the entire stack.
          </p>
        </section>

        <section id="architecture" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Architecture (how pages render)</h2>
          <h3 id="app-router-shells" className="text-lg font-medium mt-6">App Router shells</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">
            We use Next.js App Router files (in <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">src/app</code>) mostly as thin shells.
            A route’s <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">page.tsx</code> should be small and simply render a higher‑level page‑layout component.
          </p>
          <h3 id="page-layout-components" className="text-lg font-medium mt-6">Page‑layout components</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">
            Page‑layout components live under <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">src/components</code> (feature folders like
            <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">TablePage</code> or <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">SearchPage</code>). They orchestrate data loading (from stubs), composition,
            and layout, and they render child components.
          </p>
          <h3 id="child-components" className="text-lg font-medium mt-6">Child components</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">
            Most of the actual UI output comes from smaller, reusable child components (cards, lists, filters, etc.).
            Keep these presentational and typed so they’re easy to reuse.
          </p>
        </section>

        <section id="data-models" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Data & models (stubs)</h2>
          <p className="text-sm sm:text-base leading-7 mt-2">
            Models in this repo are front‑end models only. They should not contain business logic or make real network
            calls. Use stubs and mocks to simulate data until the separate backend/API is wired up.
          </p>
          <h3 id="mocks" className="text-lg font-medium mt-6">Mock data</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">
            Use files under <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">src/mocks</code> (e.g., Players, Tables, SearchResults) for fixtures in
            local development, demos, and tests.
          </p>
          <h3 id="replace-stubs" className="text-lg font-medium mt-6">Replacing stubs with APIs</h3>
          <ul className="list-disc list-inside text-sm sm:text-base leading-7 mt-2 space-y-1">
            <li>Keep data access behind a small function or hook so it’s easy to swap implementations.</li>
            <li>When the backend repo is available, replace the stubbed implementation with real fetch calls.</li>
            <li>Avoid leaking API details into presentational components.</li>
          </ul>
        </section>

        <section id="adding-a-page" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Adding a page</h2>
          <ol className="list-decimal list-inside text-sm sm:text-base leading-7 mt-2 space-y-1">
            <li>Create a route file under <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">src/app/your-route/page.tsx</code>.</li>
            <li>Have it import and render a page‑layout component from <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">src/components</code>.</li>
            <li>Compose the UI from child components. Use mocks from <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">src/mocks</code> as needed.</li>
            <li>When ready, swap stubs for real API calls in the data access layer only.</li>
          </ol>
        </section>

        <section id="design-goals" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Design goals (short)</h2>
          <h3 id="goal-performance" className="text-lg font-medium mt-6">Performance</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">Ship fast, small UIs. Stream where practical and lazy‑load non‑critical code.</p>
          <h3 id="goal-accessibility" className="text-lg font-medium mt-6">Accessibility</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">Semantic HTML, labels, color contrast, and keyboard support for core flows.</p>
          <h3 id="goal-scalability" className="text-lg font-medium mt-6">Scalability & modularity</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">Prefer small, typed components with clear boundaries. Keep app router thin.</p>
          <h3 id="goal-dx" className="text-lg font-medium mt-6">Developer experience</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">Consistent patterns and minimal magic. Co‑locate code by feature.</p>
        </section>

        <section id="project-structure" className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Project structure</h2>
          <h3 id="structure-app" className="text-lg font-medium mt-6">src/app</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">
            App Router entry points and layouts. Treat route files as thin shells that forward to page‑layout components.
            This home page is <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">src/app/page.tsx</code>.
          </p>
          <h3 id="structure-components" className="text-lg font-medium mt-6">src/components</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">
            Page‑layout and reusable building blocks (e.g., TablePage, SearchPage). Most rendering happens here.
          </p>
          <ul className="list-disc list-inside text-sm sm:text-base leading-7 mt-2 space-y-1">
            <li><code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">components/TablePage</code> — layout, actions bar, and player/table cards.</li>
            <li><code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">components/SearchPage</code> — result cards and related UI.</li>
          </ul>
          <h3 id="structure-mocks" className="text-lg font-medium mt-6">src/mocks</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">
            Stubbed models and fixtures (Players, Tables, SearchResults, Tags) used by components and tests.
          </p>
          <h3 id="structure-public" className="text-lg font-medium mt-6">public</h3>
          <p className="text-sm sm:text-base leading-7 mt-2">
            Static assets such as icons and images served at the site root.
          </p>
          <h3 id="structure-config" className="text-lg font-medium mt-6">Configuration files</h3>
          <ul className="list-disc list-inside text-sm sm:text-base leading-7 mt-2 space-y-1">
            <li><code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">package.json</code> — scripts and dependencies.</li>
            <li><code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">next.config.ts</code>, <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">tsconfig.json</code>, <code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">postcss.config.mjs</code> — framework and tooling settings.</li>
            <li><code className="px-1 py-0.5 rounded bg-black/5 dark:bg-white/10">README.md</code> — repository‑level docs.
            </li>
          </ul>
        </section>

        <footer className="pt-6 border-t border-black/10 dark:border-white/10 text-sm text-muted-foreground">
          <p>
            Front‑end focused. If you change page composition patterns or stub usage, please keep this page in sync.
          </p>
        </footer>
      </main>
    </div>
  );
}
