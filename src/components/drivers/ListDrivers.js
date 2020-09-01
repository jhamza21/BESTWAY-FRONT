import React, { useState } from "react";
import { Table } from "antd";
import FilterTable from "../shared/FilterTable";
import { Add, Edit, Info, Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import useStyles from "../shared/material-ui-css";
import { deleteDriver } from "../../redux/drivers/driverAction";
import { useSelector, useDispatch } from "react-redux"
import history from "../../services/history"
import Map from "../map/Map"
import ConfirmationNotice from "../shared/ConfirmationNotice";


export default function ListDrivers(props) {
  const dispatch = useDispatch();
  const [centerMap, setCenterMap] = useState();
  const [driverSelected, setDriverSelected] = useState();
  const drivers = useSelector((state) => state.drivers)
  const stops = useSelector((state) => state.stops)
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
      title: "Start Address",
      dataIndex: ["start_address", "location_id"],
    },
    {
      title: "Action",
      width: 180,
      align: "center",
      render: (data) => (
        <div className="buttonsGroup">
          <Edit onClick={() => driverUpdate(data)} className={classes.updateButton} />

          <Delete onClick={() => setDriverSelected(data)} className={classes.deleteButton} />

          <Info onClick={() => driverDetails(data)} className={classes.detailsButton} />

        </div>
      ),
    },
  ];
  function getStopsDriversMarks() {
    var res = [];
    drivers.data.map((driver, index) => res.push({ color: "blue", text: index + 1, type: "service", lat: driver.start_address.lat, lng: driver.start_address.lon, data: driver.name }))
    stops.data.map((stop, index) => res.push({ color: "red", text: index + 1, type: "service", lat: stop.address.lat, lng: stop.address.lon, data: stop.name }))

    return res;
  }
  const addDriver = () => history.push("/drivers/add");
  const driverUpdate = (driver) => { history.push('/drivers/update', driver) }
  const driverDetails = (driver) => { history.push('/drivers/details', driver) }
  const driverDelete = (driver) => dispatch(deleteDriver(driver._id));

  const onClickRow = (record) => {
    return {
      onClick: () => setCenterMap({ lat: record.start_address.lat, lng: record.start_address.lon })
    };
  }


  return (
    <>
      {driverSelected && <ConfirmationNotice
        buttonB={"DELETE"}
        message={"Are you sure to delete " + driverSelected.name + " ?"}
        title="Delete confirmation"
        show={driverSelected ? true : false}
        handleClose={() => setDriverSelected()}
        actionB={() => driverDelete(driverSelected)} />}

      <div className="containerLeft">
        <div>
          <h2 className="formTitle">LIST DRIVERS</h2>
          <div className="buttonsGroup">
            <Button
              onClick={addDriver}
              variant="contained"
              className={classes.buttonSubmit}
              startIcon={<Add />}>
              ADD DRIVER
      </Button>
          </div>
          <Table
            loading={drivers.isLoading}
            rowClassName={classes.tableRow}
            onRow={onClickRow}
            style={{ marginTop: "10px" }}
            size="small"
            bordered
            dataSource={drivers.data}
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
