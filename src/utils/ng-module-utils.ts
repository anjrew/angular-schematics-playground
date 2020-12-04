import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics';
import { AddToModuleContext } from './add-to-module-context';
import * as ts from 'typescript';
import { classify, dasherize, capitalize, camelize } from '@angular-devkit/core/src/utils/strings';

import { ModuleOptions, buildRelativePath } from '@schematics/angular/utility/find-module';
import { addDeclarationToModule, addExportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { normalize } from 'path';

const stringUtils = { classify, dasherize, capitalize, camelize };


export function addDeclarationToNgModule(options: ModuleOptions, exports: boolean): Rule {

  return (host: Tree) => {

    console.log(`Adding declaration with options`, options)

    const modulePath = findModulePath(options.module!, host)

    options.module = modulePath;

    addDeclaration(host, options);

    console.log(`Declaration added`)

    if (exports) {
      console.log(`Adding export`)
      addExport(host, options);

    }
    return host;
  }

}


function addDeclaration(host: Tree, options: ModuleOptions) {

  console.log(`Creating AddToModuleContext with options`, options)

  const context = createAddToModuleContext(host, options);

  const modulePath = options.module || '';

  console.log(`Executing addDeclarationToModule`)

  const declarationChanges = addDeclarationToModule(context.source,
    modulePath, context.classifiedName, context.relativePath);

  console.log(`Beginning module update`)

  const declarationRecorder = host.beginUpdate(modulePath);

  for (const change of declarationChanges) {
    host.beginUpdate(modulePath);
    if (change instanceof InsertChange) {
      declarationRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  console.log(`Committing change`)

  host.commitUpdate(declarationRecorder);
};


/** Tried to get the buffer text from a node on the file tree with the path provided */
function getSourceText(tree: Tree, modulePath: string): Buffer | null {
  return tree.read(modulePath as string);
}


function createAddToModuleContext(host: Tree, options: ModuleOptions): AddToModuleContext {

  const result = new AddToModuleContext();

  if (!options.module) {
    throw new SchematicsException(`Module not found.`);
  }

  console.log(`Getting source text`)

  const text = getSourceText(host, options.module)


  if (text === null) {
    throw new SchematicsException(`File ${options.module + '.module.ts'} does not exist.`);
  }

  const sourceText = (text || '').toString('utf-8');

  console.log(`Creating source file`)

  result.source = ts.createSourceFile(options.module, sourceText, ts.ScriptTarget.Latest, true);

  const componentPath = normalize(`/${options.path}/` + stringUtils.dasherize(options.name) + '/' + stringUtils.dasherize(options.name) + '.component.ts')
  .split('\\').join('/');
  options.module = normalize(`/` + options.module).replace('\\', '/')
  .split('\\').join('/');

  console.log(`Building relative path with component path`, componentPath)
  console.log(`And module path`, options.module)
  const file = host.read(componentPath)
  console.log(`File is`, file)
  // console.log(`tree is`, host)

  result.relativePath = buildRelativePath(normalize('/' + options.module), normalize(componentPath))

  console.log(`Relative path build`)
  result.classifiedName = stringUtils.classify(`${options.name}Component`);
  console.log(`Name classified`)

  return result;
}

// function buildRelativePath(from: string, to: string): string {
//   from = normalize(from);
//   to = normalize(to);
//   // Convert to arrays.
//   const fromParts = from.split('/');
//   const toParts = to.split('/');
//   // Remove file names (preserving destination)
//   fromParts.pop();
//   const toFileName = toParts.pop();
//   const relativePath = core_1.relative(core_1.normalize(fromParts.join('/') || '/'), core_1.normalize(toParts.join('/') || '/'));
//   let pathPrefix = '';
//   // Set the path prefix for same dir or child dir, parent dir starts with `..`
//   if (!relativePath) {
//     pathPrefix = '.';
//   }
//   else if (!relativePath.startsWith('.')) {
//     pathPrefix = `./`;
//   }
//   if (pathPrefix && !pathPrefix.endsWith('/')) {
//     pathPrefix += '/';
//   }
//   return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
// }


// function relative(from, to) {
//   if (!isAbsolute(from)) {
//       throw new PathMustBeAbsoluteException(from);
//   }
//   if (!isAbsolute(to)) {
//       throw new PathMustBeAbsoluteException(to);
//   }
//   let p;
//   if (from == to) {
//       p = '';
//   }
//   else {
//       const splitFrom = split(from);
//       const splitTo = split(to);
//       while (splitFrom.length > 0 && splitTo.length > 0 && splitFrom[0] == splitTo[0]) {
//           splitFrom.shift();
//           splitTo.shift();
//       }
//       if (splitFrom.length == 0) {
//           p = splitTo.join(exports.NormalizedSep);
//       }
//       else {
//           p = splitFrom.map(_ => '..').concat(splitTo).join(exports.NormalizedSep);
//       }
//   }
//   return normalize(p);
// }

// function isAbsolute(p) {
//   return p.startsWith(exports.NormalizedSep);
// }

// NormalizedSep = '/';

function addExport(host: Tree, options: ModuleOptions) {

  const context = createAddToModuleContext(host, options); const modulePath = options.module || '';

  const exportChanges = addExportToModule(context.source,
    modulePath, context.classifiedName, context.relativePath);

  const exportRecorder = host.beginUpdate(modulePath);

  for (const change of exportChanges) {
    if (change instanceof InsertChange) {
      exportRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  host.commitUpdate(exportRecorder);
};


/** Tries to access a module file in possible locations  */
function findModulePath(moduleName: string, tree: Tree): string | undefined {
  const modulePossibleLocations = [
    '',
    'src\\app\\modules\\component-collections\\',
    'src\\app\\modules\\lazy-loaded-routes\\',
  ]

  // Reading the module file
  var text = tree.read(moduleName as string);

  var returnValue: string;

  /* Tries to find the module in possible locations */
  while (!text && modulePossibleLocations.length > 0) {
    const pathAttempt = normalize(modulePossibleLocations[0] + moduleName + '/' + `${moduleName}.module.ts`)
    text = getSourceText(tree, pathAttempt)
    modulePossibleLocations.shift()
    if (text) { returnValue = pathAttempt }
  }

  console.log(`Found module`)

  if (text === null) {
    throw new SchematicsException(`File ${moduleName + '.module.ts'} does not exist.`);
  }

  return returnValue!;
}