import { useEffect, useState } from 'react'
import { getRoles } from '../../helpers/ApiRoles'

export const apiRols = () => {
  const [dataRoles, setDataRoles] = useState([])
  const [isRolesLoading, setIsRolesLoading] = useState(false)
  
  useEffect(() => {
    setIsRolesLoading(true)
    getRoles().then(res => {
      if (res.statusCode == 200) {
        setDataRoles(res.data)
      }
      setIsRolesLoading(false)
    })
  }, [])

  const optionsRoles = dataRoles?.map(({ id, name }) => ({
    label: name,
    value: id
  }))

  return {
    isRolesLoading,
    optionsRoles
  }
}
