import { proxy } from 'valtio'

const state = proxy({
    type: '',
    location: {
        values: '',
        label: '',
        flag: '',
        latlng: [51,-0.09],
        region: '',
    },
    image:'',
    position:'type',
    guestCount:0,
    roomCount:0,
    bathroomCount:0,
    title:'',
    description:'',
    price:0.0,
    Adults:0,
    Children:0,
    Infants:0,
    Pets:0
})
export default state;