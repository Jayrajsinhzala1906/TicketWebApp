import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  IconButton,
  Modal,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useFormik } from "formik";
import { http } from "../config/http";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import usePagination from "../Pagination";
import {
  addTicket,
  deleteTicketById,
  getTicketById,
  updateTicket,
} from "../services/ticketService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Ticket({ getList }) {
  const [ticketList, setTicketList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [ticketData, setTicketData] = useState([]);

  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(ticketList.length / PER_PAGE);
  const _DATA = usePagination(ticketList, PER_PAGE);
  let [pageCount, setPageCount] = useState(0);
  const handleChange = (e, p) => {
    setPageCount((p - 1) * 10);
    setPage(p);

    _DATA.jump(p);
  };

  useEffect(() => {
    try {
      setUserData(JSON.parse(localStorage.getItem("user")));
      getList().then((res) => {
        setTicketList(res);
      });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const user = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const deleteTicket = async (id) => {
    const response = await deleteTicketById(id);
    getList().then((res) => {
      setTicketList(res);
    });
  };
  const editTicket = async (id) => {
    const response = await getTicketById(id);
    setTicketData(response.data.tickets[0]);
    setEditId(id);
    setModalOpen(true);
  };
  const formik = useFormik({
    initialValues: {
      title: ticketData?.ticket_title,
      description: ticketData?.ticket_desc,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      if (!editId) {
        const response = await addTicket(values);
      } else {
        const response = await updateTicket(editId, values);
        setEditId(null);
        setTicketData([]);
      }
      setModalOpen(false);
      getList().then((res) => {
        setTicketList(res);
      });
    },
  });
  return (
    <>
      {console.log("list", ticketList)}
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Tickets{" "}
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add Ticket
        </Button>
      </Typography>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setTicketData([]);
          setEditId(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="title"
            label="title"
            id="title"
            autoFocus
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          ></TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          ></TextField>
          <Button type="submit">{editId ? "Edit Ticket" : "Add Ticket"}</Button>
        </Box>
      </Modal>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {_DATA.currentData().map((row) => (
            <TableRow key={row._id}>
              <TableCell>{(pageCount = pageCount + 1)}</TableCell>
              <TableCell>{row.ticket_title}</TableCell>
              <TableCell>{row.ticket_desc}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.user_firstName}</TableCell>
              <TableCell>
                {userData._id === row.user_id ? (
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      editTicket(row._id);
                    }}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="edit" disabled>
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                {userData._id === row.user_id ? (
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteTicket(row._id);
                    }}
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="delete" disabled>
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br></br>
      <Box>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </>
  );
}

export default Ticket;
