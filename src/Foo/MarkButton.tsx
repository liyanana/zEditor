
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import { Button, Icon } from './components'
import { isMarkActive, toggleMark } from './utils'

export const MarkButton = ({ format, icon,children }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
     {children}
    </Button>
  )
}