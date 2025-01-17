"use client";

import {
  Box,
  Grid2,
  Paper,
  Typography,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import Timer from "../../components/Timer";
import { useState } from "react";
import { useParams } from "next/navigation";
import { QuestionDoc } from "./types";
import { addDocument, updateTask } from "../../../../lib/fetch";

function DataProvider({ data }: { data: QuestionDoc[] }) {
  const [QuestionIndex, setQuestionIndex] = useState(0);
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const theme = useTheme();
  const params = useParams();
  const id = params.slug;
  console.log("question data", data);

  if (QuestionIndex >= 15) {
    return (
      <>
        <Typography variant="h1" m={20}>
          Test completed
        </Typography>
        <Button variant="contained" onClick={() => setQuestionIndex(0)}>
          Restart
        </Button>
      </>
    );
  }

  const sortedData = data;
  return (
    <>
      <Box
        sx={{
          marginTop: "60px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Timer
            key={QuestionIndex}
            onFinish={(time: {min:number,seconds:number}) =>{
              if(time.seconds === 0 && time.min === 0) setQuestionIndex(QuestionIndex+1)
              return (
                <Box>
                  <Typography variant="h4" marginLeft={4}>
                    Times Remaining {time.min} : {time.seconds}
                  </Typography>
                </Box>
              )
            } }
   
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                m: 2,
              }}
              onClick={() =>
                setQuestionIndex((prev) => {
                  if (prev > 0) return prev - 1;
                  else return 0;
                })
              }
            >
              Prev
            </Button>
            <Button
              variant="contained"
              sx={{
                m: 2,
              }}
              onClick={() =>{ 
                setQuestionIndex((prev) => prev + 1)
                updateTask(`test-${id}`,sortedData[QuestionIndex].id,{
                  ...data[QuestionIndex].doc,
                  date:new Date().getTime().toString()
                },false)
              
              }}
            >
              Next
            </Button>
            <Button
              onClick={() => {
                const newDoc = {
                  qtext: "add question here",
                  options: ["option1", "option2", "option3", "option4"],
                  answer: "option3",
                  testName: sortedData[0].doc.testName,
                  date:new Date().getTime().toString()
                };
                addDocument(`test-${id}`, newDoc);
              }}
            >
              +
            </Button>
          </Box>
        </Box>

        <Typography>{sortedData[0].doc.testName}</Typography>
      </Box>

      <Grid2
        container
        sx={{
          width: "100vw",
          gap: 4,
        }}
      >
        <Grid2>
          <Box
            sx={{
              p: 2,
              marginLeft: 24,
              maxWidth: "80vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography m={2} variant="h4">
                Question : {QuestionIndex + 1} out of {15}
              </Typography>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(sortedData[QuestionIndex].doc.qtext)
                }
              >
                Copy
              </Button>
            </Box>

            <Paper
              elevation={10}
              sx={{
                p: 2,
                minWidth: "80vw",

                maxHeight: "60vh",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f1f1f1",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              <pre
                onDoubleClick={() => {
                  setShowInput("question");
                  setValue(data[QuestionIndex].doc.qtext);
                }}
                style={{
                  textAlign: "left",
                  fontSize: "0.9rem",
                  whiteSpace: "break-spaces",
                }}
              >
                {showInput !== "question" && (
                  <code>
                    {" "}
                    <Typography
                      fontWeight={500}
                      letterSpacing={0.8}
                      lineHeight={1.5}
                      fontSize={18}
                      variant="body1"
                    >
                      {sortedData[QuestionIndex].doc.qtext}
                    </Typography>
                  </code>
                )}
                {showInput === "question" && (
                  <TextField
                    fullWidth
                    multiline
                    rows={15}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => {
                      updateTask(`test-${id}`, sortedData[QuestionIndex].id, {
                        ...sortedData[QuestionIndex].doc,
                        qtext: value,
                      });
                      setShowInput(null);
                    }}
                  />
                )}
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
            {/* <Typography m={2} variant="h4">
              {" "}
              Select Answer
            </Typography> */}
            {/* <Paper
              elevation={10}
              sx={{ p: 1, minWidth: "30vw", minHeight: "60vh" }}
            >
              <form style={{ padding: "12px" }}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  {data[QuestionIndex].doc.options?.map((item, i) => (
                    <FormControlLabel
                      key={i}
                      onDoubleClick={() => setShowInput(item)}
                      value={item}
                      control={<Radio />}
                      label={
                        showInput !== item ? (
                          <Typography
                            fontSize={16}
                            variant="body1"
                            style={{
                              whiteSpace: "normal",
                              maxWidth: "300px",
                              textAlign: "left",
                              margin: "12px",
                            }}
                          >
                            {item}
                          </Typography>
                        ) : (
                          <TextField
                            autoFocus
                            fullWidth
                            value={value}
                            size="small"
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={() => {
                              updateTask(`test-${id}`, data[QuestionIndex].id, {
                                ...data[QuestionIndex].doc,
                                options: [
                                  ...data[QuestionIndex].doc.options.slice(
                                    0,
                                    i
                                  ),
                                  value,
                                  ...data[QuestionIndex].doc.options.slice(
                                    i + 1
                                  ),
                                ],
                              });

                              setShowInput(null);
                            }}
                          />
                        )
                      }
                    />
                  ))}
                </RadioGroup>
              </form>
            </Paper> */}
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}

export default DataProvider;
