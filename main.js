import inquirer from "inquirer";
// First we make a class object in which we define object properties
class Student {
    static counter = 10000;
    id;
    name;
    course;
    balance;
    //we make a constructor in whic we assign the value o properties
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.course = [];
        this.balance = 1000;
    }
    enrollCourse(course) {
        this.course.push(course);
        console.log(`This course ${course} is added Successfully in your Course List ${this.course}`);
    }
    view_balance() {
        console.log(`This is your available balance $${this.balance}`);
    }
    pay_tuition_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Tution fees paid Sucessfully.\n Now your remaining Amount is $${this.balance}`);
    }
    show_status() {
        console.log(`ID:${this.id}`);
        console.log(`Name:${this.name}`);
        console.log(`Course:${this.course}`);
        console.log(`Balance:$${this.balance}`);
    }
}
//Defining a student manager class to manage student
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new Student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added Successfully. Student ID: ${student.id}`);
    }
    //Method to enroll a student in a course
    enroll_student(student_id, course) {
        //    let student_find = this.students.find(std =>std.id === student_id);
        let student_find = this.found_student(student_id);
        if (student_find) {
            student_find.enrollCourse(course);
            console.log(`${student_find.name} enrolled in ${course} course`);
        }
    }
    //Mehod to view a student balance
    view_student_balance(student_id) {
        let student = this.found_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found .Please enter a correct student Id");
        }
    }
    //Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.found_student(student_id);
        if (student) {
            student.pay_tuition_fees(amount);
        }
        else {
            console.log(`Student not found. Please enter a correct student ID`);
        }
    }
    //Method to find a student by student id
    found_student(student_id) {
        return this.students.find(Std => Std.id === student_id);
    }
    // Method to display student status
    show_Student_status(student_id) {
        let student = this.found_student(student_id);
        if (student) {
            student.show_status();
        }
    }
}
// Make function to run a Program
async function main() {
    console.log("Welcome to code with Shehroz -'Student Mangement Portal' ");
    console.log(".".repeat(60));
    let student_manager = new Student_manager();
    // while loop to program running
    while (true) {
        let choices = await inquirer.prompt([
            {
                name: "Choice",
                type: "list",
                message: "Please Select an Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        //Using If-else statment for using choice
        switch (choices.Choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student name"
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "Student_Id",
                        type: "number",
                        message: "Enter a student Id"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name"
                    }
                ]);
                student_manager.enroll_student(course_input.Student_Id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student Id",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let pay_fees = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student Id",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Please Enter an Amount"
                    }
                ]);
                student_manager.pay_student_fees(pay_fees.student_id, pay_fees.amount);
                break;
            case "Show Status":
                let status = await inquirer.prompt([
                    {
                        name: "student_ID",
                        type: "number",
                        message: "Enter a student id"
                    }
                ]);
                student_manager.show_Student_status(status.student_ID);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
            default:
                console.log("Incvalid Choice");
        }
    }
}
main();
