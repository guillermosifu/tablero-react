import { useEffect, useState } from "react"
import { getDepartments } from "../../helpers/general/ApiLocations"

export const apiDepartments = () => {
  const [isDepartmentsLoaded, setIsDepartmentsLoaded] = useState(false)
  const [dataDepartments, setDataDepartments] = useState([])
  
  useEffect(() => {
    setIsDepartmentsLoaded(true)
    getDepartments().then(res => {
      if (res.statusCode == 200) {
        setDataDepartments(res.data)
      }
      setIsDepartmentsLoaded(false)
    })
  }, [])

  const optionsDepartments = dataDepartments?.map(({ name, department }) => ({
    label: name,
    value: department
  }))

  return {
    optionsDepartments,
    isDepartmentsLoaded
  }
}
