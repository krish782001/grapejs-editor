import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage';
import 'grapesjs-blocks-basic'; // Additional plugin for basic blocks

const GrapesJSEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      height: '100vh',
      width: 'auto',
      plugins: ['gjs-preset-webpage', 'gjs-blocks-basic'],
      pluginsOpts: {
        'gjs-preset-webpage': {},
        'gjs-blocks-basic': {},
      },
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
      },
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'section',
            label: '<b>Section</b>',
            attributes: { class: 'gjs-block-section' },
            content: `<section>
                        <h1>This is a simple title</h1>
                        <p>This is just a Lorem text: Lorem ipsum dolor sit amet</p>
                      </section>`,
          },
          {
            id: 'image',
            label: '<b>Image</b>',
            content: {
              type: 'image',
              activeOnRender: true,
            },
          },
        ],
      },
      styleManager: {
        sectors: [
          {
            name: 'General',
            open: false,
            buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
          },
          {
            name: 'Dimension',
            open: false,
            buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
          },
          {
            name: 'Typography',
            open: false,
            buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color'],
          },
        ],
      },
      panelManager: {
        appendTo: '#panels',
      },
      deviceManager: {
        devices: [
          { name: 'Desktop', width: '' }, // default device
          { name: 'Tablet', width: '768px' },
          { name: 'Mobile', width: '375px' },
        ],
      },
      layerManager: {
        appendTo: '#layers',
      },
      traitManager: {
        appendTo: '#traits',
      },
    });

    // Adding custom commands
    editor.Commands.add('show-layers', {
      run(editor) {
        const layersPanel = editor.Panels.getPanel('views-container');
        layersPanel && layersPanel.show();
      },
    });

    editor.Commands.add('open-code', {
      run(editor) {
        editor.Modal.setTitle('Edit code').setContent('<textarea style="width:100%; height:250px;"></textarea>').open();
      },
    });

    editor.Panels.addButton('options', {
      id: 'open-code',
      className: 'fa fa-code',
      command: 'open-code',
      attributes: { title: 'Open Code' },
    });

    return () => {
      editor.destroy();
    };
  }, []);

  return (
    <div>
      <div id="panels"></div>
      <div id="blocks"></div>
      <div id="layers"></div>
      <div id="traits"></div>
      <div ref={editorRef}></div>
    </div>
  );
};

export default GrapesJSEditor;
