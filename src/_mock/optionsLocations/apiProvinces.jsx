import { useEffect, useState } from "react"
import { getProvinces } from "../../helpers/general/ApiLocations"

export const apiProvinces = ({ idDepartment }) => {
  const [isProvincesLoaded, setIsProvincesLoaded] = useState(false)
  const [dataProvinces, setDataProvinces] = useState([])
  
  useEffect(() => {
    if (idDepartment?.length > 0) {
      setIsProvincesLoaded(true)
      getProvinces('_', idDepartment).then(res => {
        if (res.statusCode == 200) {
          setDataProvinces(res.data)
        }
        setIsProvincesLoaded(false)
      })
    }
  }, [idDepartment])

  const optionsProvinces = dataProvinces?.map(({ name, province }) => ({
    label: name,
    value: province
  }))

  return {
    optionsProvinces,
    isProvincesLoaded
  }
}