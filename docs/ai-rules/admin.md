# Admin & Governance Rules

## Environments

This project has two environments: **dev** and **prod**. Both in it's respective paths.

## SYSTEM_DEPENDENCIES.md

- When any new ID, URL, credential, or service endpoint is created or discovered during a session, update `docs/SYSTEM_DEPENDENCIES.md` immediately.
- Fields marked `⚠️ KEEP SECRET` should only be referenced by name — never echo their values in chat or commit them to the repo.

## CHANGELOG.md

- At the end of each coding session, update `docs/CHANGELOG.md` under `[Unreleased]` using Keep a Changelog format:
  ```
  ### Added
  - ...
  ### Changed
  - ...
  ### Fixed
  - ...
  ```
- When a milestone is complete (e.g. a video's full scope is done), move `[Unreleased]` into a versioned release entry: `## [0.x.0] - YYYY-MM-DD`
- Do not write changelog entries mid-session — wait until work is complete.

## ROADMAP.md

- Check off tasks in `docs/ROADMAP.md` as they are completed.
- Do not check off a task until it is committed and working — not just coded.

## REQUESTS.md

- When the user mentions something that is not on the current roadmap — a UI change, additional feature, non-urgent fix, or technical improvement — add it to the appropriate section of `docs/REQUESTS.md` immediately. Do not act on it.
- Before starting work on any feature, check `docs/REQUESTS.md` for related items and surface them: *"Before we start, you have a request logged related to this: [item]. Should we incorporate that now, or keep it for later?"*
- Never incorporate a request mid-task without explicit confirmation. If it comes up during work, note it: *"That sounds like something worth capturing — I'll add it to REQUESTS.md and we can decide on it after this task is done."*
- The goal is to keep work on the planned path. Requests are captured, not ignored — but they don't redirect active work unless the user decides they should.

## GOTCHAS.md

- Before working in any area covered by `docs/GOTCHAS.md`, check for relevant entries and apply them proactively — don't wait for the user to encounter a known issue.
- When a platform quirk, unexpected behavior, or hard-won lesson is discovered during development, add it to `docs/GOTCHAS.md` in the appropriate section immediately.

