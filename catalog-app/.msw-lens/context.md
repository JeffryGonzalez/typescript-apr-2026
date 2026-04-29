# msw-lens — project context
generated: 2026-04-29T20:04:48.712Z

> Drop this file into any LLM conversation for instant context about what
> is mocked in this project, what scenarios exist, and what is currently active.

## Active scenarios

| endpoint | method | active scenario |
|----------|--------|-----------------|
| `/api/catalog` | GET | `server-error` |
| `/api/catalog` | POST | `validation-error` |
| `https://some-api.someserver.com` | GET | `malformed-data` |

## Scenario details

### GET `/api/catalog`
manifest: `src\mocks\catalog\catalog.yaml`
> The company software catalog — list all approved applications, libraries, and services.

- **typical** — Six seeded items — two of each variant. Exercises the `@for` grid and the kind-narrowing branches.
- **empty** — Zero items — exercises the `@empty` branch of the list template.
- **server-error** ✓ **(active)** *(500)* — 500 from the server — exercises the error branch of the discriminated-union list state.
- **slow** *(delay: 3000)* — Same as typical, but 3-second delay — lets the instructor linger on the loading branch.
- **malformed-data** — Well-shaped-looking response with wrong types — licenseCount as a string, missing fields. Compiles because handlers cast; breaks at the UI. The setup for the Zod reveal on Day 3.

sourceHints:
- `src/app/areas/catalog/list.ts`

### POST `/api/catalog`
manifest: `src\mocks\catalog\catalog-post.yaml`
> Add a new item to the software catalog. Payload is a CreateCatalogItem (kind + variant-specific fields).

- **created** — Happy path — returns the created item with a server-assigned id.
- **validation-error** ✓ **(active)** *(400)* — 400 with field-level errors. Exercises the form's per-field error surface.
- **server-error** *(500)* — 500. Exercises whatever the form does when the submit fails at a system level.
- **slow** *(delay: 2000)* — Same as created, but 2-second delay. Exercises the pending/disabled state of the submit button.

sourceHints:
- `src/app/areas/catalog/add.ts`

### GET `https://some-api.someserver.com`
manifest: `src\mocks\books\books.yaml`
> The books shown on the books list page.

- **typical** — Tests that the page renders the normal list of books on first load.
- **empty** — Tests that the page stays stable when the fetch succeeds with no books; with the current template the heading remains and the list renders no items.
- **overloaded** — Tests that a much longer result set still renders legibly and does not overwhelm the list layout.
- **unauthorized** *(401)* — Tests session-expiry handling if this fetch becomes protected later; no redirect or guard is visible in the crawled files.
- **server-error** *(500)* — Tests how the page behaves when the initial books load fails; current source has no explicit error surface, so this exposes the missing recovery path.
- **slow** *(delay: real)* — Tests the pending state during the initial fetch; current source has no spinner or skeleton yet, so this helps reveal whether the blank interval is acceptable.
- **timeout** *(delay: infinite)* — Tests whether the page can recover from a request that never resolves once timeout or cancel UX is added.
- **malformed-data** ✓ **(active)** — Tests resilience when required book fields arrive as null or wrong types and the list interpolates unexpected values.

sourceHints:
- `src/app/areas/books/stores/books-store.ts`
- `src/app/areas/books/pages/list.ts`

---

## How msw-lens works

msw-lens reads scenario manifests — YAML files co-located with MSW handlers under
`src/mocks/` — and writes the active selection to `src/mocks/active-scenarios.ts`.
Vite HMR picks up that file change immediately. No browser refresh needed.

`active-scenarios.ts` is **tool-owned**. Do not edit it manually; msw-lens regenerates it
on every run.

**Commands:**
- `npm run lens` — interactive scenario switcher (single run)
- `npm run lens:watch` — stay in the switcher, Ctrl+C to exit
- `npm run lens:context -- <component.ts>` — generate a prompt for an LLM

Manifests live alongside handlers: `auth/user.yaml` next to `auth/user.ts`.

---

## Manifest format

```yaml
endpoint: /api/resource/   # MUST match the handler's ENDPOINT constant exactly
method: GET
shape: document            # document | collection — determines scenario vocabulary
description: What this endpoint returns

responseType:              # the success-response type
  name: TypeScriptTypeName
  path: relative/path/to/types.ts   # path relative to where you run `lens:context`

errorType:                 # optional — 4xx/5xx response shape (e.g. RFC 9457 ProblemDetails)
  name: ProblemDetails
  path: relative/path/to/types.ts

context:
  sourceHints:             # paths to files that consume this endpoint
    - path/to/store.ts     # LLM reads these directly — provide pointers, not summaries
    - path/to/component.ts
  hints:                   # optional — free-form annotations the code doesn't make obvious
    - "401 always redirects to /login via a route guard"
    - "quantity must be between 1 and 99"

scenarios:
  scenario-name:
    description: What UI behavior this tests (not what the data looks like)
    active: true           # at most one scenario per manifest — marks the default
    httpStatus: 401        # optional — omit for 200
    delay: real            # optional — 'real', 'infinite', or integer-string ms ('2000')
```

Four things are non-negotiable:

1. **`endpoint` MUST match the handler's `ENDPOINT` constant exactly.** The switcher writes keys to `active-scenarios.ts` as `METHOD endpoint` (e.g. `GET /api/cart`); the handler reads keys in the same format. A mismatch is silent — the handler falls through to its default case forever and the switcher appears to do nothing.

2. **`shape` is `document` or `collection` — literal values.** It determines which scenario archetypes apply (single-item vs list).

3. **At most one scenario has `active: true`** — and you should always specify one. The fallback (first scenario in declaration order) reorders silently when the manifest is edited.

4. **`delay` is one of:** `real` (realistic latency), `infinite` (never resolves — tests timeout UI), or an integer-string of milliseconds (`"2000"`).

