import React from 'react'
import Icone from './Icone'
import { TbBeach, TbMountain } from 'react-icons/tb'
import { GiWindmill, GiModernCity, GiIsland, GiBoatFishing, GiBarn, GiCutDiamond, GiForestCamp, GiCactus, GiCaveEntrance } from 'react-icons/gi'
import { LiaSwimmingPoolSolid, LiaSnowflake } from 'react-icons/lia'
import { FaSkiing } from 'react-icons/fa'
import { BiSolidCastle } from 'react-icons/bi'
import { useSearchParams } from 'next/navigation'
type Props = {}
export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!',
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property is has windmills!',
    },
    {
        label: 'Modern',
        icon: GiModernCity,
        description: 'This property is modern!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is in the countryside!'
    },
    {
        label: 'Pools',
        icon: LiaSwimmingPoolSolid,
        description: 'This is property has a beautiful pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activies!'
    },
    {
        label: 'Castles',
        icon: BiSolidCastle,
        description: 'This property is an ancient castle!'
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property offers camping activities!'
    },
    {
        label: 'Arctic',
        icon: LiaSnowflake,
        description: 'This property is in arctic environment!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!'
    },
    {
        label: 'Lux',
        icon: GiCutDiamond,
        description: 'This property is brand new and luxurious!'
    }
]
function IconsNavbar({ }: Props) {
    const params = useSearchParams();
    const category1 = params?.get('category');
    return (
        <div className='w-full h-fit z-50 flex flex-1 flex-row overflow-x-scroll lg:overflow-x-hidden lg:justify-around lg:items-center '>
            {categories.map((category) => (
                <Icone title={category.label} desc={category.description} selected={category1===category.label} Icon={category.icon} key={category.label}/>
            ))}

        </div>
    )
}

export default IconsNavbar