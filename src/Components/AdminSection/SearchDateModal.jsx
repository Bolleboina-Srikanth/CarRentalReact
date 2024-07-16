import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function SearchDatesModel({ setFilterDates, }) {
  const [open, setOpen] = React.useState(false);
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const fdate = firstDayOfMonth.toISOString();
  const [searchFields, setSearchFields] = React.useState({
    startDate: fdate,
    endDate: new Date().toISOString(),
  });
  setFilterDates(searchFields);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchFields({ ...searchFields, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
        style={{ margin: "2px" }}
      >
        <FilterListIcon />
        Search Dates
      </Button>
      <Modal
        aria-labelledby="close-modal-title"
        open={open}
        onClose={(_event, reason) => {
          setOpen(false);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 300,
            borderRadius: "md",
            p: 3,
            height: "35vh",
          }}
        >
          <ModalClose variant="outlined" />
          <Typography
            component="h2"
            id="close-modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
          >
            Select Dates
          </Typography>
          <form
            className="user-form"
            style={{
              height: "35vh",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="form-group1">
              <div>
              <label htmlFor="appt">From Date To: &nbsp;</label>
              <input
                type="datetime-local"
                id="form-time"
                name="startDate"
                onChange={handleChange}
                value={searchFields.startDate}
              />
              </div> <br />
              <div className="report-endDate-s">
                <label htmlFor="appt"> End Date:</label>
                <input
                  type="datetime-local"
                  id="form-time"
                  name="endDate"
                  onChange={handleChange}
                  value={searchFields.endDate}
                />
              </div>

              <div className="date-filter-form">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="form-button"
                  onClick={handleSubmit}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
