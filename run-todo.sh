#!/bin/bash

# Define the Node.js script and the log file
NODE_SCRIPT="todo.js"
LOG_FILE="mytasks.txt"

# Add tasks
echo "Adding tasks..."
node $NODE_SCRIPT -f $LOG_FILE add "Buy milk"
node $NODE_SCRIPT -f $LOG_FILE add "Walk the dog"
node $NODE_SCRIPT -f $LOG_FILE add "Read a book"
node $NODE_SCRIPT -f $LOG_FILE add "Write some code"

# List tasks
echo -e "\nListing all tasks..."
node $NODE_SCRIPT -f $LOG_FILE list

# Remove a task
echo -e "\nRemoving the second task..."
node $NODE_SCRIPT -f $LOG_FILE remove 2

# List tasks again to confirm removal
echo -e "\nListing all tasks after removal..."
node $NODE_SCRIPT -f $LOG_FILE list
