import React, { useState } from 'react'
import Select from 'react-select'
import useCountries from '../hooks/useCountries'
import { ReactCountryFlag } from "react-country-flag";
import { useSnapshot } from 'valtio';
import state from '../config/store';
export type Props = {
    flag: string,
    label: string,
    latlng: number[],
    region: string,
    values: string
}
/*type CountrySelectProps={
    value?:Props;
    onChange:(value:Props)=>void;
}*/
function Location() {
    const { getAll } = useCountries()
    const snap=useSnapshot(state)
    const handleLocationChange = (newLocation:any) => {
        state.location = { ...newLocation };
    };
    return (
        <div>
            <Select placeholder='Anywhere' formatOptionLabel={(option: any) => (
                <div className='flex flex-row items-center gap-3'>
                    {option.flag && <ReactCountryFlag countryCode={option?.values} svg />}
                    <div>
                        {option.label},
                        <span className='text-neutral-800 ml-1'>
                            {option.region}
                        </span>
                    </div>
                </div>
            )} isClearable options={getAll()} classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg'
            }} value={snap.location} theme={(theme) => ({ ...theme, borderRadius: 6, colors: { ...theme.colors, primary: 'black', primary25: "#ffe4e6" } })} onChange={handleLocationChange} />
        </div>
    )
}

export default Location