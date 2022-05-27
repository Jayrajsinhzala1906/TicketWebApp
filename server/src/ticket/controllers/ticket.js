import Ticket from "../model/ticket.js";

export const addTicket = async (req, res) => {
  try {
    var ticketData = {
      ticket_title: req.body.title,
      ticket_desc: req.body.description,
      user_id: req.body.user_Id,
      user_firstName: req.body.user_name,
    };
    const ticket = await Ticket.create(ticketData);
    return res.status(201).json(ticket);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getAllTicket = async (req, res) => {
  try {
    // .sort((req.query.name = req.query.order))
    const sortQuery = req.query.order;
    let sortObject = {};
    sortObject[req.query.name] = sortQuery;
    // if (req.query.name == "ticket_title") {
    //   sortObject["ticket_title"] = sortQuery;
    // } else if (req.query.name == "ticket_desc") {
    //   sortObject["ticket_desc"] = sortQuery;
    // } else if (req.query.name == "user_firstName") {
    //   sortObject["user_firstName"] = sortQuery;
    // } else if (req.query.name == "createdAt") {
    //   sortObject["createdAt"] = sortQuery;
    // }
    const count = await Ticket.count({ isDeleted: false });
    const tickets = await Ticket.find({ isDeleted: false })
      .sort(sortObject)
      .skip(req.query.skip)
      .limit(10);

    if (tickets) {
      return res.status(200).json({ tickets, count });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getSearchTicket = async (req, res) => {
  console.log(req.query.input);
  const input = req.query.input;
  try {
    const tickets = await Ticket.find({
      isDeleted: false,
      ticket_title: new RegExp(input),
    });

    if (tickets) {
      return res.status(200).json({ tickets });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getTicket = (req, res) => {
  try {
    Ticket.find({ _id: req.params.id }, (err, tickets) => {
      if (err) {
        return err;
      }
      return res.status(200).json({ tickets });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const deleteTicket = (req, res) => {
  try {
    Ticket.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      (err, tickets) => {
        if (err) {
          return err;
        }
        return res.status(200).json({ tickets });
      }
    );
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const editTicket = (req, res) => {
  try {
    var ticketData = {
      ticket_title: req.body.title,
      ticket_desc: req.body.description,
    };
    Ticket.findByIdAndUpdate(req.params.id, ticketData, (err, tickets) => {
      if (err) {
        return err;
      }
      return res.status(200).json({ tickets });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
