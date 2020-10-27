import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics';
import { AddToModuleContext } from './add-to-module-context';
import * as ts from 'typescript';
import { classify, dasherize, capitalize, camelize } from '@angular-devkit/core/src/utils/strings';

import { ModuleOptions, buildRelativePath } from '@schematics/angular/utility/find-module';
import { addDeclarationToModule, addExportToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

const stringUtils = { classify, dasherize, capitalize, camelize };


export function addDeclarationToNgModule(options: ModuleOptions, exports: boolean): Rule {

  return (host: Tree) => {

    console.log(`Adding declaration`)

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



function createAddToModuleContext(host: Tree, options: ModuleOptions): AddToModuleContext {

  const result = new AddToModuleContext();

  if (!options.module) {
    throw new SchematicsException(`Module not found.`);
  }

  // TODO:
  /* This needs to be the absolute path from the base of the project to the Module file */
  const modulePath = options.module;
  
  // Reading the module file
  const text = host.read(modulePath as string);

  if (text === null) {
    throw new SchematicsException(`File ${options.module} does not exist.`);
  }
  const sourceText = (text || '').toString('utf-8');

  result.source = ts.createSourceFile(options.module, sourceText, ts.ScriptTarget.Latest, true);

  const componentPath = `/${options.path}/` + stringUtils.dasherize(options.name) + '/' + stringUtils.dasherize(options.name) + '.component';

  result.relativePath = buildRelativePath(options.module, componentPath)

  result.classifiedName = stringUtils.classify(`${options.name}Component`);

  return result;
}




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

