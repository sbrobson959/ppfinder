import { GOOGLE_MAPS_API_KEY } from '$env/static/private';

export async function GET({ params, url }) {
	const { lat, lon } = params;
	const zoom = url.searchParams.get('zoom') || '15';
	const size = url.searchParams.get('size') || '600x400';

	// Construct the Google Static Map API URL
	const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=${zoom}&size=${size}&markers=color:red|${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}&maptype=hybrid`;

	// Fetch the map image directly from Google
	const response = await fetch(googleMapsUrl);

	// If the request failed, handle it accordingly
	if (!response.ok) {
		return new Response('Failed to fetch the map from Google', { status: response.status });
	}

	// Return the image data as a response, without exposing the API key
	const imageBuffer = await response.arrayBuffer();
	return new Response(imageBuffer, {
		headers: {
			'Content-Type': 'image/jpeg'
		}
	});
}
