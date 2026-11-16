# HockeyRules — ICEHOCKEY RULES · NHL vs IIHF

A static, single-page reference site comparing National Hockey League rules with
IIHF (international) rules for the 2026-27 season. Built with plain HTML5, CSS3
and vanilla JavaScript — no build step, no framework, no backend.

Produced by **STRYDE**. Not affiliated with the NHL or the IIHF.

---

## Entry paths

| Path | What it is |
|---|---|
| `index.html` | The whole site. One page, ten anchored sections. |
| `css/style.css` | All styling: design tokens, layout, components, responsive breakpoints. |
| `js/signals.js` | The 23 referee-signal definitions and their inline SVG infographics, plus the search filter. |
| `js/main.js` | Header state, mobile nav, scroll-spy, anchor offsets, reveal animations, video click-to-load. |

Open `index.html` directly, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

A local server is recommended over `file://` because YouTube embeds can be
blocked on the `file:` protocol.

---

## Page structure

The nav is English and maps one-to-one onto section IDs:

| Nav label | `id` | Content |
|---|---|---|
| Home | `home` | Hero + "Six differences that change the game" summary grid |
| Rink | `rink` | NHL 200 × 85 ft vs IIHF 60 × 26–30 m, scaled SVG rink diagrams, full measurement table, Milan Cortina note |
| Icing | `icing` | Hybrid icing (NHL) vs automatic icing (IIHF), 5-step decision flow, comparison table |
| Offside | `offside` | Shared skate-based principle, delayed/intentional offside, 2025-26 and 2026-27 rewording timeline |
| Penalties | `penalties` | Fighting, checks to the head, goaltender interference, trapezoid; penalty-type table; roster/helmet/face-off/penalty-shot differences |
| Overtime & Shootout | `overtime` | Six format cards (NHL regular season, NHL playoffs, three IIHF rounds, intermission clock) plus a comparison table |
| 2026-27 Changes | `changes` | Two columns: 7 NHL changes and 6 IIHF changes |
| Referee Signals | `signals` | 23 illustrated signal cards with live search |
| Videos | `videos` | Featured explainer, 6 NHL Video Rulebook link cards, 6 YouTube video cards |
| Sources | `sources` | Grouped source links plus an explicit "Stated limitations" box |

---

## Hero

The hero shows exactly two title lines and nothing else in the h1:

```
ICEHOCKEY RULES
NHL vs IIHF
```

The earlier Korean placeholder headline was deleted outright: it appears nowhere
in `index.html`, `css/style.css` or the JS files, and no remnant of its wording
survives in a CSS `content` value, an `aria-label` or a meta tag.

---

## Referee signals — the 23 infographics

Every signal is drawn as an inline SVG on one shared 200 × 210 stage, so the
whole deck reads as a single consistent set:

- common stage: ice guide ellipse, jersey body, head, neck
- arms drawn as thick round-capped strokes (`--ice` accent on the acting arm,
  a dashed ghost stroke where a limb passes behind another)
- a hand or fist marker and small motion ticks showing direction
- legs with skate marks on every card

Shared styling lives in `css/style.css` under the `.sg-*` class block, so
retuning the illustration palette is a single-place edit.

The 23 signals, in display order:

1. Delayed Penalty
2. Checking From Behind
3. Match
4. High Sticking
5. Possible Icing
6. Goal
7. Penalty Shot
8. Hand Pass
9. Icing The Puck
10. Holding
11. Slashing
12. Hooking
13. Roughing
14. Cross Checking
15. Charging
16. Spearing
17. Interference
18. Washout
19. Butt Ending
20. Boarding
21. Tripping
22. Kneeing
23. Elbowing

Signal descriptions are the published officials'-signal wording. Each card
carries English and Korean search keywords in its `data-search` attribute, so
the filter matches `hooking` and `아이싱` alike.

To add or edit a signal, edit the `SIGNALS` array in `js/signals.js`: each entry
takes `name`, `ko` (search keywords) and `svg` (the arm/detail markup appended to
the shared stage).

---

## Design system

| Token | Value | Role |
|---|---|---|
| `--ice` | `#A5F2F3` | Primary ice blue: accents, links, active nav, IIHF column |
| `--navy` | `#0A1628` | Base background |
| `--navy-deep` | `#060E1A` | Alternating section background |
| `--nhl` | `#C7A24B` | NHL column and NHL-specific marks |
| `--iihf` | `#6FE4E7` | IIHF column |

Typography: **Anton** for display headings and numbers, **Barlow Condensed** for
labels/eyebrows/buttons, **Inter** for body copy.

Motion:

- scroll progress bar across the top
- header gains a solid background and border once scrolled past 24px
- staggered `[data-reveal]` fade-and-rise via `IntersectionObserver`
- hero rink diagram parallax at desktop widths
- hover lift and border-glow on cards, buttons, and signal tiles

All motion is disabled under `prefers-reduced-motion: reduce`.

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| > 1000px | Two-column hero (copy + rink diagram); side-by-side comparison panels |
| ≤ 1000px | Hero stacks with the diagram first; video feature becomes one column |
| ≤ 900px | Nav collapses to a MENU toggle; full-height dropdown panel; signal grid tightens |
| ≤ 640px | All comparison grids go one column; signals drop to a comfortable two-column grid; buttons stretch |
| ≤ 380px | Signals go one column |

