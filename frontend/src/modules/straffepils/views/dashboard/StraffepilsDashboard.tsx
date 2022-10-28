import { Header } from 'modules/straffepils/components/Header'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { SPContainer, SPWrapper } from 'modules/straffepils/components'
import { useUser } from 'utils'
import {
  Straffepils,
  useAllStraffepilsQuery,
  useMeQuery,
  useUserStraffepilsQuery,
} from 'generated/graphql'
import { UserContext } from 'context'
import { StraffepilsLine } from './components/StraffepilsLine'
import { Details } from './components/Details'

interface StraffepilsDashboardProps {}

export const StraffepilsDashboard: React.FC<StraffepilsDashboardProps> = () => {
  const me = useMeQuery()
  const user = useContext(UserContext)

  const [{ data: data2, fetching: fetching2, error: error2 }, refetch2] =
    useUserStraffepilsQuery({ variables: { id: user?.id! } })

  return (
    <SPWrapper>
      <SPContainer>
        <Header />
        <Details userStraffepils={data2} />
        {data2?.userStraffepils &&
          data2?.userStraffepils?.straffepils.map(straffepils => {
            if (!straffepils) return <div>faen</div>
            return (
              <StraffepilsLine
                straffepils={{
                  id: straffepils.id,
                  reason: straffepils?.reason,
                  giver: straffepils.giver,
                  receiver: straffepils.receiver,
                  amount: straffepils.amount,
                  confirmed: true,
                }}
              />
            )
          })}
      </SPContainer>
    </SPWrapper>
  )
}
