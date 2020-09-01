import React, { useState } from "react";
import { Table } from "antd";
import FilterTable from "../shared/FilterTable";
import ConfirmationNotice from "../shared/ConfirmationNotice";
import { Add, Edit, Info, Delete, SaveAlt } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import useStyles from "../shared/material-ui-css"
import { deleteStop } from "../../redux/stops/stopAction";
import { useSelector, useDispatch } from "react-redux"
import history from "../../services/history"
import Map from "../map/Map"



export default function ListStops(props) {
  const dispatch = useDispatch();
  const [centerMap, setCenterMap] = useState();
  const [stopSelected, setStopSelected] = useState();
  const stops = useSelector((state) => state.stops)
  const drivers = useSelector((state) => state.drivers)
  const classes = useStyles();
  const columns = [
    {
      title: 'ID',
      key: 'index',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      ...FilterTable("name"),
    },
    {
      title: "Address",
      dataIndex: ["address", "location_id"],
    },
    {
      title: "Action",
      align: "center",
      width: 180,
      render: (data) => (
        <div className="buttonsGroup">
          <Edit onClick={() => stopUpdate(data)} className={classes.updateButton} />

          <Delete onClick={() => setStopSelected(data)} className={classes.deleteButton} />

          <Info onClick={() => stopDetails(data)} className={classes.detailsButton} />

        </div>
      ),
    },
  ];
  function getStopsDriversMarks() {
    var res = [];
    stops.data.map((stop, index) => res.push({ color: "red", text: index + 1, type: "service", lat: stop.address.lat, lng: stop.address.lon, data: stop.name }))
    drivers.data.map((driver, index) => res.push({ color: "blue", text: index + 1, type: "service", lat: driver.start_address.lat, lng: driver.start_address.lon, data: driver.name }))
    return res;
  }
  const addStop = () => history.push("/stops/add");
  const stopUpdate = (stop) => history.push("/stops/update", { stop });
  const stopDetails = (stop) => history.push("/stops/details", { stop });
  const stopDelete = (stop) => dispatch(deleteStop(stop._id));
  const uploadStops = () => history.push("/stops/upload");
  const onClickRow = (record) => {
    return {
      onClick: () => setCenterMap({ lat: record.address.lat, lng: record.address.lon })
    };
  }

  return (
    <>
      {stopSelected && <ConfirmationNotice
        buttonB={"DELETE"}
        message={"Are you sure to delete " + stopSelected.name + " ?"}
        title="Delete confirmation"
        show={stopSelected ? true : false}
        handleClose={() => setStopSelected()}
        actionB={() => stopDelete(stopSelected)} />}
      <div className="containerLeft">
        <div>
          <h2 className="formTitle">LIST STOPS</h2>
          <div className="buttonsGroup">
            <Button
              onClick={addStop}
              variant="contained"
              className={classes.buttonSubmit}
              startIcon={<Add />}>
              ADD STOP
      </Button>
            <Button
              onClick={uploadStops}
              variant="contained"
              className={classes.buttonUpload}
              startIcon={<SaveAlt />}>
              IMPORT STOPS
      </Button>
          </div>
          <Table
            onRow={onClickRow}
            loading={stops.isLoading}
            rowClassName={classes.tableRow}
            style={{ marginTop: "10px" }}
            size="small"
            bordered
            dataSource={stops.data}
            columns={columns}
            rowKey="_id"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15"],
            }} />
        </div>
      </div>
      <div className="containerRight">
        <Map
          clearCenterMap={setCenterMap}
          centerMap={centerMap}
          markers={getStopsDriversMarks()}
          click={false}
          points={[]}
        />

      </div>
    </>
  );
}


