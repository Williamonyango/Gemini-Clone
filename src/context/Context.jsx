import { createContext } from "react";
import { Message, FileUpload } from "../config/Gemini";
import React, { useState } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [previousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const onSend = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (selectedFile) {
      response = await FileUpload(input, selectedFile);
      setSelectedFile(null);
    } else {
      if (prompt !== undefined) {
        response = await Message(prompt);
        setRecentPrompt(prompt);
      } else {
        setPreviousPrompts((prev) => [...prev, input]);
        response = await Message(input);
        setRecentPrompt(input);
      }
    }

    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    previousPrompts,
    setPreviousPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSend,
    displayedText,
    selectedFile,
    setSelectedFile,
    setDisplayedText,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
