import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
} from '@angular-devkit/schematics';
import { classify, dasherize, capitalize, camelize } from '@angular-devkit/core/src/utils/strings';
import { normalize } from 'path';
import { AddEffectSchema } from './schema';


/* TYPESCRIPT */
import * as ts from 'typescript';
import { getSourceNodes, insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import chalk = require('chalk');

const stringUtils = { classify, dasherize, capitalize, camelize }

// You don't have to export the function as default. You can also have more than one rule factory per file.
export function addEffect(options: AddEffectSchema): Rule {

  /* Correctly format the options path */
  options.path = options.path ? normalize(options.path) : '/';

  return (tree: Tree, context: SchematicContext) => {


    const file = tree.read(options.path ?? '')

    if (file) {
      const content = file.toString('utf-8')

      let sourceFile: ts.SourceFile = ts.createSourceFile(options.path ?? '', content, ts.ScriptTarget.Latest, true)

      // console.log(chalk.bgBlue(`Entire tree`))
      // showTree(sourceFile)

      const nodes = getSourceNodes(sourceFile)

      const moduleEffectsArrayNode = nodes.find(n => {

        const master = n.kind === ts.SyntaxKind.VariableDeclaration;

        if (master) {

          const children = n.getChildren()
          children.forEach(c => showTree(c))

          const isModuleEffectsArray = children.find(c => {
            showTree(c)
            return c.kind === ts.SyntaxKind.Identifier && c.getChildCount() === 0 && c.getText().includes('ModuleEffects')
          }
          ) 
  
          return !!master && !!isModuleEffectsArray;

        }

      })

      if (moduleEffectsArrayNode) {
        const children = moduleEffectsArrayNode.getChildren()

        const arrayNode = children.find(n => n.kind === ts.SyntaxKind.ArrayLiteralExpression)

        if (arrayNode) {

          const filteredChildren = arrayNode.getChildren().filter(c => c.getText())
          
          const elementCountInArray = filteredChildren.length - 2;
          console.log(`elementCountInArray`, elementCountInArray)

          const textForArray = elementCountInArray !== 0 ? `,\n\t${classify(options.name)}` : `\n\t${classify(options.name)}` ;
          
          const arrayChange = new InsertChange(options.path ?? '', arrayNode.getChildren()[arrayNode.getChildren().length - 1].pos, textForArray)
          
          const importChange = insertImport(sourceFile, options.path ?? '', classify(options.name), options.path ?? '')
          
          const changes = [arrayChange, importChange]
          
          const declarationRecorder = tree.beginUpdate(options.path ?? '',);
          for (const change of changes) {
            if (change instanceof InsertChange) {
              declarationRecorder.insertLeft(change.pos, change.toAdd)
            }
          }
          
          tree.commitUpdate(declarationRecorder)

        } else { 
          throw new SchematicsException(`No inner array was found`)
        }

      } else {
        throw new SchematicsException(`Cannot find module affects array Node in file`)

      }


    } else {
      throw new SchematicsException(`Cannot find file at ${options.path}`)
    }


    return tree;
  };
}



export function getContainingFolderPath(path: string, folder: string) {
  return path.endsWith(folder) ? path : `${path}${folder}`;
}



/** Shows the nodes of a typescript file
@param indent The amount of indentation to show the structure of the tree
*/
function showTree(node: ts.Node, indent: string = '  '): void {

  console.log(`*:` + indent + ts.SyntaxKind[node.kind]);

  if (node.getChildCount() === 0) {
    console.log(`#:` + indent + ' Text: ' + node.getText());
  }

  for (let child of node.getChildren()) {
    showTree(child, indent + '  ');
  }
}

/** Finds the effects array node */
// function findEffectsArray(node: ts.Node): ts.Node { 
//   node.find getSourceNodes()
// }