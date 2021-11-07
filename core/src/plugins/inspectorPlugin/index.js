// @seang todo: convert data controls to typescript to remove this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Inspector } from './Inspector'

function install(editor) {
  const { onInspector, sendToInspector, clearTextEditor } = editor.thoth

  editor.on('componentregister', component => {
    const builder = component.builder

    if (!component.info)
      throw new Error(
        'All components must contain an info property describing the component to the end user.'
      )

    // we are going to override the default builder with our own, and will invoke the original builder inside it.
    component.builder = node => {
      // This will unsubscribe us
      // if (node.subscription) node.subscription()
      // Inspector class which will handle regsistering data controls, serializing, etc.
      node.inspector = new Inspector({ component, editor, node })

      // Adding category to node for display on node`
      node.category = component.category

      // todo this should likely go somewhere better.  Maybe a thoth plugin for all general thoth related things?
      node.deprecated = component.deprecated

      node.displayName = component.displayName

      node.info = component.info

      // here we attach the default info control to the component which will show up in the inspector

      node.subscription = onInspector(node, data => {
        node.inspector.handleData(data)
        editor.trigger('nodecreated')
        // NOTE might still need this.  Keep an eye out.
        // sendToInspector(node.inspector.data());
      })

      builder.call(component, node)
    }
  })

  let currentNode

  // handle publishing and subscribing to inspector
  editor.on('nodeselect', node => {
    if (currentNode && node.id === currentNode.id) return
    currentNode = node
    clearTextEditor()
    sendToInspector(node.inspector.data())
  })
}

export { DataControl } from './DataControl'

const defaultExport = {
  name: 'inspector',
  install,
}

export default defaultExport
