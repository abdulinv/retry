"use client"

import {
    Box,
    Grid2,
    Paper,
    Radio,
    RadioGroup,
    FormControlLabel,
    Typography,
    Button,
  } from "@mui/material";
  import Timer from "../../components/Timer"
  import { useState } from "react";
  import { test } from "../../../models/Test";
  import { useParams } from "next/navigation";
  
  function TestPage() {
    const [QuestionIndex, setQuestionIndex] = useState(0);
    
    const params = useParams();
    const id = params.slug;
    console.log(params)
  
    if (QuestionIndex >= test[Number(id) - 1].test.length) {
      return (
        <Typography variant="h1" m={20}>
          Test completed
        </Typography>
      );
    }
    return (
      <>
        <Box
          sx={{
            marginTop: "30px",
          }}
        >
          <Timer />
          <Button
            variant="contained"
            sx={{
              m: 2,
            }}
            onClick={() => setQuestionIndex((prev) => prev + 1)}
          >
            Next
          </Button>
          <Typography>React Test-1</Typography>
        </Box>
  
        <Grid2
          container
          sx={{
            width: "100vw",
            gap: 4,
            height: "100vh",
          }}
        >
          <Grid2>
            <Box
              sx={{
                p: 2,
                maxWidth: "60vw",
              }}
            >
              <Typography m={2} variant="h4">
                Question : {QuestionIndex + 1} out of{" "}
                {test[Number(id) - 1].test.length}
              </Typography>
              <Paper
                elevation={10}
                sx={{
                  p: 2,
                  minWidth: "40vw",
                  minHeight: "50vh",
                }}
              >
                <pre style={{ textAlign: "left", fontSize: "0.9rem" ,whiteSpace:"break-spaces"}}>
                  <code>{test[Number(id) - 1].test[QuestionIndex].question}</code>
                </pre>
              </Paper>
            </Box>
          </Grid2>
  
          <Grid2>
            <Box
              sx={{
                p: 2,
                marginTop: 0,
                mr: 8,
                width: "100%",
              }}
            >
              <Typography m={2} variant="h4">
                {" "}
                Select Answer
              </Typography>
              <Paper
                elevation={10}
                sx={{ p: 1, minWidth: "30vw", minHeight: "52vh" }}
              >
                <form style={{ padding: "12px" }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {test[Number(id) - 1].test[QuestionIndex].options?.map(
                      (item) => (
                        <FormControlLabel
                          value={item}
                          control={<Radio />}
                          label={
                            <Typography
                              style={{
                                whiteSpace: "normal",
                                maxWidth: "300px",
                                textAlign: "left",
                                margin: "12px",
                              }}
                            >
                              {item}
                            </Typography>
                          }
                        />
                      )
                    )}
                  </RadioGroup>
                </form>
              </Paper>
            </Box>
          </Grid2>
        </Grid2>
      </>
    );
  }
  
  export default TestPage;
  