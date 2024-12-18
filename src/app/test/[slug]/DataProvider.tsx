"use client";

import {
  Box,
  Grid2,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Button,
  TextField,
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

  const params = useParams();
  const id = params.slug;
  console.log("question data", data);

  if (QuestionIndex >= data.length) {
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
          marginTop: "100px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Timer />
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
              onClick={() => setQuestionIndex((prev) => prev + 1)}
            >
              Next
            </Button>
            <Button
              onClick={() => {
                const newDoc = {
                  qtext: "add question here",
                  options: ["option1", "option2", "option3", "option4"],
                  answer: "option3",
                  testName: data[0].doc.testName,
                };
                addDocument(`test-${id}`, newDoc);
              }}
            >
              +
            </Button>
          </Box>
        </Box>

        <Typography>{data[0].doc.testName}</Typography>
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
              Question : {QuestionIndex + 1} out of {data.length}
            </Typography>
            <Paper
              elevation={10}
              sx={{
                p: 5,
                minWidth: "60vw",
                minHeight: "60vh",
                maxHeight:"60vh",
                overflow:"auto"
              }}
            >
              <pre
                onDoubleClick={() => setShowInput("question")}
                style={{
                  textAlign: "left",
                  fontSize: "0.9rem",
                  whiteSpace: "break-spaces",
                }}
              >
                {showInput !== "question" && (
                  <code>
                    {" "}
                    <Typography fontWeight={500} letterSpacing={0.8} lineHeight={1.5} fontSize={18} variant="body1">{data[QuestionIndex].doc.qtext}</Typography>
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
                      updateTask(`test-${id}`, data[QuestionIndex].id, {
                        ...data[QuestionIndex].doc,
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
            <Typography m={2} variant="h4">
              {" "}
              Select Answer
            </Typography>
            <Paper
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
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}

export default DataProvider;
