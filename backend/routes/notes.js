const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchUser = require("../middlewares/fetchUser");
const Note = require("../models/Note");

// @route  GET api/notes/allnotes
// @desc   Get all notes
// @access Private

router.get("/allnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      Date: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/notes/addnote
// @desc   Add a note
// @access Private

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title is required").not().isEmpty(),
    body("noteDescription", "Note content is required").not().isEmpty(),
  ],
  async (req, res) => {
    let success = false;
    // check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { title, noteDescription } = req.body;

    try {
      const note = await new Note({
        title,
        noteDescription,
        user: req.user.id,
      });
      success = true;
      await note.save();

      res.status(200).json({ success, note });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/notes/notedetail
// @desc    Single note
// @access  Private

router.get("/notedetail/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success, error: "Note not found" });
    } else {
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ success, error: "Unauthorized" });
      } else {
        success = true;

        res.status(200).json({ success, note });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/notes/pinnote
// @desc    Pin note
// @access  Private

router.put("/pinnote/:id", fetchUser, async (req, res) => {
  try {
    let success = false;
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success,
        error: "Note not found",
      });
    } else {
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ success, error: "Unauthorized" });
      } else {
        if (note.isPinned === false) {
          note.isPinned = true;
          success = true;
          await note.save();
          res.json({
            success,
            note,
          });
        } else {
          note.isPinned = false;
          success = true;
          await note.save();
          res.json({
            success,
            note,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/notes/editnote
// @desc   Edit a note
// @access Private

router.put(
  "/editnote/:id",
  fetchUser,
  [
    body("title", "Title is required").not().isEmpty(),
    body("noteDescription", "Note content is required").not().isEmpty(),
  ],
  async (req, res) => {
    let success = false;
    // check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { title, noteDescription } = req.body;

    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ success, error: "Note not found" });
      } else {
        if (note.user.toString() !== req.user.id) {
          return res.status(401).json({ success, error: "Unauthorized" });
        } else {
          note.title = title;
          note.noteDescription = noteDescription;
          success = true;
          await note.save();
          res.status(200).json({ success, note });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

// @route  DELETE api/notes/deletenote
// @desc   Delete a note
// @access Private

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  let success = false;
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success, error: "Note not found" });
    } else {
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({ success, error: "Unauthorized" });
      } else {
        success = true;
        await note.remove();
        res.status(200).json({
          success,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
