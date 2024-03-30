import countries from "world-countries"


const formattedCountries=countries.map((country) => 
({
    values:country.cca2,
    label:country.name.common,
    flag:country.flag,
    latlng:country.latlng,
    region:country.region
}))
const useCountries=()=>{
    const getAll=()=>formattedCountries;
    const getByValue=(value:string)=>{ 
        return formattedCountries.find((item)=>item.values===value)
    }
    return{
        getAll,getByValue
    }
}
export default useCountries;
