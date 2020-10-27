# Getting Started With Schematics


We use the command for convenience to build and execute a Schematic "    "execute": "npm run build && schematics .:page --dry-run=false"


This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.


To see some examples of Angular schematics install @schematics/angular and check in node_modules
```bash
npm i @schematics/angular
```


For a great example on how to use Schematics see this page: https://github.com/BottleRocketStudios/ng-momentum/blob/master/src/scaffold/index.ts#L217-L219 

## Create
To create a new Schematic collection run outside a schematic folder.
```bash
schematics blank --name=hello-world
```

To add a new Schematic to an existing collection run inside a schematic folder the same command already inside a project.
```bash
schematics blank --name=hello-world
```

## Link to project
1. To use this project in another first link this project to npm by linking in the same level as the package.json in with the link command.
```bash
npm link
```

2. Then in the project that you want to link this collection of schematic to, run:
```bash
(sudo?) npm link dre-schematics
```

Then use the schematic with the generate command.
```bash
ng generate dre-schematics:page 
```
```bash
ng generate dre-schematics:lazy-module 
```


### Testing

To run all the available '.spec.ts' test files, run:
```bash
npm t
```

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

### Publishing

To publish, simply do:

```bash
npm run build
npm publish
```

That's it!
 