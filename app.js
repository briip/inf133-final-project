// Load runs from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayRuns();
});

function logRun() {
    const startTime = new Date(document.getElementById('startTime').value);
    const endTime = new Date(document.getElementById('endTime').value);
    
    // Error validation
    if (!startTime || !endTime) {
        alert('Please enter both start and end times');
        return;
    }
    
    if (endTime <= startTime) {
        alert('End time must be after start time');
        return;
    }

    // Calculate duration in minutes
    const duration = (endTime - startTime) / (1000 * 60);

    // Create run object
    const run = {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: duration
    };

    // Get logged runs from localStorage
    let runs = JSON.parse(localStorage.getItem('runs') || '[]');
    
    // Add new run
    runs.push(run);
    
    // Save back to localStorage
    localStorage.setItem('runs', JSON.stringify(runs));
    
    // Clear inputs
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
    
    // Refresh display
    displayRuns();
}

function displayRuns() {
    const runList = document.getElementById('runList');
    const runs = JSON.parse(localStorage.getItem('runs') || '[]');
    
    // Clear existing entries
    while (runList.children.length > 1) {
        runList.removeChild(runList.lastChild);
    }
    
    // Display runs in reverse chronological order
    runs.reverse().forEach(run => {
        const entry = document.createElement('div');
        entry.className = 'run-entry';
        
        const startDate = new Date(run.startTime);
        const endDate = new Date(run.endTime);
        
        entry.innerHTML = `
            <div>Date: ${startDate.toLocaleDateString()}</div>
            <div>Start: ${startDate.toLocaleTimeString()}</div>
            <div>End: ${endDate.toLocaleTimeString()}</div>
            <div>Duration: <span class="duration">${Math.round(run.duration)} minutes</span></div>
        `;
        
        runList.appendChild(entry);
    });
}
