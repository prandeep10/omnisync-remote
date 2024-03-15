document.addEventListener('DOMContentLoaded', () => {
    const devicesContainer = document.getElementById('devices');

    // Function to fetch and display devices status
    const fetchDevicesStatus = async () => {
        try {
            const response = await fetch('https://omnisynctechnologies.onrender.com/api/devices');
            const devices = await response.json();

            devicesContainer.innerHTML = ''; // Clear previous content

            Object.entries(devices).forEach(([device, status]) => {
                const deviceDiv = document.createElement('div');
                deviceDiv.classList.add('device');
                deviceDiv.classList.add(status ? 'on' : 'off');

                const button = document.createElement('button');
                button.textContent = status ? 'Turn Off' : 'Turn On';
                button.addEventListener('click', () => toggleDevice(device, !status));

                deviceDiv.textContent = `${device}: `;
                deviceDiv.appendChild(button);
                devicesContainer.appendChild(deviceDiv);
            });
        } catch (error) {
            console.error('Error fetching devices status:', error);
        }
    };

    // Function to toggle device status
    const toggleDevice = async (device, status) => {
        try {
            const response = await fetch(`https://omnisynctechnologies.onrender.com/api/devices/${device}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });

            const data = await response.json();
            console.log(data.message);

            // Update UI after toggling device status
            fetchDevicesStatus();
        } catch (error) {
            console.error(`Error toggling ${device} status:`, error);
        }
    };

    // Initial fetch of devices status
    fetchDevicesStatus();
});
