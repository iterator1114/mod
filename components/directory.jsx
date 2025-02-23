"use client";
import React, { useState } from "react";
import json from "../data/directory.json";

const Files = ({ fileData, handleAddFolder, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <>
      {fileData.map((file) => (
        <div key={file.id} className="file">
          <div>
            {file.isFolder && (
              <span
                className={isExpanded[file?.name] ? "arrow expanded" : "arrow"}
                onClick={() => {
                  setIsExpanded((prev) => ({
                    ...prev,
                    [file?.name]: !prev[file?.name],
                  }));
                }}
              >
                {">"}
              </span>
            )}
            <span> {file?.name}</span>
            {file.isFolder && (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleAddFolder(file.id);
                }}
              >
                {" +"}
              </span>
            )}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleDelete(file.id);
              }}
            >
              {"  -"}
            </span>
          </div>

          {file?.children && isExpanded[file?.name] && (
            <Files
              fileData={file?.children}
              handleAddFolder={handleAddFolder}
              handleDelete={handleDelete}
            />
          )}
        </div>
      ))}
    </>
  );
};

const Directory = () => {
  const [data, setData] = useState(json);

  const handleAddFolder = (parentId) => {
    const name = prompt("Enter name of folder: ");
    const addNode = (data) => {
      return data.map((file) => {
        if (file.id === parentId) {
          return {
            ...file,
            children: [
              ...file.children,
              {
                id: Date.now().toString(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }
        if (file.children) {
          return { ...file, children: addNode(file.children) };
        }
        return file;
      });
    };

    setData((prev) => addNode(prev));
  };

  const handleDelete = (parentId) => {
    const deleteNode = (file) => {
      return file
        .filter((item) => item.id !== parentId)
        .map((item) => {
          if (item.children) {
            return { ...item, children: deleteNode(item.children) };
          }
          return item;
        });
    };

    setData((prev) => deleteNode(prev));
  };

  return (
    <div className="file__container">
      <Files
        fileData={data}
        handleAddFolder={handleAddFolder}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Directory;
