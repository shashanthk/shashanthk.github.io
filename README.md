# Shashanth Tech Blog (GitHub Pages + Jekyll Chirpy)

This repository powers a technical blog focused on practical software engineering topics, especially Java design, API architecture, developer tooling, and platform reliability.

## Repository Overview

The site is built with **Jekyll** using the **Chirpy** theme and organized around publishable technical articles in `_posts/`.

Supporting infrastructure includes:

- `_config.yml` for site behavior and metadata
- `tools/run.sh` for local preview
- `tools/test.sh` for build and content checks
- `_plugins/posts-lastmod-hook.rb` for automatic post last-modified metadata

## Table of Contents

### Planning and Navigation

- [BLOG_PLAN.md](BLOG_PLAN.md) — article mapping from source material to final blog topics
- [BLOG_INDEX.md](BLOG_INDEX.md) — unified index and recommended learning path

### Articles

1. [`_posts/2025-04-13-solid-principle-java.md`](./_posts/2025-04-13-solid-principle-java.md)
2. [`_posts/2025-04-19-polymorphism-in-java.md`](./_posts/2025-04-19-polymorphism-in-java.md)
3. [`_posts/2025-04-13-design-patterns-in-java.md`](./_posts/2025-04-13-design-patterns-in-java.md)
4. [`_posts/2025-04-16-rest-api-desgin-guidelines.md`](./_posts/2025-04-16-rest-api-desgin-guidelines.md)
5. [`_posts/2025-10-05-java-datetime.md`](./_posts/2025-10-05-java-datetime.md)
6. [`_posts/2025-04-18-creating_git_ssh_key.md`](./_posts/2025-04-18-creating_git_ssh_key.md)
7. [`_posts/2026-03-29-jekyll-chirpy-workflow.md`](./_posts/2026-03-29-jekyll-chirpy-workflow.md)

## Recommended Reading Order

1. SOLID principles
2. Polymorphism
3. Design patterns
4. REST API guidelines
5. Java date/time API
6. SSH key workflows
7. Jekyll Chirpy publishing workflow

## Local Development

```bash
bundle install
bash tools/run.sh
```

## Validation

```bash
bash tools/test.sh
```

## License

This repository uses the MIT license inherited from the Chirpy starter template. See [LICENSE](LICENSE).
