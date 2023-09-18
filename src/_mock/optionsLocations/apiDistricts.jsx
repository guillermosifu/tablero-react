import { useEffect, useState } from "react"
import { getDistricts } from "../../helpers/general/ApiLocations"

export const apiDistrict = ({ idDepartment, idProvince }) => {
  const [isDistrictLoaded, setIsDistrictLoaded] = useState(false)
  const [dataDistricts, setDataDistricts] = useState([])
  
  useEffect(() => {
    if (idDepartment?.length > 0 && idProvince?.length > 0) {
      setIsDistrictLoaded(true)
      getDistricts('_', idDepartment, idProvince).then(res => {
        if (res.statusCode == 200) {
          setDataDistricts(res.data)
        }
        setIsDistrictLoaded(false)
      })
    }
  }, [idDepartment, idProvince])

  const optionsDistricts = dataDistricts?.map(({ name, province }) => ({
    label: name,
    value: province
  }))

  return {
    optionsDistricts,
    isDistrictLoaded
  }
}
