# Contributing

## Setup

After cloning the repository, install the relevant dependencies by running:

```bash
npm install
```

From there, run the server locally with

```bash
npm run dev
# or
yarn dev
```

To build the application separately from running it, use

```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the server running.

## Making a Change

### Create a Card

---

Create a card on our [Trello board](https://trello.com/invite/b/6CuK1xvu/955c8ee484139750e0ffcfdf5c3c5952/nextjs), and then assign yourself to that card. Please add as much detail as possible in the description, including a checklist if the change has subtasks. In the future, there will be more automation and integrated features, related to our Slack channel and this repository. For now, manually add details to the card, and move it to the appropriate columns as the status of the task changes.

### Make a New Branch

---

Make sure you create a branch off of `main` (or whatever branch you need to be working off of). The branch should be named as

```
yourname/branchname
```

For example:

```
sabrenner/schedulesfix
```

### Testing your Changes

---

Tests can be run locally using any of the `test` commands found within the `package.json` file. Tests should be written for any new API and utility functions added, and any functions or routes changed should still pass these tests. These tests will run again on any pushes or pull requests, and are required to merge pull requests into the `main` branch. 

### Committing Pushing Changes

---

Frequency of commits does not really matter, unless the work you're doing involved breaking changes, in which case rolling back to a specific commit within the change would be easier if commits are more frequent. 

If you can, make sure your commits are verified with a [GPG Key](https://docs.github.com/en/authentication/managing-commit-signature-verification). It is not necessary, but looks better for the repository.

## Opening a Pull Request

Once your changes are made locally, committed, and pushed up to the repository, you can open a pull request and fill out the template. Please make sure to follow this template to the best of your ability based on the changes made. From there, feel free to request reviews, and add the appropriate labels (once they are created, or create a new one if you feel it fits).
