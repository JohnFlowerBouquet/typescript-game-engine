### Commit Message Format

Each commit message consists of a **type** and a **subject**:

```
<type>: <subject>
```

### Type

Must be one of the following:

-   **config**: Changes that affect the project's configuration
-   **docs**: Documentation only changes
-   **feat**: A new feature
-   **fix**: A bug fix
-   **refactor**: A code change that neither fixes a bug nor adds a feature
-   **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   **test**: Adding missing tests or correcting existing tests

Samples:

```
config: jest initial configuration
```

```
fix: updated collision logic to include entity size when colliding with left wall
```

### Testing

For unit testing single file use:

```
npm test --<file name>
```
