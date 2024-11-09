export const getAddress = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          'User-Agent': 'favourite-places/1.0 (karthick78789kk@gmail.com)', // replace with your app name and contact email
        },
      }
    );

    if (!response.ok) {
      console.error(`Error fetching address: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data && data.display_name) {
      return data.display_name;
    } else {
      console.warn("Address not found for the given coordinates.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};
