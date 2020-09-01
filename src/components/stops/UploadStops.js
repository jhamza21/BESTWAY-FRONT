import React, { useState } from 'react'
import templateStops from "./template_stops.xlsx";
import * as XLSX from 'xlsx';
import { Table } from "antd";
import geocoding from "../../services/Geocoding";
import FilterTable from "../shared/FilterTable";
import { Save, Edit, Delete, Info, SaveAlt } from '@material-ui/icons';
import { Button, CircularProgress } from '@material-ui/core';
import useStyles from "../shared/material-ui-css";
import Map from "../map/Map"
import { useDispatch, useSelector } from "react-redux"
import { setUploadStops, deleteUploadStop, updateUploadStop } from '../../redux/uploadStops/stopAction';
import ConfirmationNotice from '../shared/ConfirmationNotice';
import history from "../../services/history";


export default function UploadStops(props) {
    const dispatch = useDispatch();
    const stops = useSelector((state) => state.uploadStops)
    const [stopSelected, setStopSelected] = useState();
    const classes = useStyles();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'ID',
            dataIndex: "__rowNum__",
            ...FilterTable("__rowNum__"),

        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Status",
            dataIndex: "Status",
        },
        {
            title: "Action",
            align: "center",
            width: 180,
            render: (stop) => (
                <div className="buttonsGroup">
                    <Edit onClick={() => history.push("/stops/upload/update", { stop, id: stop.__rowNum__ })} className={classes.updateButton} />

                    <Delete onClick={() => deleteConfirmation(stop)} className={classes.deleteButton} />

                    <Info onClick={() => history.push("/stops/upload/details", { stop })} className={classes.detailsButton} />

                </div>
            ),
        },
    ];

    const deleteConfirmation = (stop) => { setStopSelected(stop); };
    function deleteStop() {
        dispatch(deleteUploadStop(stopSelected))
    }

    //ROW VALIDATION
    function checkRow(stop) {
        if (!stop.name) {
            setError("Stop " + stop.__rowNum__ + " : Invalid name");
            return false;
        }
        if (!stop.address) {
            setError("Stop " + stop.__rowNum__ + " : Invalid address");
            return false;
        }
        return true;
    }
    //READ XLSX FILE
    async function readFile(e) {
        e.preventDefault();
        var files = e.target.files;
        var f = files[0];
        //NO FILE SELECTED
        if (!f) return;
        setError();
        //CHECK FILE TYPE
        if (f.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setError("Invalid file type! Browse an excel file (.xlsx)")
            return;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
            //PARSE DATA
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            //GET FIRST WORKSHEET
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            //CONVERT ARRAY OF ARRAYS
            const data = XLSX.utils.sheet_to_json(ws, { header: 0 });
            //CHECK TEMPLATE VALIDITY
            for (let stop of data) {
                if (!checkRow(stop))
                    return;
            }
            //UPDATE STOPS
            dispatch(setUploadStops(data));
        };
        reader.readAsBinaryString(f);

    };
    async function saveStops() {
        setLoading(true);
        setError();
        //GEOCODING
        for (let stop of stops.data) {
            let res = await geocoding(stop.address);
            if (res.length!==0) {
                //ADDRESS FOUND
                dispatch(updateUploadStop(stop.__rowNum__, { ...stop, Status: "🟢" }))
            } else {
                //ADDRESS NOT FOUND
                setError("Stop " + stop.__rowNum__ + " : Address not found");
                dispatch(updateUploadStop(stop.__rowNum__, { ...stop, Status: "🔴" }))
                setLoading(false);
                return;
            }
        }
        setLoading(false);

    }



    return (
        <>
            {stopSelected && <ConfirmationNotice
                buttonB={"DELETE"}
                message={"Are you sure to delete " + stopSelected.name + " ?"}
                title="Delete confirmation"
                show={stopSelected ? true : false}
                handleClose={() => setStopSelected()}
                actionB={deleteStop} />}

            <div className="containerLeft">
                <div className="uploadPage">
                    <h2 className="formTitle">UPLOAD STOPS</h2>
                    <input type="file" id="fileInput" label="Upload Stops" onChange={(e) => readFile(e)} />
                    {error && <div className="error">{error}
                        <div className="closeButton" onClick={() => setError()}>X</div>
                    </div>}
                    {stops.data.length !== 0 && (<> <Table
                        size="small"
                        bordered
                        dataSource={stops.data}
                        columns={columns}
                        rowKey="__rowNum__"
                        pagination={{
                            defaultPageSize: 5,
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "15"],
                        }}
                    />
                        <Button
                            disabled={loading}
                            onClick={() => saveStops()}
                            variant="contained"
                            className={classes.buttonUploadLarge}
                            startIcon={loading ? <CircularProgress color="secondary" size={20} /> : <Save />}>
                            Save
      </Button>

                    </>)}
                    <Button
                        disabled={loading}
                        onClick={() => document.getElementById('fileInput').click()}
                        variant="contained"
                        className={classes.buttonUploadLarge}
                        startIcon={<SaveAlt />}>
                        Upload
      </Button>
                    <br />
                    <a className="download_template" href={templateStops} download="template_stops.xlsx">Click to download template</a>
                </div >
            </div>
            <div className="containerRight">
                <Map
                    markers={[]}
                    click={false}
                    points={[]}
                />

            </div>
        </>
    )
}
