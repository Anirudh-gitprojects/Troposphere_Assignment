import * as React from "react";
import Box from "@mui/material/Box"; // Material UI for design.
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import "./App.css"; // CSS styling

export default function App() {
  // Fees Data JSON
  const feeData = {
    "Exam Fee": {
      INDIAN: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 400,
          },
        },
      },
      FOREIGN: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 100,
          },
        },
      },
      NRI: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 600,
          },
        },
      },
      SAARC: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 600,
          },
        },
      },
    },
    "Application Fee": {
      INDIAN: {
        ALL_COURSES: {
          UG: {
            amount: 200,
          },
          "UG-DIPLOMA": {
            amount: 300,
          },
          PG: {
            amount: 500,
          },
        },
      },
      FOREIGN: {
        ALL_COURSES: {
          UG: {
            amount: 400,
          },
          "UG-DIPLOMA": {
            amount: 400,
          },
          PG: {
            amount: 700,
          },
        },
      },
    },
  };

  // States to handle the different key values in JSON Data
  const [feeSelected, setFeeSelected] = useState("");
  const [nationality, setNationality] = useState("");
  const [courseSelected, setCourseSelected] = useState("");
  const [levelSelected, setLevelSelected] = useState("");
  const [amount, setAmount] = useState("");

  // ALL_COURSE Substituted with courses array
  const courses = ["Medical", "Dental", "Ayurveda"];

  // ALL_LEVEL Substituted with levels array
  const levels = ["UG", "PG", "DIPLOMA", "Ph.D"];

  // Input Handler for Fee select.
  const handleFeeChange = (event) => {
    setFeeSelected(event.target.value);
    setNationality("");
    setCourseSelected("");
    setLevelSelected("");
    setAmount("");
  };

  // Input Handler for Nationality select.
  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
    setCourseSelected(""); // Reset course and level when nationality changes
    setLevelSelected("");
    setAmount(null); // Reset amount when nationality changes
  };

  // Input Handler for Course select.
  const handleCourseChange = (event) => {
    setCourseSelected(event.target.value);
    setLevelSelected(""); // Reset level when course changes
    setAmount(null); // Reset amount when course changes
  };

  // Input Handler for Level Select.
  const handleLevelChange = (event) => {
    setLevelSelected(event.target.value);

    if (
      courses.includes(courseSelected) &&
      feeData[feeSelected][nationality]["ALL_COURSES"]["ALL_LEVEL"]
    ) {
      setAmount(
        feeData[feeSelected][nationality]["ALL_COURSES"]["ALL_LEVEL"].amount
      );
    } else if (
      courses.includes(courseSelected) &&
      feeData[feeSelected][nationality]["ALL_COURSES"]
    ) {
      setAmount(
        feeData[feeSelected][nationality]["ALL_COURSES"][event.target.value]
          .amount
      );
    } else {
      console.log("No such data exists.");
    }
  };

  return (
    <Box className="container">
      <img
        id="image"
        src="https://plus.unsplash.com/premium_photo-1714348661832-a0d4960c601e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="college_pic"
      />
      <h1 id="title">COURSES AT TROPOSHERE UNIVERSITY</h1>
      <h3 id="formTitle">Application Form</h3>
      {/* Fee Selection */}
      <Box sx={{ width: 200, mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="fee-select-label">Fee Type</InputLabel>
          <Select
            id="fee"
            value={feeSelected}
            label="Fee"
            onChange={handleFeeChange}
          >
            {/* Render fee type */}
            {Object.keys(feeData).map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Nationality Selection */}
      <Box sx={{ width: 200, mt: 2 }}>
        {feeSelected ? (
          <FormControl fullWidth>
            <InputLabel id="nationality-select-label">Nationality</InputLabel>
            <Select
              id="nationality"
              value={nationality}
              label="Nationality"
              onChange={handleNationalityChange}
            >
              {/* Render nation data */}
              {Object.keys(feeData[feeSelected]).map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          //Conditionally Render Empty Data

          <FormControl fullWidth>
            <InputLabel id="nationality-select-label">Nationality</InputLabel>
            <Select value="" label="Select Nationality">
              <MenuItem value="null"></MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Course Selection */}
      <Box sx={{ width: 200, mt: 2 }}>
        {feeSelected && nationality ? (
          <FormControl fullWidth>
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
              id="course"
              value={courseSelected}
              label="Course"
              onChange={handleCourseChange}
            >
              {/* Check if 'ALL_COURSES​' is available in the selected nationality */}
              {feeData[feeSelected][nationality]["ALL_COURSES"] ? (
                // If 'ALL_COURSES​' exists, render static courses like Medical, Dental, Ayurveda
                courses.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No courses exist</MenuItem>
              )}
            </Select>
          </FormControl>
        ) : (
          //Conditionally Render Empty Data
          <FormControl fullWidth>
            <InputLabel id="nationality-select-label">Courses</InputLabel>
            <Select value="" label="Select Nationality">
              <MenuItem value="null"></MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Levels Selection */}
      <Box sx={{ width: 200, mt: 2 }}>
        {feeSelected && nationality && courseSelected ? (
          <FormControl fullWidth>
            <InputLabel id="course-select-label">Level</InputLabel>
            <Select
              id="level"
              value={levelSelected}
              label="Levels"
              onChange={handleLevelChange}
            >
              {/* Check if 'ALL_LEVEL​' is available in the selected nationality */}
              {feeData[feeSelected][nationality]["ALL_COURSES"]["ALL_LEVEL"]
                ? // If 'ALL_COURSES​ exists, render levels (UG, PG, etc.)
                  levels.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))
                : // If 'ALL_LEVEL' doesn't exist, render available levels or courses
                  Object.keys(
                    feeData[feeSelected][nationality]["ALL_COURSES"]
                  ).map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
        ) : (
          //Conditionally Render Empty Data

          <FormControl fullWidth>
            <InputLabel id="nationality-select-label">Level</InputLabel>
            <Select value="" label="Select Nationality">
              <MenuItem value="null"></MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>
      {/* Display the amount */}
      {amount && (
        <Box sx={{ mt: 2 }}>
          <h1 id="amount">Amount: {amount}</h1>
        </Box>
      )}
    </Box>
  );
}
