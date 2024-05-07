const Account = require('../models/Account');

const UserController = () => {
    // Create a new user
    const createUser = async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const newUser = new Account({ username, password, role });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully', data: newUser });
        } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
        }
    }

    // Update an existing user
    const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role } = req.body;
        const updatedUser = await Account.findByIdAndUpdate(id, { username, password, role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
    }

    // Delete a user
    const deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await Account.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete user', error: error.message });
        }
    }

    // Get a single user by ID
    const getUserById = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Account.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User found', data: user });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get user', error: error.message });
        }
    }
  
  // Get a user by their username
  const getUserByName = async (req, res) => {
      try {
          const { name } = req.params;
          const user = await Account.findOne({ username: name });
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json({ message: 'User found', data: user });
      } catch (error) {
          res.status(500).json({ message: 'Failed to get user', error: error.message });
      }
  }

  // List all users
  const listUsers = async (req, res) => {
    try {
      const users = await Account.find({});
      res.status(200).json({ message: 'Users retrieved successfully', data: users });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
  }
    
    return {
        createUser,
        updateUser,
        deleteUser,
        getUserById,
        getUserByName,
        listUsers
    }
}

module.exports = UserController;
