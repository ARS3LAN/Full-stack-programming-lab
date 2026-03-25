class PortalStudent {
    constructor(id, name) { this.id = id; this.name = name; }
}

const studentMap = new Map();
studentMap.set(231991, new PortalStudent(231991, "Arslan"));

const courseSet = new Set(["Web Development", "Operating Systems"]);

function saveData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ students: studentMap, courses: courseSet });
        }, 2000);
    });
}

saveData().then(data => {
    const student = data.students.get(231991);
    const courses = Array.from(data.courses).join(", ");
    document.getElementById("task6").innerHTML = `
        <div class="container">
            <h3>Mini University Portal</h3>
            <p><strong>Data Saved Successfully!</strong></p>
            <p><strong>Student:</strong> ${student.name} (ID: ${student.id})</p>
            <p><strong>Registered Courses:</strong> ${courses}</p>
        </div>
    `;
});