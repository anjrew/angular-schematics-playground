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
import { parseName } from '@schematics/angular/utility/parse-name'
import { validateRegularSchema, RegularSchema } from '../helper-functions/helper-functions';
// import { findModule } from '@schematics/angular/utility/find-module';
// import { getWorkspace } from '@schematics/angular/utility/workspace';

const stringUtils = { classify, dasherize, capitalize, camelize }

// You don't have to export the function as default. You can also have more than one rule factory per file.
export function page(options: PageSchema): Rule {

  validateRegularSchema(options as RegularSchema)

  /* Correctly format the options path */
  options.path = options.path ? normalize(options.path) : options.path;


  return (tree: Tree, context: SchematicContext) => {

    // const workspace = getWorkspace(tree)
    // const projectName = options.project || Object.keys(workspace.projects)[0];
    // const project = getProject(workspace, projectName)
    // const path = buildDefaultPAth(project as any)
    // const rootPath = project.root as Path;

    // const sourcePath = join(project.root as Path, 'src');
    // const appPath = join(sourcePath as Path, 'app');
    console.log(`The options are`, options);
    // console.log(`The tree is `, tree);
    // console.log(`The context is`, context);
    console.log('DIR', __dirname);

    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }
    
    // convert workspace to string
    const workspaceConfigContent = workspaceConfigBuffer.toString();
    console.log('workspaceConfig', workspaceConfigContent)

    // parse workspace string into JSON object
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceConfigContent);
    if (!options.project) {
      options.project = workspace.defaultProject as string;
    }
    // console.log('The workspace is', workspace);

    // const workspace = await getWorkspace();

    const projectName = options.project as string;
    console.log('The projectName is', projectName);
    
    const project = workspace.projects[projectName];
    console.log('The project is', project);

    const projectType = project.projectType === 'application' ? 'app' : 'lib';
    console.log('projectType', projectType);

    console.log('DIR', __dirname);
    const path  = `${project.sourceRoot}/${projectType}`;
    console.log('path', path);
    
    // const parsed = parseName(path, options.name)
    const parsed = parseName(path, `modules/lazy-loaded-modules/${dasherize(options.moduleName)}/components/pages/${options.name}`)
    console.log('parsed', parsed);
    

    options.name = parsed.name;

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
        move(`${parsed.path}/${parsed.name}`)
      ])

    /* Chain multiple rules together in sequence and the execute them to return a new tree */
    tree = chain([

      /* Create a new component with the default Angular schematic */
      externalSchematic('@schematics/angular', 'component', {
        name: parsed.name,
        path: parsed.path,
        skipTests: true,
        changeDetection: 'OnPush',
        // project:
      }),

      mergeWith(templateSource)

    ])(tree, context) as Tree


    return tree;
  };
}



export function getContainingFolderPath(path: string, folder: string) {
  return path.endsWith(folder) ? path : `${path}${folder}`;
}