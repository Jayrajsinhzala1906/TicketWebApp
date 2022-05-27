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
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useFormik } from "formik";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import usePagination from "../Pagination";
import {
  addTicket,
  deleteTicketById,
  getAllTicket,
  getSearchTicket,
  getTicketById,
  updateTicket,
} from "../services/ticketService";
import { TableSortLabel } from "@mui/material";

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

const divStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const button = {
  height: "40px",
};

function Ticket({ getList }) {
  const [ticketList, setTicketList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [ticket_title, setTicket_Title] = useState("asc");
  const [ticket_desc, setTicket_Desc] = useState("asc");
  const [user_firstName, setUser_FirstName] = useState("asc");
  const [createdAt, setCreatedAt] = useState("asc");
  const [ticketData, setTicketData] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);
  let [pageCount, setPageCount] = useState(0);
  let [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const PER_PAGE = 10;

  const count = Math.ceil(ticketCount / PER_PAGE);
  const _DATA = usePagination(ticketList, PER_PAGE);

  const handleChange = async (e, p) => {
    setPageCount((p - 1) * 10);
    setPage(p);
    const response = await getAllTicket((p - 1) * 10);
    setTicketList(response.data.tickets);
    _DATA.jump(p);
  };

  useEffect(() => {
    try {
      setUserData(JSON.parse(localStorage.getItem("user")));
      getAllTicket(0, "_id", 0).then((response) => {
        setTicketList(response.data.tickets);

        setTicketCount(response.data.count);
      });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const deleteTicket = async (id) => {
    deleteTicketById(id);
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

  const handleSortRequest = (d) => {
    if (d === "ticket_title") {
      setTicket_Title(ticket_title === "asc" ? "desc" : "asc");
      getAllTicket((page - 1) * 10, d, ticket_title).then((res) => {
        setTicketList(res.data.tickets);
      });
    } else if (d === "ticket_desc") {
      setTicket_Desc(ticket_desc === "asc" ? "desc" : "asc");
      getAllTicket((page - 1) * 10, "ticket_desc", ticket_desc).then((res) => {
        setTicketList(res.data.tickets);
      });
    } else if (d === "user_firstName") {
      setUser_FirstName(user_firstName === "asc" ? "desc" : "asc");
      getAllTicket((page - 1) * 10, "user_firstName", user_firstName).then(
        (res) => {
          setTicketList(res.data.tickets);
        }
      );
    } else if (d === "createdAt") {
      setCreatedAt(createdAt === "asc" ? "desc" : "asc");
      getAllTicket((page - 1) * 10, d, createdAt).then((res) => {
        setTicketList(res.data.tickets);
      });
    }
  };

  const searching = (e) => {
    if (e.key === "Enter") {
      getSearchTicket(e.target.value).then((res) =>
        setTicketList(res.data.tickets)
      );
    }
  };
  const formik = useFormik({
    initialValues: {
      title: ticketData?.ticket_title,
      description: ticketData?.ticket_desc,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!editId) {
        updateTicket(values);
      } else {
        addTicket(values);
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
      <Box sx={divStyle}>
        <Button
          sx={button}
          variant="contained"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add Ticket
        </Button>

        <input type="text" style={button} onKeyDown={searching}></input>
      </Box>

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
            <TableCell onClick={() => handleSortRequest("ticket_title")}>
              <TableSortLabel active={true} direction={ticket_title}>
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell onClick={() => handleSortRequest("ticket_desc")}>
              <TableSortLabel active={true} direction={ticket_desc}>
                Description
              </TableSortLabel>
            </TableCell>
            <TableCell onClick={() => handleSortRequest("createdAt")}>
              <TableSortLabel active={true} direction={createdAt}>
                Created At
              </TableSortLabel>
            </TableCell>
            <TableCell onClick={() => handleSortRequest("user_firstName")}>
              <TableSortLabel active={true} direction={user_firstName}>
                Created By
              </TableSortLabel>
            </TableCell>
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
