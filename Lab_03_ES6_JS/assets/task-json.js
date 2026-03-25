// Create 3 student objects [cite: 103]
const rawStudents = [
    { name: "Arslan", age: 21, semester: 5, courses: ["Web Dev", "SQE"] },
    { name: "Ahmed", age: 22, semester: 5, courses: ["AI", "OS"] },
    { name: "Sara", age: 20, semester: 5, courses: ["Database", "HCI"] }
];

// Convert to JSON [cite: 104]
const jsonString = JSON.stringify(rawStudents);

// Convert back to objects [cite: 105]
const parsedStudents = JSON.parse(jsonString);

let htmlOutput = `<div class="container"><h3>Student JSON Data</h3>`;

// Loop through students [cite: 108]
parsedStudents.forEach(student => {
    // Destructuring [cite: 106]
    const { name, age, semester, courses } = student;
    
    // Display in HTML [cite: 107]
    htmlOutput += `
        <div class="student-card">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Age:</strong> ${age} | <strong>Semester:</strong> ${semester}</p>
            <p><strong>Courses:</strong> ${courses.join(", ")}</p>
        </div>
    `;
});

htmlOutput += `</div>`;
document.getElementById("taskJson").innerHTML = htmlOutput;