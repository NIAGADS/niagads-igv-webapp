// after https://raw.githubusercontent.com/jupyterlab/extension-examples/71486d7b891175fb3883a8b136b8edd2cd560385/react/react-widget/src/index.ts

import {
    JupyterFrontEnd,
    JupyterFrontEndPlugin
  } from '@jupyterlab/application';
  
  import { MainAreaWidget } from '@jupyterlab/apputils';
  
  import { ILauncher } from '@jupyterlab/launcher';
  
  import { reactIcon } from '@jupyterlab/ui-components';
  
  import { BrowserWidget } from './widget';
  
  /**
   * The command IDs used by the react-widget plugin.
   */
  namespace CommandIDs {
    export const create = 'create-react-widget';
  }
  
  /**
   * Initialization data for the react-widget extension.
   */
  const extension: JupyterFrontEndPlugin<void> = {
    id: 'react-widget',
    autoStart: true,
    optional: [ILauncher],
    activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
      const { commands } = app;
  
      const command = CommandIDs.create;
      commands.addCommand(command, {
        caption: 'Create a new React Widget',
        label: 'React Widget',
        icon: args => (args['isPalette'] ? null : reactIcon),
        execute: () => {
          const content = new BrowserWidget();
          const widget = new MainAreaWidget<BrowserWidget>({ content });
          widget.title.label = 'NIAGADS IGV Genome Browser';
          app.shell.add(widget, 'main');
        }
      });
  
      if (launcher) {
        launcher.add({
          command
        });
      }
    }
  };
  
  export default extension;
  