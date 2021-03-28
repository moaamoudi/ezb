import React, { useState } from "react";
import CalenderScheduler from "./CalendarScheduler.js";
import { useAuth } from "../Context/AuthContext";

export default function Calendar() {
  const { allCompanyTasks } = useAuth();
  const schedulerData = [
    {
      title: "Website Re-Design Plan",
      startDate: new Date(2018, 5, 25, 9, 35),
      endDate: new Date(2018, 5, 25, 11, 30),
      id: 0,
      location: "Room 1",
      test: "test1",
    },
    {
      title: "Book Flights to San Fran for Sales Trip",
      startDate: new Date(2018, 5, 25, 12, 11),
      endDate: new Date(2018, 5, 25, 13, 0),
      id: 1,
      location: "Room 1",
      test: "test2",
    },
    {
      title: "Install New Router in Dev Room",
      startDate: new Date(2018, 5, 25, 14, 30),
      endDate: new Date(2018, 5, 25, 15, 35),
      id: 2,
      location: "Room 2",
      test: "test3",
    },
    {
      title: "Approve Personal Computer Upgrade Plan",
      startDate: new Date(2018, 5, 25, 10, 0),
      endDate: new Date(2018, 5, 28, 11, 0),
      id: 3,
      location: "Room 2",
      test: "test4",
    },
    {
      title: "Final Budget Review",
      startDate: new Date(2018, 5, 26, 12, 0),
      endDate: new Date(2018, 5, 26, 13, 35),
      id: 4,
      location: "Room 2",
      test: "test5",
    },
    {
      title: "New Brochures",
      startDate: new Date(2018, 5, 26, 14, 30),
      endDate: new Date(2018, 5, 26, 15, 45),
      id: 5,
      location: "Room 2",
      test: "test6",
      lol: "lol",
    },
    {
      title: "Install New Database",
      startDate: new Date(2018, 5, 27, 9, 45),
      endDate: new Date(2018, 5, 27, 11, 15),
      id: 6,
      location: "Room 1",
      test: "test7",
    },
    {
      title: "Approve New Online Marketing Strategy",
      startDate: new Date(2018, 5, 27, 12, 0),
      endDate: new Date(2018, 5, 27, 14, 0),
      id: 7,
      location: "Room 3",
      test: "test8",
    },
  ];
  return (
    <div>
      <CalenderScheduler data={allCompanyTasks}></CalenderScheduler>
    </div>
  );
}
