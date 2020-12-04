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
import * as fs from 'fs'
import { getSourceNodes, insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';

const stringUtils = { classify, dasherize, capitalize, camelize }

// You don't have to export the function as default. You can also have more than one rule factory per file.
export function addEffect(options: AddEffectSchema): Rule {
  console.log(`The option args are`, options)

  /* Correctly format the options path */
  options.path = options.path ? normalize(options.path) : '/';

  return (tree: Tree, context: SchematicContext) => {


    const file = tree.read(options.path ?? '')

    if (file) {
      const content = file.toString('utf-8')

      let sourceFile: ts.SourceFile = ts.createSourceFile(options.path ?? '', content, ts.ScriptTarget.Latest, true)

      // showTree(sourceFile)

      const nodes = getSourceNodes(sourceFile)

      const moduleEffectsArrayNode = nodes.find(n => n.kind === ts.SyntaxKind.Identifier && n.getChildCount() === 0 && n.getText().includes('ModuleEffects'))

      if (moduleEffectsArrayNode) {
        // console.log(moduleEffectsArrayNode)

        showTree(moduleEffectsArrayNode)

        const arrayChange = new InsertChange(options.path ?? '', moduleEffectsArrayNode.pos, "WAAASAAPPP")
        
        const importChange = insertImport(sourceFile, options.path ?? '', 'TEST SYMBOL', 'Test file name')

        const changes = [arrayChange, importChange]

        const declarationRecorder = tree.beginUpdate(options.path ?? '',);
        for (const change of changes) {
          if (change instanceof InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd)
          }
        }

        tree.commitUpdate(declarationRecorder)

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