// Load workouts from localStorage when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayWorkouts();
});

function logWorkout() {
    const workoutType = document.getElementById('workoutType').value;
    const startTime = new Date(document.getElementById('startTime').value);
    const endTime = new Date(document.getElementById('endTime').value);
    const mood = document.getElementById('mood').value;
    const notes = document.getElementById('notes').value;
    
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

    // Create workout object
    const workout = {
        workoutType: workoutType,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: duration,
        mood: mood,
        notes: notes
    };

    // Get logged workouts from localStorage
    let workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    
    // Add new workout
    workouts.push(workout);
    
    // Save back to localStorage
    localStorage.setItem('workouts', JSON.stringify(workouts));
    
    // Clear inputs
    document.getElementById('workoutType').value = 'running';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
    document.getElementById('mood').value = 'good';
    document.getElementById('notes').value = '';
    
    // Refresh display
    displayWorkouts();
}

function getMoodEmoji(mood) {
    const moodEmojis = {
        'great': ':D',
        'good': ':)',
        'okay': ':/',
        'tired': ':[',
        'exhausted': 'D:'
    };
    return moodEmojis[mood] || '';
}

function displayWorkouts() {
    const workoutList = document.getElementById('workoutList');
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    
    // Clear existing entries
    while (workoutList.children.length > 1) {
        workoutList.removeChild(workoutList.lastChild);
    }
    
    // Display workouts in reverse chronological order
    workouts.reverse().forEach(workout => {
        const entry = document.createElement('div');
        entry.className = 'workout-entry';
        
        const startDate = new Date(workout.startTime);
        const endDate = new Date(workout.endTime);
        
        entry.innerHTML = `
            <div><strong>${workout.workoutType.charAt(0).toUpperCase() + workout.workoutType.slice(1)}</strong></div>
            <div>Date: ${startDate.toLocaleDateString()}</div>
            <div>Start: ${startDate.toLocaleTimeString()}</div>
            <div>End: ${endDate.toLocaleTimeString()}</div>
            <div>Duration: <span class="duration">${Math.round(workout.duration)} minutes</span></div>
            <div class="mood">Mood: ${getMoodEmoji(workout.mood)} ${workout.mood.charAt(0).toUpperCase() + workout.mood.slice(1)}</div>
            ${workout.notes ? `<div class="notes">${workout.notes}</div>` : ''}
        `;
        
        workoutList.appendChild(entry);
    });
}