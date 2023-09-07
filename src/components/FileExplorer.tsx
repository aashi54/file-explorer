// src/FileExplorer.tsx
import React, { useState, MouseEvent } from 'react';
import './FileExplorer.css';
import { DiJavascript1 } from "react-icons/di";
import {AiFillHtml5} from "react-icons/ai";
import {SiTypescript} from "react-icons/si";
import {BsFiletypeSvg} from "react-icons/bs";
import {IoLogoCss3} from "react-icons/io";
import {BsFiletypePng} from "react-icons/bs";

interface File {
  type: string;
  name: string;
  meta?: string;
  data?: File[];
}

interface FileExplorerProps {
  data: File;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ data }) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; fileName: string }>({
    visible: false,
    x: 0,
    y: 0,
    fileName: '',
  });

  const toggleFolder = (folderName: string) => {
    if (expandedFolders.includes(folderName)) {
      setExpandedFolders(expandedFolders.filter((folder) => folder !== folderName));
    } else {
      setExpandedFolders([...expandedFolders, folderName]);
    }
  };

  const handleFileClick = (fileName: string) => {
    console.log(`Clicked on file: ${fileName}`);
  };

  const handleContextMenu = (event: MouseEvent, fileName: string) => {
    event.preventDefault();
    console.log(`menu for file: ${fileName}`);
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      fileName,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, fileName: '' });
  };

  const renderContextMenu = () => {
    const { visible, x, y, fileName } = contextMenu;
    if (!visible) return null;

    return (
      <div className="context-menu" style={{ top: y, left: x }}>
        <div onClick={() => copyFile(fileName)}>Copy</div>
        <div onClick={() => deleteFile(fileName)}>Delete</div>
        <div onClick={() => renameFile(fileName)}>Rename</div>
      </div>
    );
  };

  const copyFile = (fileName: string) => {
    console.log(`Copying file: ${fileName}`);
    closeContextMenu();
  };

  const deleteFile = (fileName: string) => {
    console.log(`Deleting file: ${fileName}`);
    closeContextMenu();
  };

  const renameFile = (fileName: string) => {
    console.log(`Renaming file: ${fileName}`);
    closeContextMenu();
  };

  const renderFileIcon = (fileType: string) => {
    return (
      <>
      
        {fileType === 'js' && <DiJavascript1/>}
        {fileType === 'svg' && <BsFiletypeSvg/>}
        {fileType === 'ts' && <SiTypescript/>}
        {fileType === 'html' && <AiFillHtml5/> }
        { fileType === 'css' && <IoLogoCss3/>}
        { fileType === 'png' && <BsFiletypePng/>}
  
      </>
    );
  };

  const renderFile = (file: File) => {
    return (
      <div
        key={file.name}
        className="file"
        onClick={() => handleFileClick(file.name)}
        onContextMenu={(e) => handleContextMenu(e, file.name)}
      >
        {renderFileIcon(file.meta || '')}
        <span className="file-name">{file.name}</span>
      </div>
    );
  };

  const renderFolder = (folder: File) => {
    const isExpanded = expandedFolders.includes(folder.name);

    return (
      <div key={folder.name} className="folder">
        <div onClick={() => toggleFolder(folder.name)} className="folder-name">
          {isExpanded ? '📂' : '📁'} {folder.name}
        </div>
        {isExpanded && folder.data?.map((item) => (item.type === 'folder' ? renderFolder(item) : renderFile(item)))}
      </div>
    );
  };

  return (
    <>
    <h1>File Explorer</h1>
   
    <div className="file-explorer">

      {renderFolder(data)}
      {renderContextMenu()}
    </div>
    </>
  );
};

export default FileExplorer;
