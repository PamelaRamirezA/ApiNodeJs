
export interface DeliveryEntry {
    id: string,
	creation_date: string,
	state: State,
	pickup: number,
	dropoff: number,
	/*pickup: {
		pickup_lat: number,
		pickup_lon: number
	},
	dropoff: {
		dropoff_lat: number,
		dropoff_lon: number
	},*/
	zone_id: string
}

//export type NonSensitiveData = Pick <DeliveryEntry, 'id' | 'creation_date' |  'state' | 'pickup' | 'dropoff'>

export type NonSensitiveData = Omit <DeliveryEntry, 'zone_id'>

export type newDeliveryEntry = Omit <DeliveryEntry, 'id' | 'creation_date'>

export interface BotEntry {
    id: string,
	/*location: {
		lat: number,
		lon: number
	},*/
	loc_lat: number,
	loc_lon: number,
	status: string,
	zone_id: string
}
export type newBotEntry = Omit <BotEntry, 'id'>
