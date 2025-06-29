# Contributing

Thank you for considering contributing to Kothi.js! This document will outline how to submit changes to this repository and which conventions to follow. If you are ever in doubt about anything we encourage you to reach out either by submitting an issue here or reaching out [via Discord](https://discord.gg/kothi).

If you're contributing to our documentation, make sure to also check out the [contribution guidelines on our documentation website](https://docs.kothi.js/resources/contribution-guidelines/docs).

### Important
Our core maintainers prioritize pull requests (PRs) from within our organization. External contributions are regularly triaged, but not at any fixed cadence. It varies depending on how busy the maintainers are. This is applicable to all types of PRs, so we kindly ask for your patience.

If you, as a community contributor, wish to work on more extensive features, please reach out to CODEOWNERS instead of directly submitting a PR with all the changes. This approach saves us both time, especially if the PR is not accepted (which will be the case if it does not align with our roadmap), and helps us effectively review and evaluate your contribution if it is accepted.

## Prerequisites

- **You're familiar with GitHub Issues and Pull Requests**
- **You've read the [docs](https://docs.kothi.js).**
- **You've setup a test project with the Kothi monorepo**
- **You understand restaurant operations and POS systems**

## Issues before PRs

1. Before you start working on a change please make sure that there is an issue for what you will be working on. You can either find an [existing issue](https://github.com/kothijs/kothi/issues) or [open a new issue](https://github.com/kothijs/kothi/issues/new) if none exists. Doing this makes sure that others can contribute with thoughts or suggest alternatives, ultimately making sure that we only add changes that make sense for the restaurant industry.

2. When you are ready to start working on a change you should first [fork the Kothi repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and [branch out](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository) from the `develop` branch.
3. Make your changes.
4. [Open a pull request towards the develop branch in the Kothi repo](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork). Within a couple of days a Kothi team member will review, comment and eventually approve your PR.

## Workflow

### Branches

There are currently two base branches:
- `develop` - development of Kothi 1.0
- `main` - stable releases of Kothi

Note, if you wish to patch stable releases you should use `main` as the base branch for your pull request. This is not the default when you clone the repository.

All changes should be part of a branch and submitted as a pull request - your branches should be prefixed with one of:

- `fix/` for bug fixes
- `feat/` for features
- `docs/` for documentation changes
- `plugin/` for plugin contributions
- `test/` for test improvements

### Commits

Strive towards keeping your commits small and isolated - this helps the reviewer understand what is going on and makes it easier to process your requests.

### Pull Requests

**Base branch**

If you wish to patch stable releases your base branch should be `main`. 

If your changes should result in a new version of Kothi, you will need to generate a **changelog**. Follow [this guide](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) on how to generate a changeset.

Finally, submit your branch as a pull request. Your pull request should be opened against the `develop` branch in the main Kothi repo.

In your PR's description you should follow the structure:

- **What** - what changes are in this PR
- **Why** - why are these changes relevant for restaurant operations
- **How** - how have the changes been implemented
- **Testing** - how has the changes been tested or how can the reviewer test the feature

We highly encourage that you do a self-review prior to requesting a review. To do a self review click the review button in the top right corner, go through your code and annotate your changes. This makes it easier for the reviewer to process your PR.

#### Merge Style

All pull requests are squashed and merged.

### Testing

All PRs should include tests for the changes that are included. We have two types of tests that must be written:

- **Unit tests** found under `packages/*/src/__tests__` and `apps/api/src/__tests__`
- **Integration tests** found in `apps/api/test/__tests__`

### Plugin Development

When contributing plugins:

1. **Use the CLI generator**: `pnpm kothi generate your-plugin-name`
2. **Follow the Plugin interface**: Implement all required methods
3. **Add comprehensive tests**: Test all plugin lifecycle methods
4. **Document your plugin**: Include README.md with usage examples
5. **Handle errors gracefully**: Don't let plugin failures crash the system

### Documentation

- We generally encourage to document your changes through comments in your code.
- If you alter user-facing behaviour you must provide documentation for such changes.
- All methods and endpoints should be documented using [TSDoc](https://tsdoc.org/).
- Restaurant-specific terminology should be clearly explained.

### Code Style

- **TypeScript**: Use strict TypeScript with proper typing
- **NestJS**: Follow NestJS conventions for decorators and modules
- **Monorepo**: Respect the Turbo monorepo structure
- **Naming**: Use restaurant-specific naming conventions (e.g., KOT, BOT, table service)

### Restaurant Domain Knowledge

When contributing to Kothi, it's helpful to understand:

- **POS Systems**: Point of Sale operations and workflows
- **Kitchen Operations**: Order management, KOT/BOT generation
- **Table Service**: Reservations, seating, table management
- **Payment Processing**: Split bills, modifiers, payment methods
- **Inventory Management**: Stock tracking, ingredient management

### Release

The Kothi team will regularly create releases from two release branches:
- `develop` - preview releases of Kothi 1.0
- `main` - official stable releases

## Getting Help

- **Discord**: [Kothi Community](https://discord.gg/kothi)
- **GitHub Issues**: [Report bugs or request features](https://github.com/kothijs/kothi/issues)
- **Documentation**: [docs.kothi.js](https://docs.kothi.js)
- **Email**: support@kothi.js

## License

By contributing to Kothi.js, you agree that your contributions will be licensed under the MIT License. 