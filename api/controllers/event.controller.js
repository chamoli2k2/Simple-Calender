import Event from "../models/event.model.js";
// Desc: Event controller
// Path: api/controllers/event.controller.js
// Version: 1.0
// Auth: Private

// creating event
const createEvent = async (req, res) => {
    try {
        const { title, description, date, time } = req.body;

        // Formatting the date
        const eventDate = new Date(date);

        const event = await Event.create({
            title,
            description,
            date: eventDate,
            time,
            userId: req.user._id,
        });

        res.status(201).json({ "message": "Event created successfully" });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletion of event
const deleteEvent = async (req, res) => {
    try{
        const event = await Event.findById(req.params.id);

        if(!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if(event.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Not authorized to delete this event" });
        }

        // Deleting the event
        await Event.deleteOne({ _id: req.params.id });

        res.status(200).json({ "message": "Event deleted successfully", event });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user._id });

        res.status(200).json({ events });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

// Updating event
const updateEvent = async (req, res) => {
    try{
        const { title, description, date, time } = req.body;
        const eventId = req.params.id;

        let event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if(event.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Not authorized to update this event" });
        }

        event = await Event.findByIdAndUpdate(
          eventId,
          {
            title,
            description,
            date,
            time,
          },
          {
            new: true,
            runValidators: true,
          }
        );

        res.status(200).json({ "message": "Event updated successfully", event });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
};

// Getting an event by ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if(!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if(event.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Not authorized to view this event" });
        }

        res.status(200).json({ event });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
}

// Search Controller
const searchEvent = async (req, res) => {
    try {
      const { query } = req.query; // Extract 'query' parameter from the request
  
      if (!query || query.trim() === "") {
        return res.status(400).json({ error: "Search query cannot be empty." });
      }
  
      // Build a dynamic query to search across title, description, and date
      const searchCriteria = {
        $or: [
          { title: { $regex: query, $options: "i" } },       // Case-insensitive search in title
          { description: { $regex: query, $options: "i" } }, // Case-insensitive search in description
        ],
      };
  
      // Fetch matching events
      const events = await Event.find(searchCriteria);
  
      // Return matching events
      res.status(200).json({events});
    } catch (error) {
      console.error('Error searching events:', error);
      res.status(500).json({ error: error.message });
    }
};
  

export { createEvent, deleteEvent, getEvents, updateEvent, getEventById, searchEvent};