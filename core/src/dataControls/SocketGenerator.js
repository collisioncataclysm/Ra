import { DataControl } from '../plugins/inspectorPlugin'

export class SocketGeneratorControl extends DataControl {
  constructor({
    socketType = 'anySocket',
    taskType = 'output',
    ignored = [],
    icon = 'properties',
    connectionType,
    name: nameInput,
  }) {
    if (
      !connectionType ||
      (connectionType !== 'input' && connectionType !== 'output')
    )
      throw new Error(
        "connectionType of your generator must be defined and of the value 'input' or 'output'."
      )

    const name = nameInput || `Socket ${connectionType}s`

    const options = {
      dataKey: connectionType + 's',
      name,
      component: 'socketGenerator',
      icon,
      data: {
        ignored,
        socketType,
        taskType,
        connectionType,
      },
    }

    super(options)

    this.connectionType = connectionType
  }
}
