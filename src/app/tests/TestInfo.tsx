"use client";

import { Box, Typography, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { TestListDoc } from "../test/[slug]/types";
import { updateTask } from "../../../lib/fetch";

function TestInfo({ item }: { item: TestListDoc }) {
  const [showInput, setShowInput] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");

  return (
    <Box sx={{ display: "flex", gap: 4 }}>
      <Button onDoubleClick={() => setShowInput(`${item.id}-stack`)}>
        {showInput !== `${item.id}-stack` && (
          <Typography
            variant="h6"
            align="left"
            sx={{
              minWidth: "10vw",
              maxWidth: "10vw",
            }}
            fontWeight={900}
            key={item.doc.stack}
          >
            {item.doc.stack}
          </Typography>
        )}

        {showInput === `${item.id}-stack` && (
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onBlur={() => {
              updateTask("testList", item.id, {
                ...item.doc,
                stack: value,
              });
              setShowInput(null);
            }}
          />
        )}
      </Button>

      <Button
        color="secondary"
        onDoubleClick={() => {
          setShowInput(`${item.id}-testNumber`);
        }}
      >
        {showInput !== `${item.id}-testNumber` && (
          <Typography key={item.doc.stack}>
            Test : {item.doc.testNumber}
          </Typography>
        )}

        {showInput === `${item.id}-testNumber` && (
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onBlur={() => {
              updateTask("testList", item.id, {
                ...item.doc,
                testNumber: Number(value),
              });
              setShowInput(null);
            }}
          />
        )}
      </Button>
    </Box>
  );
}

export default TestInfo;
