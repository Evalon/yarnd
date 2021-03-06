# Yarnd

Deduplication utility for yarn

```sh
yarn add --dev yarnd
```


## Why?

Yarn encourage reliability and works really well for this purpose.
But sometimes when you want to update some direct dependencies yarn doesn't update transitive dependencies that already in use in other package. Therefore you can get two or more the same packages installed. For web bundles it's sometimes crucial to get only one or at least as less as possible identical dependencies. Because of possible errors and bigger bundle size if several duplicated dependencies present.
So you have four choices:
1. Remove yarn.lock entirely and install again (Worst)
2. Update lock.file manually (Error prone)
3. Add and remove dependency directly (Worked, but not convenient)
4. Use utility to deduplicate packages in lock.file (like this)

## Examples 

1. ```yarnd``` or ```yarnd check``` Show all dependencies that have duplicates that can be automatically deduplicated by semver
2. ```yarnd fix``` Deduplicates all dependencies in automatic mode by semver
3. ```yarnd @emotion/ react react-dom``` Are the same as -1- but check only dependencies in @emotion namespace and react, react-dom packages
4. ```yarnd fix --primary react``` Same as -3- but deduplicate only dependencies that transitively connected with dependencies that listed in package.json in dependencies field and react package

## Commands

Check for duplicated packages in yarn.lock and raise an error if there any (default):
```sh
yarnd check [packages]
``` 
Deduplicate specific packages or all if packages are not provided
```sh
yarnd fix [packages] 
``` 
Default command can be run either by command name or only with the name of the package (yarnd ...)

**Warning**: After ```yarnd fix``` - yarnd run ```yarn install --force``` because yarn balances file in it's own way and this command **must** be run after yarnd

##### Common flags

- ```--lock [file]``` Specifies where the yarn.lock file is placed (default is a file in the current directory)
- ```--included [packages]``` Specifies included dependencies (not transitive)
- ```--excluded [packages]``` Specifies excluded dependencies (not transitive)
- ```--primary``` Check production dependencies (transitive)
- ```--dev``` Check development dependencies (transitive)
- ```help``` Show available commands and description for them

```--included [packages]```, ```--primary```, ```--dev``` work applicative, so every command will add packages to check-list.
##### Check flags

- ```--strict``` more verbose output that shows dependencies that cannot be deduplicated by semver. (filtered by previous commands)

##### Namespaces

```--included [packages]```, ```--excluded [packages]``` also accept namespaces

Example: ```--excluded @babel/``` - exclude all @babel namespace.

##### Aliases

All flags have aliases by the first letter, so these are equal commands: 
- ```yarnd fix -ps```
- ```yarnd fix -p -s```
- ```yarnd fix --primary --strict```
