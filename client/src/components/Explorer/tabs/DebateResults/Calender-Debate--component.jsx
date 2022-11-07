import React, { useState, Fragment, useEffect, useContext } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format, parseISO } from "date-fns";
import { CUSTOMER, returnDateObjQuery } from "../../../../constants/index";
import DebateContext from "../../../../context/Debates/debateContext";
import { toast } from "react-toastify";

function CalenderDebate() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const debateContext = useContext(DebateContext);

  const {
    debateQueryObj,

    manipulateQuery,
    searchRequestExplorerProm,
    addLoading,
    removeLoading,
    addError,
    addSearchQueryFormat,
  } = debateContext;

  const [displayDate, setDisplayDate] = useState(false);

  useEffect(() => {}, [state]);
  useEffect(() => {
    displayDateBox();
  }, [displayDate]);

  const startdate = format(
    parseISO(new Date(state[0].startDate).toISOString()),
    "dd-MM-yyyy"
  );
  const enddate = format(
    parseISO(new Date(state[0].endDate).toISOString()),
    "dd-MM-yyyy"
  );

  // function returnDateQueryVariableFilter() {
  //   let dateArray = ["sectionDateFrm", "sectionDateTo"];
  //   return mappingField[debatetype];
  // }

  function displayDateBox(event) {
    const selectDiv = document.getElementsByClassName("dateRange");

    // https://github.com/elastic/elasticsearch/issues/23319
    // https://logz.io/blog/elasticsearch-aggregations/
    // await setDisplayDate(!displayDate);

    if (displayDate) {
      // https://stackoverflow.com/questions/3331353/transitions-on-the-css-display-property
      selectDiv[0].style.opacity = 1;
      selectDiv[0].style.height = "auto";
    } else {
      selectDiv[0].style.opacity = 0;
      selectDiv[0].style.height = "0px";
    }
  }

  function applyRange(displaystate) {
    // console.info(
    //   `[DEBUG] the display state is ${JSON.stringify(displaystate)}`
    // );
    const { startDate, endDate } = displaystate;
    // Convert the dates into yyyy-MM-dd format
    addLoading();
    const startdate = format(
      parseISO(new Date(startDate).toISOString()),
      "yyyy-MM-dd"
    );
    const enddate = format(
      parseISO(new Date(endDate).toISOString()),
      "yyyy-MM-dd"
    );

    // console.info(
    //   `[DEBUG] From Date Range the value of startDate ${startdate} & endDate ${enddate}  `
    // );
    // Build a query for Dates Filter

    const dateQuery = returnDateObjQuery(
      ["sectionDateFrm", "sectionDateTo"],
      debateQueryObj,
      startdate,
      enddate
    );
    // console.info(`[DEBUG] The Date Query is \n ${JSON.stringify(dateQuery)} `);
    addSearchQueryFormat(dateQuery);

    searchRequestExplorerProm(dateQuery)
      .then((res) => {
        removeLoading();
      })
      .catch((err) => {
        addError(err);
        removeLoading();
        toast.error(
          "Connection to the Server Failed !!! Please Contact System Administrator"
        );
      });
  }

  function cancelRange() {
    setDisplayDate(false);
  }

  function datesQuery(itm) {
    // {"selection":{"startDate":"2021-06-14T18:30:00.000Z","endDate":"2021-06-14T18:30:00.000Z","key":"selection"}}
    setState([itm.selection]);
  }

  function dateDisplay() {
    // This function is used to get Date Display Format

    const startdt = new Date(
      format(parseISO(new Date(state[0].startDate).toISOString()), "yyyy-MM-dd")
    ).toISOString();

    const enddt = new Date(
      format(parseISO(new Date(state[0].endDate).toISOString()), "yyyy-MM-dd")
    ).toISOString();

    const currentdate = new Date(
      format(parseISO(new Date().toISOString()), "yyyy-MM-dd")
    ).toISOString();

    if (startdt === currentdate && enddt === currentdate) {
      return "Select Date Range";
    } else {
      return `${startdate} - ${enddate}`;
    }
  }

  return (
    <>
      <button
        className={
          CUSTOMER === "KLA" ? "calenderButton--kla" : "calenderButton--klc"
        }
        onClick={(e) => {
          setDisplayDate(!displayDate);
        }}
      >
        <i
          class="fa fa-calendar"
          aria-hidden="true"
          style={{
            padding: "0.5rem",
            fontSize: "1.2rem",
          }}
        ></i>
        {dateDisplay()}
      </button>
      <div className="dateRange" id="dateBox">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => datesQuery(item)}
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
        <div className="calender-date--container">
          <button
            className={
              CUSTOMER === "KLA"
                ? "calender-date--applyButton-kla"
                : "calender-date--applyButton-klc"
            }
            onClick={(e) => applyRange(state[0])}
          >
            Apply
          </button>
          <button
            className="calender-date--cancelButton"
            onClick={(e) => cancelRange(e)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default CalenderDebate;
