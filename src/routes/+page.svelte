<script lang="ts">
	// import Counter from './Counter.svelte';
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcome_fallback from '$lib/images/svelte-welcome.png';

	import axios from 'axios';
	import { onMount } from 'svelte';
	import Departures from './Departures.svelte';

	interface Response {
		stops: Stop[];
		news: string;
	}

	interface Stop {
		stop: Stop2;
		signs: Sign[];
		infoText: string[];
	}

	interface Stop2 {
		id: number;
		number: number;
		zone: number;
		fullName: string;
		chapsName: string;
		busStopSign: any[];
	}

	interface Sign {
		busStopSign: BusStopSign;
		departures: Departure[];
	}

	interface BusStopSign {
		id: number;
		busStopId: number;
		number: number;
		description: string;
		coordinates: Coordinates;
		busStopSignBusStopTransportlink: any[];
		busStop: any;
	}

	interface Coordinates {
		lng: number;
		lat: number;
	}

	interface Departure {
		link: string;
		platform: string;
		destinationStop: string;
		time: string;
		isOnline: boolean;
	}

	export const stops = {
		'175': {
			name: 'Kolejní',
			departures: [] as Departure[]
		},
		'455': {
			name: 'Technologický park',
			departures: [] as Departure[]
		}
	};

	const getDepartures = async () => {
		const response = await axios.post<Response>(
			// 'https://poseidon2api.idsjmk.cz/api/departures/busstops',
			'/api/departures/busstops',
			Object.keys(stops)
		);
		console.log(response.data);
		for (const _stop in stops) {
			const stop = _stop as keyof typeof stops;
			stops[stop].departures = response.data.stops.filter(
				(s) => s.stop.id === +stop
			)[0].signs[0].departures;
		}
	};

	onMount(() => {
		getDepartures();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<!-- Esempio risposta:
	{
    "stops": [
        {
            "stop": {
                "id": 175,
                "number": 1252,
                "zone": 101,
                "fullName": "Brno, Kolejní",
                "chapsName": "Kolejní",
                "busStopSign": []
            },
            "signs": [
                {
                    "busStopSign": {
                        "id": 424,
                        "busStopId": 175,
                        "number": 2,
                        "description": "odjezd",
                        "coordinates": {
                            "lng": 16.57191033333333,
                            "lat": 49.230640666666666
                        },
                        "busStopSignBusStopTransportlink": [],
                        "busStop": null
                    },
                    "departures": [
                        {
                            "link": "N99",
                            "platform": "",
                            "destinationStop": "Technologický park",
                            "time": "♿03:13",
                            "isOnline": true
                        }
                    ]
                }
            ],
            "infoText": [
                "VÝLUKA MERHAUTOVA: Linky 44, 46, 72 a 84 jedou obousměrným odklonem třídou Generála Píky, linky 57 a N92 jedou obousměrným odklonem ulicí Porgesovou."
            ]
        }
    ],
    "news": ""
}
 -->

<!-- <Departures {departures} stopName="Kolejní" />
<Departures {departures} stopName="Kolejní" /> -->

<!-- map stop to Departures, annotate keyof -->
{#each Object.keys(stops) as stop}
	<Departures departures={stops[stop].departures} stopName={stops[stop].name} />
{/each}
