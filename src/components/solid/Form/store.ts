import { createStore } from "solid-js/store";

export const [store, setStore] = createStore(
  {
    validation: {
      name: {
        touched: false,
        errMsg: "This field is required",
      },
      email: {
        touched: false,
        errMsg: "This field is required",
      },
    },
    frameworks: [
      {
        name: "Vue.js",
        value: 0,
        tooltip: "",
      },
      {
        name: "Angular",
        value: 0,
        tooltip: "",
      },
      {
        name: "React.js",
        value: 0,
        tooltip: "",
      },
      {
        name: "JavaScript",
        value: 0,
        tooltip: "",
      },
    ],
    langs: [
      {
        name: ".NET",
        value: 0,
        tooltip: "",
      },
      {
        name: "Java",
        value: 0,
        tooltip: "",
      },
      {
        name: "Python",
        value: 0,
        tooltip: "",
      },
      {
        name: "Scala",
        value: 0,
        tooltip: "",
      },
      {
        name: "Ruby",
        value: 0,
        tooltip: "",
      },
      {
        name: "C++",
        value: 0,
        tooltip: "",
      },
      {
        name: "Node.js",
        value: 0,
        tooltip: "",
      },
      {
        name: "Golang",
        value: 0,
        tooltip: "",
      },
      {
        name: "PHP",
        value: 0,
        tooltip: "",
      },
    ],
    mobiles: [
      {
        name: "Android",
        value: 0,
        tooltip: "",
      },
      {
        name: "React Native",
        value: 0,
        tooltip: "",
      },
      {
        name: "iOS",
        value: 0,
        tooltip: "",
      },
      {
        name: "Xamarin",
        value: 0,
        tooltip: "",
      },
      {
        name: "Ionic",
        value: 0,
        tooltip: "",
      },
      {
        name: "Flutter",
        value: 0,
        tooltip: "",
      },
    ],
    db: [
      {
        name: "PostgreSQL",
        value: 0,
        tooltip: "",
      },
      {
        name: "MySQL",
        value: 0,
        tooltip: "",
      },
      {
        name: "Oracle",
        value: 0,
        tooltip: "",
      },
      {
        name: "MS Azure SQL DB",
        value: 0,
        tooltip: "",
      },
      {
        name: "MsSQL",
        value: 0,
        tooltip: "",
      },
      {
        name: "NoSQL",
        value: 0,
        tooltip: "",
      },
    ],
    specs: [
      {
        name: "Project Manager",
        value: 0,
      },
      {
        name: "UI/UX Designer",
        value: 0,
      },
      {
        name: "Business Analyst",
        value: 0,
      },
      {
        name: "DevOps Specialist",
        value: 0,
      },
      {
        name: "QA/QA Automation Engineer",
        value: 0,
      },
      {
        name: "Support Specialist",
        value: 0,
      },
      {
        name: "IT Security Specialist",
        value: 0,
      },
      {
        name: "Solution Architects",
        value: 0,
      },
    ]
  }
)