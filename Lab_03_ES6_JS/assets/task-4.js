const registeredCourses = new Set();
registeredCourses.add("Software Quality Engineering");
registeredCourses.add("Artificial Intelligence");
registeredCourses.add("Agent-Based SE");
registeredCourses.add("Artificial Intelligence"); // Duplicate attempt

let courseList = "";
for (let course of registeredCourses) {
    courseList += `<li>${course}</li>`;
}

document.getElementById("task4").innerHTML = `
    <div class="container">
        <h3>Unique Course Registration System</h3>
        <p><strong>Total Unique Courses:</strong> ${registeredCourses.size}</p>
        <ul>${courseList}</ul>
    </div>
`;