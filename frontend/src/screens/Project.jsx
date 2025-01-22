import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../config/axios";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import { getWebContainer } from "../config/webContainer";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  React.useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}

const Project = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();
  const navigate = useNavigate();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set()); // Initialized as Set
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  // const { user } = useContext(UserContext)
  const messageBox = React.createRef();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // New state variable for messages
  const [fileTree, setFileTree] = useState({});

  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);

  const [webContainer, setWebContainer] = useState(null);
  const [iframeUrl, setIframeUrl] = useState(null);

  const [runProcess, setRunProcess] = useState(null);
  const [filterUser, setFilterUser] = useState(null);
  const [userArr, setUserArr] = useState([]);

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  useEffect(() => {
    handleSearch(filterUser);
  }, [filterUser]);

  function addCollaborators() {
    console.log(Array.from(selectedUserId));
    axios
      .put(
        "/projects/add-user",
        {
          projectId: location.state.project._id,
          users: Array.from(selectedUserId),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSelectedUserId(new Set())
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const send = () => {
    console.log(user);
    sendMessage("project-message", {
      message,
      sender: user,
    });
    setMessages((prevMessages) => [...prevMessages, { sender: user, message }]); // Update messages state
    setMessage("");
  };

  function WriteAiMessage(message) {
    const messageObject = JSON.parse(message);

    return (
      <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
        <Markdown
          children={messageObject.text}
          options={{
            overrides: {
              code: SyntaxHighlightedCode,
            },
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    initializeSocket(project._id);

    if (!webContainer) {
      getWebContainer().then((container) => {
        setWebContainer(container);
        console.log("container started");
      });
    }

    receiveMessage("project-message", (data) => {
      console.log(data);

      if (data.sender._id == "ai") {
        const message = JSON.parse(data.message);
        console.log(typeof data.message);

        console.log(message);

        webContainer?.mount(message.fileTree);

        if (message.fileTree) {
          setFileTree(message.fileTree || {});
        }
        setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
      } else {
        setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
      }
    });

    axios
      .get(`/projects/get-project/${location.state.project._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.project);

        setProject(res.data.project);
        setFileTree(res.data.project.fileTree || {});
      });

    axios
      .get("/users/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isSidePanelOpen]);

  function saveFileTree(ft) {
    axios
      .put(
        "/projects/update-file-tree",
        {
          projectId: project._id,
          fileTree: ft,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleSearch = (e) => {
    axios
      .get(`/projects/getby-username?filter=${e}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserArr(res.data.selectuser);
        console.log(res.data);
      });
  };

  // Removed appendIncomingMessage and appendOutgoingMessage functions

  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }

  return (
    <main className="h-screen w-screen flex">
      <section className="left relative flex flex-col h-screen min-w-96 bg-slate-300">
        <header
          className={`flex justify-between items-center p-2 px-4 w-full ${
            isSidePanelOpen ? "bg-outer" : "bg-inner"
          } absolute z-10 top-0`}
        >
          <button className="flex gap-2  " onClick={() => setIsModalOpen(true)}>
            <i className="text-xl text-white  ri-add-fill mr-1"></i>
            <p className="text-xl text-white font-mono ">Add collaborator</p>
          </button>
          <div className=" flex justify-end gap-4 text-xl">
            <button onClick={() => navigate("/")}>
              <i className=" text-xl text-white hover:text-yellow ri-home-2-line"></i>
            </button>
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2"
            >
              <i className=" text- text-white hover:text-yellow ri-group-line"></i>
            </button>
          </div>
        </header>
        <div className="conversation-area bg-outer pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div
            ref={messageBox}
            className="message-box p-1 flex-grow flex flex-col font-mono pt-4 pr-2 gap-1 overflow-auto max-h-full scrollbar-hide"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender._id === "ai" ? "max-w-80" : "max-w-52"
                } ${
                  msg.sender._id == user._id.toString() && "ml-auto"
                }  message flex flex-col p-2 bg-slate-50 w-fit rounded-md`}
              >
                <small className="opacity-65 text-xs">{msg.sender.email}</small>
                <div className="text-sm">
                  {msg.sender._id === "ai" ? (
                    WriteAiMessage(msg.message)
                  ) : (
                    <p>{msg.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="inputField w-full flex absolute bottom-0">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 px-4 border-none outline-none flex-grow"
              type="text"
              placeholder="Enter message"
            />
            <button onClick={send} className="px-5 bg-slate-950 text-white">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
        <div
          className={`sidePanel bg-inner  text-white font-mono w-full h-full flex flex-col gap-2 absolute transition-all ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-between items-center px-4 p-2 bg-slate-200">
            <h1 className="font-semibold text-lg">Collaborators</h1>

            <button
              onClick={() => {
                setIsSidePanelOpen(!isSidePanelOpen);
                setSelectedUserId(new set());
              }}
              className="p-2"
            >
              <i className="ri-close-fill"></i>
            </button>
          </header>
          <div className="users flex flex-col gap-2">
            {project.users &&
              project.users.map((user) => {
                return (
                  <div className="user cursor-pointer hover:bg-primary p-2 flex gap-2 items-center">
                    <div className="aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                      <i className="ri-user-fill absolute"></i>
                    </div>
                    <h1 className="font-semibold text-lg">{user.username}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="right  bg-red-50 flex-grow h-full flex">
        <div className="explorer h-full max-w-64 min-w-36  bg-slate-200 flex flex-col justify-between ">
          <div className="file-tree w-full flex flex-col ">
            {Object.keys(fileTree).map((file, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentFile(file);
                  setOpenFiles([...new Set([...openFiles, file])]);
                }}
                className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-300 w-full"
              >
                <p className="font-semibold text-lg">{file}</p>
              </button>
            ))}
          </div>

          <div className="actions flex flex-col ">
            <button
              onClick={async () => {
                await webContainer.mount(fileTree);

                const installProcess = await webContainer.spawn("npm", [
                  "install",
                ]);

                installProcess.output.pipeTo(
                  new WritableStream({
                    write(chunk) {
                      console.log(chunk);
                    },
                  })
                );

                if (runProcess) {
                  runProcess.kill();
                }

                let tempRunProcess = await webContainer.spawn("npm", ["start"]);

                tempRunProcess.output.pipeTo(
                  new WritableStream({
                    write(chunk) {
                      console.log(chunk);
                    },
                  })
                );

                setRunProcess(tempRunProcess);

                webContainer.on("server-ready", (port, url) => {
                  console.log(port, url);
                  setIframeUrl(url);
                });
              }}
              className={`p-2 px-4  bg-slate-600 text-white ${
                openFiles.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              run
            </button>
            <button
              className={` bg-slate-300  justify-center font-semibold text-lg tree-element cursor-pointer p-2 px-4 flex items-center gap-2  w-full ${
                openFiles.length === 0
                  ? "cursor-not-allowed "
                  : " cursor-pointer"
              }`}
            >
              Remove
              <i
                onClick={() => {
                  setOpenFiles([]);
                  setFileTree({});
                  setIframeUrl(null);
                }}
                className="ri-delete-bin-line"
              ></i>
            </button>
          </div>
        </div>

        <div className="code-editor flex flex-col flex-grow h-full shrink">
          <div className="top flex justify-between w-full">
            <div className="files flex">
              {openFiles.map((file, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFile(file)}
                  className={`open-file cursor-pointer p-2 px-4 flex items-center w-fit gap-2 bg-slate-300 ${
                    currentFile === file ? "bg-slate-400" : ""
                  }`}
                >
                  <p className="font-semibold text-lg">{file}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
            {fileTree[currentFile] && (
              <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
                <pre className="hljs h-full">
                  <code
                    className="hljs h-full outline-none"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const updatedContent = e.target.innerText;
                      const ft = {
                        ...fileTree,
                        [currentFile]: {
                          file: {
                            contents: updatedContent,
                          },
                        },
                      };
                      setFileTree(ft);
                      saveFileTree(ft);
                    }}
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(
                        "javascript",
                        fileTree[currentFile].file.contents
                      ).value,
                    }}
                    style={{
                      whiteSpace: "pre-wrap",
                      paddingBottom: "25rem",
                      counterSet: "line-numbering",
                    }}
                  />
                </pre>
              </div>
            )}
          </div>
        </div>

        {iframeUrl && webContainer && (
          <div className="flex min-w-96 flex-col bg-inner h-full ">
            <div className="address-bar ">
              <input
                type="text"
                onChange={(e) => setIframeUrl(e.target.value)}
                value={iframeUrl}
                className="w-full p-2 px-4 bg-slate-200"
              />
            </div>
            <iframe src={iframeUrl} className="  w-full h-full"></iframe>
          </div>
        )}
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-outer text-white p-4 rounded-md w-96 max-w-full relative">
            <header className="flex  justify-between items-center mb-4">
              <h2 className="text-xl font-mono  ">Add Collaborator</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="inputField  relative  text-black    font-mono outline-none  w-full flex flex-col min-h-32 mb-4">
              {/* Input Field */}
             <div className="flex  ">
             <input
                value={filterUser || ""}
                onChange={(e) => setFilterUser(e.target.value)}
                className="p-2   max-h-10  px-4 border border-gray-300 outline-none flex-grow rounded-sm"
                type="text"
                placeholder="Search for users"
              />
              <button  className={`text-lg flex items-center ${Array.from(selectedUserId).length>0?'cursor-pointer':'cursor-not-allowed'} justify-center min-w-10 text-white font-semibold bg-black`} onClick={addCollaborators}>
              <i className="ri-add-large-line flex items-center  "></i>
              </button>
             </div>

              {/* Dropdown for User Suggestions */}
              {filterUser && userArr.length > 0 && (
                <div className="absolute top-1/3 bg-white  left-0 w-full shadow-md  z-10">
                  {userArr.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => handleUserClick(user._id)} // Select user on click
                      className={`p-2 px-4 cursor-pointer ${
                        selectedUserId.has(user._id) ? "bg-slate-400" : ""
                      }`}
                    >
                      {user.username}
                    </div>
                  ))}
                </div>
              )}

            
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
