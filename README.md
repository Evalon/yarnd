# Yarnd

Deduplication util for yarn

```sh
yarn add --dev yarnd
```


## Why?

Yarn encourage reliability and work really good for this purpose, sometimes too good.
Sometimes when you want update some deps yarn didnt update transitive dependencies that already in use in other package.
So you have four choices:
1. Remove yarn.lock entirely and install again (Worst)
2. Update lock.file manually (Error prone)
3. Add and remove dependency directly (Worked, but not convenient)
4. Use utility to dedupe lock.file (like this)

## Examples 

1. ```yarnd``` or ```yarnd check``` Show all dependencies that have duplicates and subject to automatic deduplication by semver
2. ```yarnd fix``` Deduplicate all dependencies in automatic mode by semver
3. ```yarnd @emotion/ react react-dom``` Same as -1-. but check only dependencies in @emotion namespace and react, react-dom packages
4. ```yarnd fix --primary react``` Same as -3- but deduplicate only dependencies that transitively connected with dependencies that listed in package.json in dependencies field and react package

## Commands

Check specific packages or all if packages not specified need to be deduped and return an error if so (default):
```sh
yarnd check [packages]
``` 
Dedupe specific packages or all if packages not specified
```sh
yarnd fix [packages] 
``` 
Default command can be run either by command name or only with the name of the package (yarnd ...)

**Warning**: After ```yarnd fix``` - dedupe run ```yarn install --force``` because yarn balanced file in it's own way and this command **must** be run after dedupe

##### Common flags

- ```--lock [file]``` Specify where the yarn.lock file is placed (default is a file in the current directory)
- ```--included [packages]``` Specify included dependencies (not transitive)
- ```--excluded [packages]``` Specify excluded dependencies (not transitive)
- ```--primary``` Check production dependencies (transitive)
- ```--dev``` Check development dependencies (transitive)
- ```help``` show available commands and description for them

```--included [packages]```, ```--primary```, ```--dev``` works applicative, so every command added packages to check-list.
##### Check flags

- ```--strict``` more verbose output that shows dependencies that cannot be deduped by semver. (filtered by previous commands)

##### Namespaces

```--included [packages]```, ```--excluded [packages]``` also accept namespaces

Example: ```--excluded @babel/``` - exclude all @babel namespace.

##### Aliases

All flags have aliases by the first letter, so is equal commands: 
- ```yarnd fix -ps```
- ```yarnd fix -p -s```
- ```yarnd fix --primary --strict```
