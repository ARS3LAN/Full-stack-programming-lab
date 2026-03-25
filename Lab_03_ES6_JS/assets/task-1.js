class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }
}

const students = [
    new Student(231991, "Arslan", 5, ["Software Quality Engineering", "AI"]),
    new Student(231992, "Ali", 5, ["Operating Systems", "Web Development"]),
    new Student(231993, "Sara", 5, ["Agent-Based SE", "DevOps"])
];

let htmlOutput = `
    <h3>Student Management System</h3>
    <table class="styled-table">
        <thead>
            <tr><th>ID</th><th>Name</th><th>Semester</th><th>Courses</th></tr>
        </thead>
        <tbody>
`;

students.forEach(student => {
    htmlOutput += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.semester}</td>
            <td>${student.courses.join(", ")}</td>
        </tr>
    `;
});

htmlOutput += `</tbody></table>`;
document.getElementById("task1").innerHTML = htmlOutput;