import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import ApiHandler from "../helpers/ApiHandler";

const FamilyList = () => {
  const [tempData, setTempData] = useState([]);
  const token = sessionStorage.getItem("token");
  const [error, setError] = useState({ display: "none" });
  const [comp, setComp] = useState({ current: "" });
  const cenetCss = {
    marginLeft: "25%",
    marginRight: " 25%",
    width: "50%",
    marginTop: "12.5%",
  };

  const filterData = (id, data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        setTempData(data[i]);
      } else {
        continue;
      }
    }
  };

  const handelOnClick = (e) => {
    let value = "";
    value = tempData[e.target.value];
    let x = `NO ${e.target.value} found for the user.`;
    if (Array.isArray(value)) {
      x = value.map((v, i) => {
        return v.first_name + "<br/>";
      });
    } else if (value) {
      x = value.first_name;
    }
    document.getElementById("demo").innerHTML = x;
  };
  useEffect(async () => {
    const response = await ApiHandler("families/", "get", {}, token);
    if (response && response.status === 200) {
      setComp({
        current: (
          <div style={cenetCss}>
            <p style={error}> Went something wrong in calling the API.</p>
            <b>All families are:</b>
            {response.data.map((v, i) => {
              return (
                <li key={i}>
                  <span onClick={FamilyDetail} id={v.id}>
                    {" "}
                    {v.first_name + "'s"}{" "}
                  </span>
                </li>
              );
            })}
          </div>
        ),
      });
    } else {
      setError({ color: "red" });
    }
  }, []);

  const FamilyDetail = async (e) => {
    e.preventDefault();
    const response = await ApiHandler(
      `person/${e.target.id}/`,
      "get",
      {},
      token
    );
    if (response && response.status === 200 && response.data) {
      setComp({
        current: (
          <div style={cenetCss}>
            <p>
              <b> Please Select Person </b>
            </p>

            <select
              onChange={(e) => {
                filterData(e.target.value, response.data);
              }}
            >
              <option> --select persion--</option>{" "}
              {response.data.map((v, i) => {
                return (
                  <option key={v.id} value={v.id}>
                    {v.first_name}{" "}
                  </option>
                );
              })}
            </select>
            <p>
              <br />
              <Button onClick={handelOnClick} value="children">
                {" "}
                Children{" "}
              </Button>
              <Button
                className="btn-success"
                onClick={handelOnClick}
                value="parent"
              >
                {" "}
                Parent{" "}
              </Button>
              <Button
                className="btn-info"
                onClick={handelOnClick}
                value="grand_father"
              >
                {" "}
                Grand Parents{" "}
              </Button>
              <Button
                className="btn-danger"
                onClick={handelOnClick}
                value="sibling"
              >
                {" "}
                Siblings{" "}
              </Button>
              <Button
                className="btn-warning"
                onClick={handelOnClick}
                value="cousins"
              >
                {" "}
                Cousins{" "}
              </Button>
            </p>
            <div id="demo"> </div>
          </div>
        ),
      });
    }
  };
  return <div>{comp.current}</div>;
};
export default FamilyList;
