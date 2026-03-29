# Blog Content Plan

This plan maps the repository’s current content into polished, beginner-friendly technical blog articles while preserving the original technical intent.

## Proposed Articles

| # | Proposed SEO Title | Primary Source Files | Keep Current Filename? | Suggested Blog-Friendly Filename | One-Sentence Summary |
|---|---|---|---|---|---|
| 1 | Java Design Patterns Explained with Practical Examples | `_posts/2025-04-13-design-patterns-in-java.md` | Yes | `java-design-patterns-practical-guide.md` | A practical, categorized guide to creational, structural, and behavioral patterns with Java examples and pattern-selection advice. |
| 2 | SOLID Principles in Java: Build Maintainable, Extensible Systems | `_posts/2025-04-13-solid-principle-java.md` | Yes | `solid-principles-in-java-guide.md` | A developer-focused walkthrough of each SOLID principle with concrete Java snippets, tradeoffs, and refactoring cues. |
| 3 | REST API Design Guidelines: A Practical Playbook for Reliable APIs | `_posts/2025-04-16-rest-api-desgin-guidelines.md` | Yes (note typo retained in filename) | `rest-api-design-guidelines-playbook.md` | A comprehensive REST checklist covering resource modeling, HTTP semantics, errors, security, and production readiness. |
| 4 | SSH Keys for GitHub and Bitbucket: Secure Setup for Multi-Account Workflows | `_posts/2025-04-18-creating_git_ssh_key.md` | Yes | `ssh-keys-github-bitbucket-setup.md` | A secure, cross-platform SSH key setup tutorial with host aliases, troubleshooting, and verification steps. |
| 5 | Polymorphism in Java: Runtime Dispatch, Overloading, and Modern Language Features | `_posts/2025-04-19-polymorphism-in-java.md` | Yes | `polymorphism-in-java-runtime-vs-compile-time.md` | An end-to-end explanation of Java polymorphism across inheritance, interfaces, generics, lambdas, and sealed classes. |
| 6 | Java Date and Time API Guide: Instants, Zones, Formatting, and Pitfalls | `_posts/2025-10-05-java-datetime.md` | Yes | `java-time-api-complete-guide.md` | A practical deep dive into `java.time` with timezone-safe patterns, formatting, testing, and bug-prevention techniques. |
| 7 | Jekyll Chirpy for Engineering Blogs: Local Workflow, Build Checks, and Publishing | `_config.yml`, `tools/run.sh`, `tools/test.sh`, `_plugins/posts-lastmod-hook.rb`, `README.md` | New article | `jekyll-chirpy-engineering-blog-workflow.md` | A guide to how this repository’s Jekyll/Chirpy setup works in practice, including local run, validation, and post metadata automation. |

## Content Hierarchy

1. **Foundations**
   - SOLID Principles
   - Polymorphism
2. **Architecture & API Design**
   - Design Patterns
   - REST API Guidelines
3. **Platform & Tooling**
   - Java Date/Time API
   - SSH Keys for Git Hosting
   - Jekyll Chirpy Workflow

## Navigation Deliverables

- `BLOG_INDEX.md` with all article links and a recommended reading path.
- Updated `README.md` with repository overview, article table of contents, and reading order.
- Cross-links embedded in related articles to reduce duplication and improve discoverability.
