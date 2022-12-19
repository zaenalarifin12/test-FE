import "./reset.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

function App() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async (tags) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://128.199.198.77:3000?tags=${tags}`);
      setDataList(data?.data?.feed?.entry);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="app"
      style={{
        width: "80%",
        margin: "20px auto",
      }}
    >
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <p>List Content</p>
      </div>

      <input
        placeholder="search tag: bird, cat, dog, etc"
        style={{
          borderRadius: "5px",
          border: "1px solid #4B56D2",
          padding: "5px",
          width: "50%",
        }}
        onChange={(e) => {
          const { value } = e.target;

          if (value === "") {
            getData();
          } else {
            getData(value);
          }
        }}
      />
      {loading ? (
        <p>Loading ....</p>
      ) : (
        dataList?.map((item, index) => {
          return (
            <div
              style={{
                // display: "flex",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                boxShadow: "2px 2px 5px 0px #D1D9D9",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  display: "block",
                }}
              >
                {item?.title}
              </p>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                  width: "100%",
                  flexFlow: "wrap",
                }}
              >
                <p style={{ marginRight: 10, marginTop: 10 }}>Tag: </p>

                {item?.category?.map((categoryDetail) => {
                  return (
                    <p
                      style={{
                        fontSize: "14px",
                        border: `1px solid #${Math.floor(
                          Math.random() * 16777215
                        ).toString(16)}`,
                        borderRadius: "5px",
                        padding: "5px",
                        width: "auto",
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {categoryDetail?.term}
                    </p>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                  width: "100%",
                  flexFlow: "wrap",
                }}
              >
                {item?.content?.map((contentDetail) => {
                  const cleanHTML = DOMPurify.sanitize(contentDetail?._, {
                    USE_PROFILES: { html: true },
                  });

                  return (
                    <p
                      style={{
                        fontSize: "14px",
                        border: `1px solid #${Math.floor(
                          Math.random() * 16777215
                        ).toString(16)}`,
                        borderRadius: "5px",
                        padding: "5px",
                        width: "auto",
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {parse(cleanHTML)}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
