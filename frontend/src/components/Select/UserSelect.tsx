import React from 'react'
import styled from 'styled-components'
import { Select } from '@ur/react-components'

interface UserSelectProps {}

const UserSelect = (props: UserSelectProps) => {
  return (
    <Select
      options={[
        { label: 'Test', value: 'test' },
        { label: 'Test2', value: 'test2' },
      ]}
    />
  )
}
