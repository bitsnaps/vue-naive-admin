## Install PNPM

### Install with CorePack (recommended)

Starting from V16.13, Node.js has released CorePack to manage the package manager.This is an experimental function that needs to be enabled by running the following script:
```
npx corepack enable // May need administrator permissions
```

This will automatically install PNPM on your system.However, it may not be the latest version of PNPM.To upgrade, check [the latest PNPM version] (https://github.com/pnpm/pnpm/releases/lated), such as 7.14.0```
corepack prepare pnpm@7.14.0 --activate
```

If it is node.js v16.17 or updated version, you can directly install the latest version of PNPM```
corepack prepare pnpm@latest --activate
```

### Use NPM installation

```
npm i -g pnpm
```

Update, unload and reinstall

```
npm uninstall -g pnpm
npm i -g pnpm
```