Wide tables never force page-level horizontal scroll — they live inside
`.table-scroll` with `overflow-x: auto` and keep a `min-width` so columns stay
legible.

---

## Storage and data

This site is fully static. It has no database, no tables under `.tables/`, no
localStorage, no cookies, and no server-side code. Nothing a visitor does is
persisted. All content is authored in `index.html` and `js/signals.js`.

---

## Accessibility notes

- semantic `header` / `nav` / `main` / `section` / `article` / `footer`, one `h1`
- skip link to main content
- `aria-expanded` on the mobile toggle, dismissed with `Escape`
- `aria-live` status on the signal result count
- every signal SVG is `role="img"` with a descriptive `aria-label`
- visible focus rings on inputs, buttons and video play controls
- tables use `th scope` for both column and row headers, with `sr-only` captions
- `alt=""` on decorative YouTube thumbnails, which duplicate the adjacent titles

---

## Video behaviour

Thumbnails are plain images; no YouTube script or iframe loads until a play
button is pressed. On click, the frame is replaced with a `youtube-nocookie.com`
embed using `autoplay=1`, so first paint stays fast and there are no third-party
cookies before interaction. NHL Video Rulebook items are outbound links only,
because those clips are NHL property.

---

## Data provenance and limitations

Every figure on the page traces to the research sources listed in the `#sources`
section. Two limits are stated on the page itself and repeated here:

1. The **NHL 2026-27 rulebook PDF** could not be retrieved in full (network
   error on `media.nhl.com`), so NHL rule changes rest on Scouting the Refs and
   Bleacher Report.
2. The **IIHF 2026-27 rulebook PDF** likewise failed a full crawl; changes were
   confirmed through the 2025-26 book and the Elite League summary.
3. Reporting on the **Milan Cortina sheet width** differs by outlet (26 m vs
   30 m). The IIHF permits 26–30 m, so venue figures can differ from the rule.

Rulebooks are revised each season. Re-check the official documents before using
any figure for officiating or competition decisions.

---

## Completed

- Hero rebuilt to `ICEHOCKEY RULES` / `NHL vs IIHF` with the old headline removed
- English navigation with all ten categories restored and scroll-spy wired
- 23 consistent SVG referee-signal infographics replacing text-only tiles
- Full NHL vs IIHF comparison content: rink, icing, offside, penalties,
  overtime/shootout, 2026-27 changes, videos, sources
- Ice blue / deep navy palette, scroll and hover motion, responsive layout
- Verified in a browser at 1280px desktop and 390px mobile: clean console, no
  horizontal overflow, signal search returns 1 result for `hooking`, 3 for
  `아이싱`, and restores all 23 when cleared

## Remaining / possible next steps

- Not deployed. Publishing requires an explicitly approved Hosted Deploy, or a
  manual push to GitHub Pages (Settings → Pages → branch `main`).
- No Korean-language body copy yet; only the search keywords are bilingual. The
  original brief flagged localisation as a future step.
- No quiz or learning-progress feature — planned in the original brief but out
  of scope for this pass, and it would need storage.
- Signal illustrations are deliberately schematic line figures, not photographs.
  They are original SVG, so there is no third-party image licensing exposure.

---

## Publish on GitHub Pages (파일이 곧 사이트)

이 폴더는 그대로 GitHub에 올리면 사이트가 되는 구조입니다. 루트의 `index.html`이
첫 페이지이고, 별도 빌드 과정은 없습니다. `.nojekyll`이 포함되어 있어 Jekyll
전처리 없이 `css/`, `js/`가 그대로 배포됩니다.

### 방법 A — 웹에서 업로드

1. GitHub에서 **New repository** → 이름 입력(예: `hockeyrules`) → **Public** → Create
2. 저장소 화면에서 **Add file → Upload files** → 이 폴더의 모든 파일과 `css/`, `js/`
   폴더를 드래그 → Commit
3. **Settings → Pages → Build and deployment**
   - Source: `Deploy from a branch`
   - Branch: `main` / **`/ (root)`** → Save
4. 1~2분 뒤 `https://<사용자명>.github.io/hockeyrules/` 에서 열립니다.

### 방법 B — 명령줄 (이미 커밋된 저장소)

```bash
# 이 폴더에서 (git 저장소·커밋이 이미 만들어져 있음)
git remote add origin https://github.com/<사용자명>/hockeyrules.git
git branch -M main
git push -u origin main
```

푸시 후 저장소 → **Settings → Pages** → Branch `main` / `/ (root)` → Save.

### 확인 포인트

- 사이트 최상단 10개 섹션 앵커 내비게이션, 심판 수신호 23종 검색(`hooking`, `아이싱`)이
  실제 배포 URL에서 동작하는지 확인
- YouTube 임베드는 클릭 시에만 로드되므로, 배포 후 영상 카드 1개를 눌러 재생 확인
- 커스텀 도메인을 붙일 경우 저장소 루트에 `CNAME` 파일 추가
