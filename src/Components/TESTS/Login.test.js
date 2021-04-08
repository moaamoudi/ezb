// import React from "React";
// import ReactDOM from "react-dom";
// import Login from "../Login";
// import { BrowserRouter as Router } from "react-router-dom";
// import { render, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(
//     <Router>
//       <Login />
//     </Router>,
//     div
//   );
// });

// it("renders element correctly", () => {
//   const { getByTestId } = render(
//     <Router>
//       <Login />
//     </Router>
//   );
//   expect(getByTestId("Login")).toBeTruthy();
// });

// describe("input value", () => {
//   it("updates", () => {
//     const { getByTestId } = render(
//       <Router>
//         <Login />
//       </Router>
//     );

//     const emailInput = getByTestId("email");
//     fireEvent.change(emailInput, { target: { value: "test" } });
//     expect(emailInput.value).toBe("test");
//   });
// });
