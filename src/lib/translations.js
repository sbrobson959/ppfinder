export const translations = {
	en: {
		// root
		title: 'Tulsa Polling Places',
		header: 'Find your polling place for the November 5 election in Tulsa.',
		searchBarPlaceholder: 'Enter address',
		voterPortal: 'Oklahoma Voter Portal',
		localElectionBoard: 'local election board',

		// errors
		couldNotLocatePrecinct: {
			part1: 'We could not locate your precinct. Please use the',
			part2: 'or call your',
			part3: 'to find your polling place.'
		},
		badGateway: {
			part1: 'The server returned a 502 Gateway Error. Please try again later. Contact',
			part2: 'or call our office at',
			part3: 'for further assistance.'
		},
		pollingPlaceNotOnRecord: {
			part1: 'We do not have your polling place on record. Please use the',
			part2: 'or call your',
			part3: 'to find your polling place.'
		},

		// PollingPlace.svelte
		pollingPlace: 'Polling Place',
		loadingImage: 'Loading image...',
		mapOfPollingPlace: 'Polling place map',
		findOnGoogleMaps: 'Find on Google Maps',
		address: 'Address',
		hours: 'Hours',
		inPersonHours: '7am-7pm, Nov. 5',
		cantBeTurnedAway: 'As long as you are in line by 7pm, you cannot be turned away.',

		// EarlyVoting.svelte
		earlyVoting: 'Early Voting',
		earlyVotingLocationMap: 'Early voting location map',
		errorLoadingImage: 'Error loading image',
		earlyVotingHoursLine1: '8am-6pm, Oct. 30-Nov. 1',
		earlyVotingHoursLine2: '8am-2pm, Nov. 2',

		// Districts.svelte
		politicalDistricts: 'Political Districts',
		county: 'County',
		precinct: 'Precinct',
		countyCommissionerDistrict: 'County Commissioner District',
		stateHouseDistrict: 'State House District',
		stateSenateDistrict: 'State Senate District'
	},
	es: {
		title: 'Lugares de votación en Tulsa',
		header: 'Encuentre su lugar de votación para las elecciones del 5 de noviembre en Tulsa.',
		searchBarPlaceholder: 'Introduce tu dirección',
		voterPortal: 'Portal de Votantes de OK',
		localElectionBoard: 'junta electoral local',

		// errors
		couldNotLocatePrecinct: {
			part1: 'No pudimos localizar su distrito. Utilice el',
			part2: 'o llame a su',
			part3: 'para encontrar su lugar de votación.'
		},
		badGateway: {
			part1: 'El servidor devolvió un error 502 de puerta de enlace. Intente nuevamente más tarde. Comuníquese con',
			part2: 'o llame a nuestra oficina al',
			part3: 'para obtener más ayuda.'
		},
		pollingPlaceNotOnRecord: {
			part1: 'No tenemos registrado su lugar de votación. Utilice el',
			part2: 'o llame a su',
			part3: 'para encontrar su lugar de votación.'
		},

		// PollingPlace.svelte
		pollingPlace: 'Lugar de votación',
		loadingImage: 'Cargando imagen...',
		mapOfPollingPlace: 'Mapa del lugar de votación',
		findOnGoogleMaps: 'Encuentre en Google Maps',
		address: 'Dirección',
		hours: 'Horas',
		inPersonHours: '5 de noviembre, 7 a.m. a 7 p.m.',
		cantBeTurnedAway: 'Mientras estés en la fila antes de las 7 p.m., no te pueden negar el voto.',

		// EarlyVoting.svelte
		earlyVoting: 'Votando temprano',
		earlyVotingLocationMap: 'Mapa del lugar de votación anticipada',
		errorLoadingImage: 'Error al cargar la imagen',
		earlyVotingHoursLine1: '30 de oct. al 1 de nov., de 8 a.m. a 6 p.m.',
		earlyVotingHoursLine2: '2 de nov., de 8 a.m. a 2 p.m.',

		// Districts.svelte
		politicalDistricts: 'Distritos Políticos',
		county: 'Condado',
		precinct: 'Precinto',
		countyCommissionerDistrict: 'Distrito del Comisionado del Condado',
		stateHouseDistrict: 'Distrito de la Cámara de Representantes Estatal',
		stateSenateDistrict: 'Distrito del Senado Estatal'
	}
};
