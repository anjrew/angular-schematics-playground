import {
  apply,
  externalSchematic,
  mergeWith,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
  chain,
  SchematicsException,
  move
} from '@angular-devkit/schematics';
import { classify, dasherize, capitalize, camelize } from '@angular-devkit/core/src/utils/strings';
import { normalize } from 'path';
import { PageSchema } from './schema';
import { experimental } from '@angular-devkit/core';
// import { getWorkspace } from '@schematics/angular/utility/config';
// import { Path } from '@angular-devkit/core';
// import { parseName } from '@schematics/angular/utility/parse-name'
import { validateRegularSchema, RegularSchema } from '../utils/helper-functions/helper-functions';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { addDeclarationToNgModule } from '../utils/ng-module-utils';
import { parseName } from '@schematics/angular/utility/parse-name';
// import { findModule } from '@schematics/angular/utility/find-module';
// import { getWorkspace } from '@schematics/angular/utility/workspace';

const stringUtils = { classify, dasherize, capitalize, camelize }

// You don't have to export the function as default. You can also have more than one rule factory per file.
export function page(optionArgs: PageSchema): Rule {


  return (tree: Tree, context: SchematicContext) => {

    /* Correctly format the options path */
    optionArgs.path = optionArgs.path ? normalize(optionArgs.path) : optionArgs.path;
    optionArgs.module = optionArgs.module || findModuleFromOptions(tree, optionArgs);

    const options = optionArgs;

    validateRegularSchema(options as RegularSchema)

    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    // convert workspace to string
    const workspaceConfigContent = workspaceConfigBuffer.toString();

    // parse workspace string into JSON object
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceConfigContent);
    if (!options.project) {
      options.project = workspace.defaultProject as string;
    }

    const projectName = options.project as string;

    const project = workspace.projects[projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    // const path = `${project.sourceRoot}/${projectType}`;
// 
    // const module = options.module || findModuleFromOptions(tree, options) || '';

    const parsed = parseName(options.path || `${project.sourceRoot}/${projectType}` , options.name)
    // const parsed = parseName(normalize(`${path}/modules/lazy-loaded-routes/${dasherize(module as string)}/components/pages/`), options.name)


    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

    const templateSource =
      /* The apply function does the magic */
      apply(
        /* The source of the template files */
        url('./files'),
        [
          /* Create a rule from a template */
          template({
            /* Pass in the utils for manipulating the strings in the template */
            ...stringUtils,
            /* Pass in the options to use as values in the template */
            ...options
          }),
          /* Move the files to the destination */
          move(`${options.path}/${dasherize(options.name)}`)

          // move(`${parsed.path}/${parsed.name}`)
        ])

    /* Chain multiple rules together in sequence and the execute them to return a new tree */
    tree = chain([

      /* Create a new component with the default Angular schematic */
      externalSchematic('@schematics/angular', 'component', {
        name: parsed.name,
        path: parsed.path,
        // name: options.path,
        // path: options.path,
        skipTests: true,
        changeDetection: 'OnPush',
        // project:
      }),

      mergeWith(templateSource),


      addDeclarationToNgModule(options, options?.export || false)

    ])(tree, context) as Tree


    return tree;
  };
}



export function getContainingFolderPath(path: string, folder: string) {
  return path.endsWith(folder) ? path : `${path}${folder}`;
}