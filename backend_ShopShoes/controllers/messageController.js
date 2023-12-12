const Message = require("../models/Message");


module.exports = {

        postMessage: async (req, res) => {
          const { sender, content } = req.body;
      
          try {
            console.log("Received values:", sender, content);
      
            const newMessage = new Message({
              sender,
              content,
            });
      
            await newMessage.save();
      
            res.status(201).json({ message: "Message sent successfully" });
          } catch (error) {
            res.status(500).json({ message: error.message || "Internal Server Error" });
          }
        },

        getMessage: async (req, res) => {
          const userId = req.params.userId;
      
          try {
              const messages = await Message.find({ sender: userId })
                  .populate("sender", "username")
                  .sort({ timestamp: 1 });
  
              res.status(200).json(messages);
          } catch (error) {
              res.status(500).json({ message: error.message || "Internal Server Error" });
          }
      }
  
  };

