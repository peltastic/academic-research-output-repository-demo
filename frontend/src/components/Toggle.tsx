import { useState } from 'react'
import { Switch } from '@headlessui/react'

type Props = {
    setEnabled: () => void
    enabled: boolean
}

function Toggle(props: Props) {
  return (
    <Switch
      checked={props.enabled}
      onChange={props.setEnabled}
      className={`${
        props.enabled ? 'bg-secondary' : 'bg-[#787878]'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          props.enabled ? 'translate-x-6 bg-primary' : 'translate-x-1 bg-[#000]'
        } inline-block h-4 w-4 transform rounded-full  transition`}
      />
    </Switch>
  )
}

export default Toggle